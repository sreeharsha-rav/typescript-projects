import { serve } from "@hono/node-server";
import { Hono } from "hono";
import userRoutes from "@/routes/user";
import taskRoutes from "@/routes/tasks";
import { connectDB, PORT } from "@/db/config";
import { errorHandler } from "@/middleware/error";
import { authenticate } from "@/middleware/auth";

const app = new Hono();

// public routes
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});
app.route("api/auth", userRoutes);

// protected routes
app.use("api/tasks/*", authenticate);
app.route("api/tasks", taskRoutes);

// error handler
app.onError(errorHandler);

// start server
const startServer = async () => {
  await connectDB();

  serve({
    fetch: app.fetch,
    port: PORT,
  });

  console.log(`Server running on http://localhost:${PORT}`);
};

startServer().catch(console.error);
