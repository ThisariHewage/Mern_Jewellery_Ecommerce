import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


const app = express();

// Trust proxy for Railway/Production to detect HTTPS correctly
app.set("trust proxy", 1);

// Simple Request Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// CORS configuration
const allowedOrigins = [
    "https://mern-jewellery-ecommerce.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable pre-flight across-the-board
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// Security detection log (for production debugging)
app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production" && req.originalUrl.includes("/api/")) {
        console.log(`[Security] ${req.method} ${req.originalUrl} - Secure: ${req.secure}, Protocol: ${req.headers["x-forwarded-proto"]}`);
    }
    next();
});

app.use(express.json());
app.use(cookieParser());

// Debug Route
app.get("/api/debug", (req, res) => {
    res.json({
        node_env: process.env.NODE_ENV,
        jwt_secret_exists: !!process.env.JWT_SECRET,
        jwt_secret_length: process.env.JWT_SECRET?.length,
        client_url: process.env.CLIENT_URL,
        headers: req.headers,
        cookies: !!req.cookies?.jwt,
    });
});

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        status: "UP",
        db: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    });
});

// PayPal Config
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);

// Static files & frontend routing for production
import path from "path";
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static(path.join(__dirname, "/client/dist")));

    // Any route that is not an API route will be redirected to index.html
    app.get("*", (req, res, next) => {
        if (!req.originalUrl.startsWith("/api")) {
            res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
        } else {
            // If it's an /api/ route that reached here, let notFound handle it
            next();
        }
    });
} else {
    app.get("/", (req, res) => {
        res.send("API Running");
    });
}

// Register Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
