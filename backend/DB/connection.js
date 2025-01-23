import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose
        .connect(process.env.mongoDBURL)
        .then(() => {
            console.log("MongoDB Connected...");
        })
        .catch((err) => {
            console.error(`Error connecting to MongoDB: ${err}`);
        });
};
export default connectDB;