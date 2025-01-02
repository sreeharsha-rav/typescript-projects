// src/routes/user.ts
import { Hono } from "hono";
import {
  userSignup,
  listCourses,
  purchaseCourse,
  listPurchasedCourses,
} from "../handlers/userHandler";
import { userSchema } from "../schemas/user.schema";
import { zValidator } from "@hono/zod-validator";
import { userMiddleware } from "../middleware/authMiddleware";

const app = new Hono()
  .post("/signup", zValidator("json", userSchema), ...userSignup)
  .get("/courses", userMiddleware, ...listCourses)
  .post("/courses/:courseId", userMiddleware, ...purchaseCourse)
  .get("/purchasedCourses", userMiddleware, ...listPurchasedCourses);

export default app;
