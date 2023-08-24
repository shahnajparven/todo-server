import { Course } from "../models/courseModel.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";

// create Course
export const CreateCourse = catchAsync(async (req, res) => {
  const courses = await Course.create(req.body);

  res.status(201).json({
    courses,
    status: "success",
    message: "Course Created Successfully",
  });
});

// get all course
export const getCourse = catchAsync(async (req, res) => {
  const { crs } = req.query;
  const filter = {};
  if (crs) filter._id = crs;

  const apiFeature = new ApiFeatures(
    Course.find(filter).select("-lecture").lean().sort({ updatedAt: -1 }),
    req.query
  ).search();

  const courses = await apiFeature.query;

  //const courses = await Course.find(filter).select("-lecture").lean().sort({ updatedAt: -1 });

  res.status(200).json({
    status: "success",
    data: courses,
  });
});
