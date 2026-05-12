import path from "path";
import express from "express";
import multer from "multer";
import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Multer configuration: Storage settings.
 * We'll use diskStorage to temporarily save the file before sending to Cloudinary.
 */
const storage = multer.diskStorage({
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

/**
 * Check file type to ensure only images are uploaded.
 */
function checkFileTypes(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Images only!");
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb);
    },
});

/**
 * @desc    Upload an image to Cloudinary
 * @route   POST /api/upload
 * @access  Private/Admin
 */
router.post("/", protect, admin, upload.single("image"), asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error("No file uploaded");
    }

    try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "fashion_hub/products",
        });

        // Send back the Cloudinary URL
        res.status(200).json({
            message: "Image uploaded successfully",
            url: result.secure_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Cloudinary upload failed");
    }
}));

export default router;
