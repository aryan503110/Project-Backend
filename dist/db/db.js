import mongoose from "mongoose";
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.log("MongoDB connection error:", err);
        throw err;
    }
};
export default connectToDB;
//# sourceMappingURL=db.js.map