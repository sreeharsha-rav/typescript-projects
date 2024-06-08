import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from '../middleware/jwtMiddleware';
import NodeCache from 'node-cache';

const prisma = new PrismaClient();
const myCache = new NodeCache();

export default async function imageRoutes(fastify: FastifyInstance) {

    // Get all images
    fastify.get('/images', async (request: FastifyRequest, reply: FastifyReply) => {
        const images = await prisma.image.findMany();
        if (!images) {
            return reply.status(404).send("No images found!");
        } else {
            return { images: images };
        }
    });

    // Get image by ID
    fastify.get('/images/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const cacheKey = `imageId:${id}`;

        // Check if the image ID is in the cache
        const cachedImageWithCaptions = myCache.get(cacheKey);

        if (cachedImageWithCaptions) {
            fastify.log.info(`Cache hit for imagedD: ${id}`);
            return cachedImageWithCaptions;    // Return the cached image with captions
        } else {
            // Find the image by ID
            const image = await prisma.image.findUnique({ where: { id: parseInt(id) } });

            if (!image) {
                return reply.status(404).send("No image found for ID: " + id); 
            } else {
                // Find all captions for the image
                const captions = await prisma.caption.findMany({ where: { imageId: parseInt(id) } });

                // Get username for each caption
                const users = await prisma.user.findMany(
                    { where: { id: { in: captions.map(caption => caption.userId) } } }
                );

                // Create an object with captions and usernames
                const imageWithCaptions = {
                    image,
                    captions: captions.map(caption => {
                        const user = users.find(user => user.id === caption.userId);
                        return {
                            text: caption.text,
                            user: user?.username,
                        };
                    }),
                };

                // Save the imagewithcaptions in the cache
                myCache.set(cacheKey, imageWithCaptions);
                return imageWithCaptions;
            }
        }
    });

    // Add a new image
    fastify.post('/images', { preHandler: verifyJWT }, async (request: FastifyRequest, reply: FastifyReply) => {
        // Verify the JWT token
        try {
            await request.jwtVerify();
        } catch (err) {
            return reply.status(401).send({ error: err, message: "Unauthorized" });
        }

        const { url } = request.body as { url: string };
        await prisma.image.create({
            data: {
                url,
            },
        });
        return "Image added successfully!";
    });
}
