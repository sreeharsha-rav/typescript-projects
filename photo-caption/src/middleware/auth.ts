import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function authMiddleware(fastify: FastifyInstance) {
  fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
  });
}