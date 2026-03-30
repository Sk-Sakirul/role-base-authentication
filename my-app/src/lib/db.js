import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  // prevent multiple connections
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Error:", error.message);
    throw error;
  }
};

export default connectDB;