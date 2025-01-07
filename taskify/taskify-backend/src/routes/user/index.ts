import { Hono } from "hono";
import type { Context } from "hono";
import { UserModel } from "@/db/models";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { JWT_SECRET } from "@/db/config";
import { schemas } from "@/utils/validation";
import { AppError } from "@/utils/errors";

const app = new Hono();

// Register a new user
app.post("/register", async (c: Context) => {
  const body = await c.req.json();
  const { email, name, password } = schemas.register.parse(body);

  // Check if user already exists
  const user = await UserModel.findOne({ email });
  if (user) {
    throw new AppError(400, "Email already registered");
  }

  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.create({
    email,
    name,
    password: hashedPassword,
  });

  return c.json(
    {
      success: true,
      message: "User registered successfully",
    },
    201
  );
});

// Login a user
app.post("/login", async (c: Context) => {
  const body = await c.req.json();
  const { email, password } = schemas.login.parse(body);

  // Check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new AppError(401, "Invalid password");
  }

  // Generate JWT token
  const payload = {
    id: user._id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Token expires in 24 hours
  };
  const token = await sign(payload, JWT_SECRET);

  return c.json(
    {
      success: true,
      data: { token },
    },
    200
  );
});

export default app;
