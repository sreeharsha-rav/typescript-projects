import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from '../middleware/jwtMiddleware';

const prisma = new PrismaClient();

export default async function imageRoutes(fastify: FastifyInstance) {

    // Get all images
    fastify.get('/images', async (request: FastifyRequest, reply: FastifyReply) => {
        const images = await prisma.image.findMany();
        return images;
    });

    // Create a new image
    fastify.post('/images', { preHandler: verifyJWT }, async (request: FastifyRequest, reply: FastifyReply) => {
        // Verify the JWT token
        try {
            await request.jwtVerify();
        } catch (err) {
            return reply.status(401).send({ error: err, message: "Unauthorized" });
        }

        const { url } = request.body as { url: string };
        const newImage = await prisma.image.create({
        data: {
            url,
        },
        });
        return newImage;
    });
}
