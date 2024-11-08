import mongoose from "mongoose";

const connectdb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/peteylist");
        console.log("DB connected");
      } catch (error) {
        console.error("DB connection error:", error);
      }
    };

export default connectdb;