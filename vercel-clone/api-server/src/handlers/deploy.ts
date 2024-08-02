import { Context } from 'hono';
import { GitUrlValidator } from "../services/gitUrlValidator.ts";

/**
 * Handles the POST request to deploy a repository.
 * Checks if the repository URL is valid. Calls the build service to clone the repository.
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
        const isValidRepo: boolean = await GitUrlValidator.isValid(repoUrl);

        if (!isValidRepo) {
            return c.json({ error: 'Invalid repository URL' }, 400);
        }

        // TODO: Call the build service to clone the repository

        return c.json({ 
            message: 'Repository found, building...',
        });
    } catch (error) {
        console.error('Error:', error.message);
        return c.json({ error: error.message }, 500);
    }
}