import type { Context, Next } from "hono";
import { JWT_SECRET } from "@/db/config";
import { verify } from "hono/jwt";

// Middleware to check if user is authenticated
export const authenticate = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return c.json({ error: "Authorization token is missing" }, 401);
  }

  // Verify JWT token
  const payload = await verify(token, JWT_SECRET);
  if (!payload) {
    return c.json({ error: "Invalid token" }, 403);
  }
  console.log("Payload", payload);

  // Set user context
  c.set("user", { id: payload.id, email: payload.email });

  await next();
};
