import type { Context } from "hono";
import { UserModel } from "@/db/models";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { JWT_SECRET } from "@/db/config";

// Function to register a new user
export const register = async (c: Context) => {
  const { email, name, password } = await c.req.json();

  // Check if user already exists
  const user = await UserModel.findOne({ email });
  if (user) {
    return c.json({ error: "Email is already registered" }, 400);
  }

  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.create({
    email,
    name,
    password: hashedPassword,
  });

  return c.json({ message: "User registered successfully" }, 201);
};

// Function to login a user
export const login = async (c: Context) => {
  const { email, password } = await c.req.json();

  // Check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return c.json({ error: "Email not registered" }, 400);
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return c.json({ error: "Wrong password" }, 401);
  }

  // Generate JWT token
  const payload = {
    id: user._id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Token expires in 24 hours
  };
  const token = await sign(payload, JWT_SECRET);

  return c.json({ token }, 200);
};
