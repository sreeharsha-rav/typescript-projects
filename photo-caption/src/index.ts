import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";

const server = fastify({ logger: true });
const prisma = new PrismaClient();

// Register the JWT plugin
server.register(fastifyJwt, {
  secret: "supersecret"
});

// Register authentication middleware
import authMiddleware from "./middleware/auth";
server.register(authMiddleware);

// Register route handlers
import authRoutes from "./routes/auth";

server.register(authRoutes);

// Demo route
server.get("/", async (request, reply) => {
  return "Hello, world!";
});

// Start server
const start = async () => {
  try {
    await server.listen(3000);
    server.log.info(`Serever running at http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();