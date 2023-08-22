import mongoose, { model, Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please Enter course Title"],
  },
  description: {
    type: String,
    required: [true, "Please Enter course Description"],
  },
  lecture: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
       required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: 0,
  },
  createdBy: {
    type: String,
    default: 0,
  },
  createdAt: {
    type: String,
    default: 0,
  },
});
export const Course = model("Course", courseSchema);
