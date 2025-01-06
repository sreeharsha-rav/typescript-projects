import { Schema, model } from "mongoose";
import type { User, Task } from "../types";

// Define User Schema
const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define Task Schema
const taskSchema = new Schema<Task>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export User and Task models
export const UserModel = model<User>("User", userSchema);
export const TaskModel = model<Task>("Task", taskSchema);
