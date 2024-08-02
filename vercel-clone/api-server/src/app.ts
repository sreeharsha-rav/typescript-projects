import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middleware/errorHandler.ts';
import { router } from './routes/index.ts';

// Create a new instance of Hono
const app = new Hono();

// Apply logger middleware to all routes
app.use('*', logger());

// Apply cors middleware to all routes
app.use('*', cors());

// Apply errorHandler middleware to handle errors
app.use('*', errorHandler);

// Route requests to '/api' to the router
app.route('/api', router);

// Start the server on port 3000 using app.fetch as the request handler
Deno.serve({ port: 3000, handler: app.fetch });