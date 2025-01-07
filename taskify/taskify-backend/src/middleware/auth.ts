import type { Context, Next } from "hono";
import { JWT_SECRET } from "@/db/config";
import { verify } from "hono/jwt";
import { AppError } from "@/utils/errors";

// Middleware to check if user is authenticated
export const authenticate = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Authentication required");
  }

  try {
    // Verify JWT token
    const payload = await verify(token, JWT_SECRET);
    if (!payload) {
      throw new AppError(403, "Invalid token");
    }

    // Set user context
    c.set("user", { id: payload.id, email: payload.email });

    await next();
  } catch {
    throw new AppError(500, "Failed to verify JWT token");
  }
};
