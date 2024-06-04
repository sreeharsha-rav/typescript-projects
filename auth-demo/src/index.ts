import fastify from "fastify";
import { userRoute } from "./modules/user/user.route";
import fastifyJwt from "@fastify/jwt";

const app = fastify({ logger: true });

// Healthcheck route
app.get("/healthcheck", async (request, reply) => {
    return { status: "success" };
});

// JWT
app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecret",    // JWT secret: should be a long random string
});
// app.addHook("preHandler", async (request, reply) => {
//     request.jwtVerify();
// });

// Register the user route
app.register(userRoute, { prefix: "/users" });

// Graceful shutdown
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
    process.on(signal, async () => {
        await app.close();
        process.exit(0);
    });
});

// ===== MAIN =====
async function main() {
    // Run the server!
    try {
        await app.listen({ port: 3000 });
        app.log.info(`server listening on http://localhost:3000`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

main();