import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/**
 * Middleware to protect routes.
 * It checks for the JWT in the cookie, verifies it, and attaches the user to the request.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (process.env.NODE_ENV === "production") {
        console.log(`[Auth] Path: ${req.originalUrl}, Cookie present: ${!!token}`);
        if (!token) {
            console.log(`[Auth] All Cookies:`, JSON.stringify(req.cookies));
        }
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from DB (excluding password) and attach to req.user
            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

/**
 * Middleware to restrict access to admin users only.
 */
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
};

export { protect, admin };
