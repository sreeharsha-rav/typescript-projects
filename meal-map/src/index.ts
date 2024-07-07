import Fastify, { FastifyInstance } from 'fastify';
import recipeRoutes from './routes/recipes';

// logger plugin
const fastify = Fastify({
    logger: true
});

// add recipe route
fastify.register(recipeRoutes, { prefix: '/api/recipes' });

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
