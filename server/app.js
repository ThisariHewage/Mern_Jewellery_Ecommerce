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

// Simple Request Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

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

app.get("/", (req, res) => {
    res.send("API Running");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);

// Register Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
