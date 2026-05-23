import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/users/logout
 * @access  Public
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Cannot delete admin user");
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: "User removed successfully" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

/**
 * @desc    Forgot Password
 * @route   POST /api/users/forgotpassword
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404);
        throw new Error("There is no user with that email");
    }

    // Get reset OTP
    const otp = user.getResetPasswordOTP();

    await user.save({ validateBeforeSave: false });

    const message = `Your password reset code is: ${otp}\n\nThis code will expire in 10 minutes.`;

    // For dev testing: log the OTP
    console.log("-----------------------------------------");
    console.log("PASSWORD RESET OTP:", otp);
    console.log("-----------------------------------------");

    try {
        const emailSent = await sendEmail({
            email: user.email,
            subject: "Dewora Jewellers - Password Reset Code",
            message,
        });

        if (!emailSent) {
            res.status(500);
            throw new Error("Email could not be sent");
        }

        res.status(200).json({ success: true, data: "Email sent" });
    } catch (err) {
        if (user) {
            user.resetPasswordOTP = undefined;
            user.resetPasswordOTPExpire = undefined;
            await user.save({ validateBeforeSave: false });
        }

        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        throw new Error(err.message || "Email could not be sent");
    }
});

/**
 * @desc    Reset Password
 * @route   PUT /api/users/resetpassword/:token
 * @access  Public
 */
const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, password } = req.body;

    // Get hashed OTP
    const resetPasswordOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
        email,
        resetPasswordOTP,
        resetPasswordOTPExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired code");
    }

    // Set new password
    user.password = password;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, data: "Password reset successfully" });
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    forgotPassword,
    resetPassword
};
