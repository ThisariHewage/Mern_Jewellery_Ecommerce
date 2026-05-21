import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        // Check if admin already exists
        const existing = await User.findOne({ email: "admin@deworajewellers.com" });

        if (existing) {
            console.log("✅ Admin already exists:");
            console.log("   Email: admin@deworajewellers.com");
            console.log("   isAdmin:", existing.isAdmin);

            if (!existing.isAdmin) {
                existing.isAdmin = true;
                await existing.save();
                console.log("   ✔ Promoted to admin.");
            }
        } else {
            await User.create({
                name: "Dewora Admin",
                email: "admin@deworajewellers.com",
                password: "Admin@12345",
                isAdmin: true,
            });
            console.log("✅ Admin user created successfully!");
            console.log("   Email:    admin@deworajewellers.com");
            console.log("   Password: Admin@12345");
        }

        process.exit();
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
};

createAdmin();
