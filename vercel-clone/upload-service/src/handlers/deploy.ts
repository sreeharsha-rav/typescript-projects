import { Context } from 'hono';
import * as gitService from '../services/gitService.ts';

/**
 * Handles the POST request to deploy a repository.
 * 
 * @param c - The context object containing the request and response objects.
 * @returns A JSON response indicating the result of the deployment.
 */
export async function post(c: Context) {
    const { repoUrl } = await c.req.json();
    
    if (!repoUrl) {
        return c.json({ error: 'Repository URL is required' }, 400);
    }

    try {
        const folderId = await gitService.cloneRepository(repoUrl);

        return c.json({ 
            message: 'Repository cloned successfully',
            folderId: folderId,
            outputFolder: `./output/${folderId}`
        });
    } catch (error) {
        console.error('Error:', error.message);
        return c.json({ error: error.message }, 500);
    }
}
