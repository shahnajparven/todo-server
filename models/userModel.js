import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Username must be Unique"],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  profilePic: {
    public_id: {
      type: String,
      default: "This is sample",
    },
    url: {
      type: String,
      default: "image url",
    },
  },

  subscription: {
    id: String,
    status: String,
  },
  playlist: [
    {
      course: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//password hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
export const User = model("User", userSchema);
