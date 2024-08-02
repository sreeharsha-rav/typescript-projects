import { Hono } from 'hono';
import * as deployHandler from '../handlers/deploy.ts';

const router = new Hono();

// Handle POST request to '/deploy' route
router.post('/deploy', deployHandler.post);

export { router };
