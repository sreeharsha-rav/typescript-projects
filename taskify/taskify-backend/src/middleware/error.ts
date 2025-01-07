import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

// Middleware to handle errors
export const errorHandler = (err: Error, c: Context) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return c.json(
      {
        success: false,
        error: "Validation failed",
        details: err.errors,
      },
      400
    );
  }

  // Handle our custom HTTP exceptions
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: err.message,
      },
      err.status
    );
  }

  // Handle unexpected errors
  console.error("Unexpected error:", err);
  return c.json(
    {
      success: false,
      error: "Internal server error",
    },
    500
  );
};
