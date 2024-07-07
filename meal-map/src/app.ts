import fastify from 'fastify';
import { recipeRoutes } from './routes/recipeRoutes';

// Build the app and register the recipe routes
export function buildApp() {
    const app = fastify({
        logger: true,
    });

    // Register routes
    app.register(recipeRoutes, { prefix: '/api' });

    return app;
}