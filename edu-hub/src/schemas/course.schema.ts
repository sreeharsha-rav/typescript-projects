// src/schemas/courseSchema.ts
import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  imageLink: z.string().url({ message: "Image link must be a valid URL" }),
  published: z.boolean().optional(),
});
