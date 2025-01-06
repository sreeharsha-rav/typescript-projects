import { serve } from "@hono/node-server";
import { Hono } from "hono";
import userRoutes from "@/routes/user/routes";
import taskRoutes from "@/routes/tasks/routes";
import { connectDB, PORT } from "@/db/config";

const app = new Hono();

// routes
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});
app.route("api/auth", userRoutes);
app.route("api/tasks", taskRoutes);

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
