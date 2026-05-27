import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is missing in .env");
    }

    try {
        const connection = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(`MongoDB connected successfully: ${connection.connection.host}`);

    } catch (error) {
        console.error("MongoDB connection error:", error.message);

        if (error.code === "ECONNREFUSED" && error.syscall === "querySrv") {
            console.error("Atlas SRV DNS lookup failed. Check your internet/DNS connection, or replace mongodb+srv:// with a standard mongodb:// connection string from MongoDB Atlas.");
        }

        throw error;
    }
};

export default connectDB;
