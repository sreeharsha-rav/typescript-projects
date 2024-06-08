import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from '../middleware/jwtMiddleware';

const prisma = new PrismaClient();

export default async function userRoutes(fastify: FastifyInstance) {

    // Get all users
    fastify.get('/users', { preHandler: verifyJWT }, async (request: FastifyRequest, reply: FastifyReply) => {

        const users = await prisma.user.findMany();
        return { users: users.map(user => {
            return {
                id: user.id,
                username: user.username,
            };
            }) 
        };
    });

}
