import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
};

export default connectToDB;
