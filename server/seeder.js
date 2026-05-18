import mongoose from "mongoose";
import dotenv from "dotenv";
import jewelleryProducts from "./data/jewelleryProducts.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();

        const adminUser = await User.findOne({ isAdmin: true });

        if (!adminUser) {
            console.error("No admin user found. Please ensure an admin exists before seeding.");
            process.exit(1);
        }

        const sampleProducts = jewelleryProducts.map((product) => {
            return { ...product, user: adminUser._id };
        });

        await Product.insertMany(sampleProducts);

        console.log("Jewellery Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
