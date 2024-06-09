import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

// Create Fastify instance
const app = fastify({ logger: true });

// Register the JWT plugin
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "supersecret",
});

// Register route handlers
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import imageRoutes from "./routes/image";
import captionRoutes from "./routes/caption";

app.register(authRoutes);
app.register(userRoutes);
app.register(imageRoutes);
app.register(captionRoutes);

// Health check route
app.get("/", async (request, reply) => {
  return { status: "ok" };
});

// Start app
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info(`Server running at http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();