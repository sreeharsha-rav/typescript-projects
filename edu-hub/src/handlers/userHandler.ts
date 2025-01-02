// src/handlers/userHandler.ts
import { createFactory } from "hono/factory";
import { Context } from "hono";
import { users } from "../models/user.model";
import { courses } from "../models/course.model";

const factory = createFactory();

export const userSignup = factory.createHandlers(async (c: Context) => {
  const { username, password } = await c.req.json();
  users.push({ username, password, purchasedCourses: [] });
  return c.json({ message: "User created successfully" });
});

export const listCourses = factory.createHandlers(async (c: Context) => {
  const publishedCourses = courses.filter((course) => course.published);
  return c.json({ courses: publishedCourses });
});

export const purchaseCourse = factory.createHandlers(async (c: Context) => {
  const courseId = parseInt(c.req.param("courseId"));
  const user = c.get("user");

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  // TODO: Check if the course exists
  user.purchasedCourses.push(courseId);
  return c.json({ message: "Course purchased successfully" });
});

export const listPurchasedCourses = factory.createHandlers(
  async (c: Context) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const purchasedCourses = courses.filter((course) =>
      user.purchasedCourses.includes(course.id),
    );
    return c.json({ purchasedCourses });
  },
);
