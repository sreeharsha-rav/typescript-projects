import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS
app.use('*', cors());

// POST /deploy route
app.post('/deploy', async (c) => {
  const { repoUrl } = await c.req.json();
  
  // Here you would typically do something with the repoUrl
  console.log(`Received repo URL: ${repoUrl}`);

  return c.json({ message: 'Deployment request received' });
});

// Start the server
Deno.serve({ port: 3000 }, app.fetch)
