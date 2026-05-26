import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        // Check if admin already exists
        const existing = await User.findOne({
            email: process.env.ADMIN_EMAIL,
        });

        if (existing) {
            console.log("✅ Admin already exists:");
            console.log("   Email:", existing.email);
            console.log("   isAdmin:", existing.isAdmin);

            // Promote to admin if not already
            if (!existing.isAdmin) {
                existing.isAdmin = true;
                await existing.save();

                console.log("   ✔ User promoted to admin.");
            }
        } else {
            // Create new admin user
            await User.create({
                name: process.env.ADMIN_NAME,
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                isAdmin: true,
            });

            console.log("✅ Admin user created successfully!");
            console.log("   Email:", process.env.ADMIN_EMAIL);
        }

        process.exit();
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
};

createAdmin();