import { createMiddleware } from "hono/factory";
import { Context, Next } from "hono";
import { admins } from "../models/admin.model";
import { users } from "../models/user.model";

export const adminMiddleware = createMiddleware(
  async (c: Context, next: Next) => {
    const username = c.req.header("username");
    const password = c.req.header("password");

    if (!username || !password) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const admin = admins.find(
      (admin) => admin.username === username && admin.password === password,
    );

    if (!admin) {
      return c.json({ message: "Unauthorized admin" }, 401);
    }

    c.set("user", admin);
    await next();
  },
);

export const userMiddleware = createMiddleware(
  async (c: Context, next: Next) => {
    const username = c.req.header("username");
    const password = c.req.header("password");

    if (!username || !password) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) {
      return c.json({ message: "Unauthorized user" }, 401);
    }

    c.set("user", user);
    await next();
  },
);
