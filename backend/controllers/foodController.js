import foodModel from "../models/foodModel.js";
import fs from "fs";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const addFood = asyncHandler(async (req, res) => {
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.filename,
  });
  await food.save();
  res.json({ success: true, message: "Food Added" });
});

const listFood = asyncHandler(async (req, res) => {
  const foods = await foodModel.find({});
  res.json({ success: true, data: foods });
});

const removeFood = asyncHandler(async (req, res) => {
  const food = await foodModel.findById(req.body.id);
  if (!food) throw new AppError("Food item not found", 404);

  fs.unlink(`uploads/${food.image}`, () => {});
  await foodModel.findByIdAndDelete(req.body.id);
  res.json({ success: true, message: "Food Removed" });
});

export { addFood, listFood, removeFood };
