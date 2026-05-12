import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API Running");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Register Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;