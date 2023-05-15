import mongoose from "mongoose";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../..", ".env") });

const MONGO_URI = process.env.MONGOURL || "mongodb://localhost/3000";

const connectDb = async (): Promise<typeof mongoose> => {
  const connection = await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected!");
  return connection;
};

export default connectDb;
