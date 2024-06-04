import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function userRoutes(fastify: FastifyInstance) {

    // Get all users: Add authentication middleware
    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        const users = await prisma.user.findMany();
        return users.map(user => {
        return {
            id: user.id,
            username: user.username,
        };
        });
    });

}
