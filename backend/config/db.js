import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://iamsachin182:integration@cluster0.x31avjd.mongodb.net/food-delievery').then(()=>console.log("DB Connected"));
}   