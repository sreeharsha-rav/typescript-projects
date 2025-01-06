import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Configure Environment Variables
const MONGO_URI = process.env.MONGO_URI!;
const PORT = parseInt(process.env.PORT || "5000");
const JWT_SECRET = process.env.JWT_SECRET!;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error}`);
    process.exit(1);
  }
};

export { connectDB, PORT, JWT_SECRET };
