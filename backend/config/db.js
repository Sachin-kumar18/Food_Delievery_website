import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sachiinsharma18_db_user:aPxFxL5B8JsthZCt@cluster0.2fizns3.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
