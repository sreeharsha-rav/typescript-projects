// src/routes/admin.ts
import { Hono } from "hono";
import {
  adminSignup,
  createCourse,
  listCourses,
} from "../handlers/adminHandler";
import { adminSchema } from "../schemas/admin.schema";
import { courseSchema } from "../schemas/course.schema";
import { zValidator } from "@hono/zod-validator";
import { adminMiddleware } from "../middleware/authMiddleware";

const app = new Hono()
  .post("/signup", zValidator("json", adminSchema), ...adminSignup)
  .post(
    "/courses",
    adminMiddleware,
    zValidator("json", courseSchema),
    ...createCourse,
  )
  .get("/courses", adminMiddleware, ...listCourses);

export default app;
