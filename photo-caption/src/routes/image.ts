import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function imageRoutes(fastify: FastifyInstance) {

    // Get all images
    fastify.get('/images', async (request: FastifyRequest, reply: FastifyReply) => {
        const images = await prisma.image.findMany();
        return images;
    });

    // Create a new image
    fastify.post('/images', async (request: FastifyRequest, reply: FastifyReply) => {
        const { url } = request.body as { url: string };
        const newImage = await prisma.image.create({
        data: {
            url,
        },
        });
        return newImage;
    });
}
