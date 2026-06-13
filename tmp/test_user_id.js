import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../server/models/userModel.js";

dotenv.config({ path: "../server/.env" });

const testUserId = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Create a test user
        const testUser = new User({
            name: "Test User " + Math.floor(Math.random() * 1000),
            email: `test${Math.floor(Math.random() * 10000)}@example.com`,
            password: "password123",
        });

        await testUser.save();
        console.log(`Created user with custom ID: ${testUser.userId}`);

        // Create another test user to check sequence
        const testUser2 = new User({
            name: "Test User " + Math.floor(Math.random() * 1000),
            email: `test${Math.floor(Math.random() * 10000)}@example.com`,
            password: "password123",
        });

        await testUser2.save();
        console.log(`Created user 2 with custom ID: ${testUser2.userId}`);

        // Clean up
        await User.deleteOne({ _id: testUser._id });
        await User.deleteOne({ _id: testUser2._id });
        console.log("Cleaned up test users");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Test failed:", error);
        process.exit(1);
    }
};

testUserId();
