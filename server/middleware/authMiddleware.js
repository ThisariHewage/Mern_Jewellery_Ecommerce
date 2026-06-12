import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/**
 * Middleware to protect routes.
 * It checks for the JWT in the cookie, verifies it, and attaches the user to the request.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Try reading token from 'jwt' cookie
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    // 2. If no cookie, try reading from Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (process.env.NODE_ENV === "production") {
        console.log(`[Auth] Path: ${req.originalUrl}, Has Token: ${!!token}, Source: ${req.cookies.jwt ? 'Cookie' : (req.headers.authorization ? 'Header' : 'None')}`);
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");

            if (!req.user) {
                res.status(401);
                throw new Error("Not authorized, user not found");
            }

            return next();
        } catch (error) {
            console.error(`[Auth Error] Path: ${req.originalUrl}, Reason: ${error.message}`);

            if (process.env.NODE_ENV === "production") {
                console.log(`[Diagnostic] JWT_SECRET exists: ${!!process.env.JWT_SECRET}, Secret Length: ${process.env.JWT_SECRET?.length}`);
            }

            // If cookie failed, but there is also a header, try the header as a last resort
            if (req.cookies?.jwt && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
                const headerToken = req.headers.authorization.split(" ")[1];
                try {
                    const decoded = jwt.verify(headerToken, process.env.JWT_SECRET);
                    req.user = await User.findById(decoded.userId).select("-password");
                    if (req.user) {
                        console.log("[Auth] Success via fallback header");
                        return next();
                    }
                } catch (headerError) {
                    console.error("[Auth Error] Fallback Header failed:", headerError.message);
                }
            }

            res.status(401);
            throw new Error(`Not authorized, token failed: ${error.message}`);
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
