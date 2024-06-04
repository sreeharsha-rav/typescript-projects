import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';


// JWT verification middleware
export const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
        return;
    } catch (err) {
        reply.status(401).send({ error: err, message: "Unauthorized" });
    }
}