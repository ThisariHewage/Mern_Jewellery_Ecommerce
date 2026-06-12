import path from "path";
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

// 1. Trust proxy for Railway/Production to detect HTTPS correctly
app.set("trust proxy", 1);

// 2. CORS configuration with credentials support
const allowedOrigins = [
    "https://mern-jewellery-ecommerce.vercel.app",
    "https://mern-jewellery-ecommerce-thisarihewages-projects.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log(`[CORS] Blocked Origin: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// 3. Security detection log (for production debugging)
app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production" && req.originalUrl.includes("/api/")) {
        console.log(`[Security] ${req.method} ${req.originalUrl} - Secure: ${req.secure}, Protocol: ${req.headers["x-forwarded-proto"]}`);
    }
    next();
});

app.use(express.json());
app.use(cookieParser());

// 4. API Routes and Health Checks
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running",
        db: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    });
});

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running",
    });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);

// 6. Production Static Assets & SPA Routing
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    // Express 5 Robust SPA Catch-all middleware
    // Bypasses path-to-regexp parser to avoid PathError
    app.use((req, res, next) => {
        if (req.method === "GET" && !req.originalUrl.startsWith("/api")) {
            res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
        } else {
            next();
        }
    });
}

// 7. 404 handler for unknown routes (placed after all logic)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// 8. Global Error Handler
app.use(errorHandler);

export default app;
