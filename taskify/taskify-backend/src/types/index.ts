import mongoose from "mongoose";

// User Type
export interface User {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task Type
export interface Task {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: "TODO" | "IN_PROGRESS" | "DONE";
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Add more types here
/*
export interface Task {
  id: string; // UUID
  title: string; // Task title
  description?: string; // Optional task description
  dueDate?: Date; // Optional due date
  priority: TaskPriority; // Task priority
  status: TaskStatus; // Task status
  projectId: string; // Reference to Project ID
  creatorId: string; // Reference to User ID who created the task
  // assigneeId?: string;  // Optional reference to User ID assigned to the task
  // parentTaskId?: string;// Optional reference to parent Task ID for subtasks
  isArchived: boolean; // Soft delete flag
  createdAt: Date; // Timestamp of creation
  updatedAt: Date; // Timestamp of last update
}

export interface Project {
  id: string; // UUID
  name: string; // Project name
  description?: string; // Optional project description
  ownerId: string; // Reference to User ID
  isArchived: boolean; // Soft delete flag
  createdAt: Date; // Timestamp of creation
  updatedAt: Date; // Timestamp of last update
}
*/
