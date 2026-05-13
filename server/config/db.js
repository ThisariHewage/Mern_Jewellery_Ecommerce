import mongoose from "mongoose";

/**
 * Connects to MongoDB Atlas using the URI provided in the .env file.
 * We use async/await for better error handling and readability.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        
        if (error.message.includes("ECONNREFUSED")) {
            console.error("👉 TIP: This usually means your IP address is not whitelisted in MongoDB Atlas or your network is blocking the connection.");
            console.error("👉 ACTION: Go to MongoDB Atlas > Network Access > Add your current IP.");
        }
        
        // Don't exit immediately so the user can see the tip, but the app won't work correctly without DB
        setTimeout(() => process.exit(1), 5000);
    }
};

export default connectDB;
