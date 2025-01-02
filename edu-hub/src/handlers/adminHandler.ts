// src/handlers/adminHandler.ts
import { createFactory } from "hono/factory";
import { Context } from "hono";
import { admins } from "../models/admin.model";
import { courses } from "../models/course.model";
import { courseSchema } from "../schemas/course.schema";

const factory = createFactory();

export const adminSignup = factory.createHandlers(async (c: Context) => {
  const { username, password } = await c.req.json();
  admins.push({ username, password });
  return c.json({ message: "Admin created successfully" });
});

export const createCourse = factory.createHandlers(async (c: Context) => {
  const { title, description, price, imageLink } = await c.req.json();
  const newCourse = {
    id: courses.length + 1,
    title,
    description,
    price,
    imageLink,
    published: false,
  };
  courses.push(newCourse);
  return c.json({
    message: "Course created successfully",
    courseId: newCourse.id,
  });
});

export const listCourses = factory.createHandlers(async (c: Context) => {
  return c.json({ courses });
});
