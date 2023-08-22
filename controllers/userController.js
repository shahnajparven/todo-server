import { User } from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from "bcryptjs";

// Registration User
export const registerUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  sendToken(user, 200, res, "Register Successfull");
});

// Login Verify
export const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }
  
    const verifyPass = await bcrypt.compare(password, user.password);
  
    if (!verifyPass) {
      return next(new AppError("Email or Password doesn't match", 401));
    }
    sendToken(user, 200, res, "Login Successful");
  });
  
  // Logout User
  export const logout = catchAsync(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      status: "success",
      message: "Logged Out",
    });
  });

  // Get User Detail
export const loadUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      status: "success",
      data: user,
    });
  });
  