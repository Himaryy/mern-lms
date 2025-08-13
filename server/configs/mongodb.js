import mongoose from "mongoose";
import "dotenv/config";

// Connect DB
const db = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));

  await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
};

export default db;
