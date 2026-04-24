import userModel from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const addToCart = asyncHandler(async (req, res) => {
  const userData = await userModel.findById(req.body.userId);
  if (!userData) throw new AppError("User not found", 404);

  const cartData = userData.cartData;
  cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

  await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  res.json({ success: true, message: "Added To Cart" });
});

const removeFromCart = asyncHandler(async (req, res) => {
  const userData = await userModel.findById(req.body.userId);
  if (!userData) throw new AppError("User not found", 404);

  const cartData = userData.cartData;
  if (cartData[req.body.itemId] > 0) {
    cartData[req.body.itemId] -= 1;
  }

  await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  res.json({ success: true, message: "Removed From Cart" });
});

const getCart = asyncHandler(async (req, res) => {
  const userData = await userModel.findById(req.body.userId);
  if (!userData) throw new AppError("User not found", 404);

  res.json({ success: true, cartData: userData.cartData });
});

export { addToCart, removeFromCart, getCart };
