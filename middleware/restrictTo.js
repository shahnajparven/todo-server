import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { User } from "../models/userModel.js";

// Check user login or not
export const isAuthenticated = catchAsync(async (req, res, next) => {
    const {token}  = req.cookies;
    // const token = req.headers.token;
  
      // If user not login/noToken then throw this error
      if (!token) return next(new AppError('Please login to access to this resource', 403));
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
      // Token Exist but not valid then throw this error
      if (!decodedData.id) return next(new AppError('Invalid Token', 403));
  
      req.user = await User.findById(decodedData.id);
      next();
  });