import userModel from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUserService = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error(404, "User doesn't exist");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(401, "Invalid credentials");
  }

  const token = generateToken(user._id);

  return token;
};
