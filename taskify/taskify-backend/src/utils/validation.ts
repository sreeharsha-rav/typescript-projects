import { z } from "zod";

// Define validation schemas
export const schemas = {
  register: z.object({
    email: z.string().email("Invalid email address"),
    name: z
      .string()
      .min(1, "Name is required")
      .max(255, "Name cannot exceed 255 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),

  login: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),

  createTask: z.object({
    title: z
      .string()
      .min(1, "Task name is required")
      .max(255, "Task name cannot exceed 255 characters"),
    description: z
      .string()
      .min(1, "Task description is required")
      .max(500, "Task description cannot exceed 500 characters"),
    type: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
  }),

  updateTask: z.object({
    title: z
      .string()
      .min(1, "Task name is required")
      .max(255, "Task name cannot exceed 255 characters")
      .optional(),
    description: z
      .string()
      .min(1, "Task description is required")
      .max(500, "Task description cannot exceed 500 characters")
      .optional(),
    type: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  }),

  updateTaskStatus: z.object({
    type: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  }),
};
