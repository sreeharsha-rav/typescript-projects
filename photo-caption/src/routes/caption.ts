import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from '../middleware/jwtMiddleware';
import NodeCache from 'node-cache';

const prisma = new PrismaClient();
const myCache = new NodeCache();

export default async function captionRoutes(fastify: FastifyInstance) {

    // Get all captions
    fastify.get('/captions', async (request: FastifyRequest, reply: FastifyReply) => {
        const captions = await prisma.caption.findMany();
        if (!captions) {
            return reply.status(404).send("No captions found!");
        } else {
            return { captions: captions };
        }
    });

    // Get all captions by user name
    fastify.get('/captions/user/:username', async (request: FastifyRequest, reply: FastifyReply) => {
        const { username } = request.params as { username: string };
        const captions = await prisma.caption.findMany({ where: { user: { username } } });
        if (!captions) {
            return reply.status(404).send("No captions found for user: " + username);
        } else {
            return { captions: captions };
        }
    });

    // Get all captions by image ID
    // TODO: Cache this route
    fastify.get('/captions/image/:imageId', async (request: FastifyRequest, reply: FastifyReply) => {
        const { imageId } = request.params as { imageId: string };
        const cacheKey = `caption-imageId:${imageId}`;

        // Check if the image ID is in the cache
        const cachedCaptions = myCache.get(cacheKey);

        if (cachedCaptions) {
            fastify.log.info(`Cache hit for caption-imageId: ${imageId}`);
            return { captions: cachedCaptions };    // Return the cached captions
        } else {
            const captions = await prisma.caption.findMany({ where: { imageId: parseInt(imageId) } });
            if (!captions) {
                return reply.status(404).send("No captions found for image ID: " + imageId);
            } else {
                // Save the captions in the cache
                myCache.set(cacheKey, captions);
                return { captions: captions };
            }
        }
    });

    // Add a new caption to an image
    fastify.post('/captions/image/:imageId', { preHandler: verifyJWT }, async (request: FastifyRequest, reply: FastifyReply) => {
        // Verify the JWT token
        try {
            await request.jwtVerify();
        } catch (err) {
            return reply.status(401).send({ error: err, message: "Unauthorized" });
        }

        const { imageId } = request.params as { imageId: string };  // Get image ID from URL
        const { text } = request.body as { text: string };  // Get caption text from request body
        const userId = (request.user as { id: number }).id; // Get the user ID from the JWT token

        // Create the new caption
        await prisma.caption.create({
            data: {
                text,
                userId,
                imageId: parseInt(imageId),
            },
        });
        return "Caption added successfully to image ID: " + imageId + ", by user ID: " + userId;
    });
}