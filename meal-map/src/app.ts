import fastify, { FastifyInstance } from 'fastify';
import { recipeRoutes } from './routes/recipeRoutes';
import { prisma } from './config/prisma';

// Build the app and register the recipe routes
export function buildApp(): FastifyInstance {
    const app = fastify({
        logger: true,
    });

    // register routes
    app.register(recipeRoutes, { prefix: '/api' });

    // graceful shutdown
    app.addHook('onClose', async (instance) => {
        await prisma.$disconnect();
        instance.log.info('Prisma client disconnected');
    });

    return app;
}