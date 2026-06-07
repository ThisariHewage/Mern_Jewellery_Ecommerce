import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets it as an HTTP-only cookie.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {String} userId - The ID of the authenticated user
 */
const generateToken = (req, res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Auto-detect if we are on HTTPS
    const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https";

    // Set JWT as HTTP-Only Cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isSecure,
        sameSite: isSecure ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

export default generateToken;
