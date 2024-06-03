import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function authRoutes(fastify: FastifyInstance) {

    // Login route
    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        const { username, password } = request.body as { username: string, password: string };
        const user = await prisma.user.findUnique({ where: { username } });

        // Check if user exists and password is correct
        if (!user) {
            return reply.status(401).send({ message: 'Invalid User' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return reply.status(401).send({ message: 'Invalid Password' });
        }

        // Generate JWT token
        const token = fastify.jwt.sign({ id: user.id, username: user.username });
        return { token };
    });

    // Register route
    fastify.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
        const { username, password } = request.body as { username: string, password: string };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({ 
            data: { 
                username, 
                password: hashedPassword
            } 
        });
        return newUser;
    });
}