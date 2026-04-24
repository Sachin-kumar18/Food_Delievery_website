import userModel from "../models/userModel.js";
<<<<<<< HEAD
import { loginUserService } from "../services/userService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUSer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginUserService(email, password);
    res
      .status(200)
      .json({ success: true, message: "Login Successful", data: { token } });
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing in .env");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// registered user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUSer, registerUser };
=======
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) throw new AppError("User doesn't exist", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Invalid credentials", 401);

  res.json({ success: true, token: createToken(user._id) });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  const exists = await userModel.findOne({ email });
  if (exists) throw new AppError("User already exists", 409);

  if (!validator.isEmail(email)) throw new AppError("Please enter a valid email", 400);
  if (password.length < 8) throw new AppError("Please enter a strong password", 400);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({ name, email, password: hashedPassword });
  const user = await newUser.save();

  res.json({ success: true, token: createToken(user._id) });
});

export { loginUser, registerUser };
>>>>>>> refactor/error-handling
