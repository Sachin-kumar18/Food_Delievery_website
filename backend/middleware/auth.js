import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) throw new AppError("Not authorized. Please login again.", 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!req.body) req.body = {};
  if (!req.body.userId) req.body.userId = decoded.id;

  next();
});

export default authMiddleware;
