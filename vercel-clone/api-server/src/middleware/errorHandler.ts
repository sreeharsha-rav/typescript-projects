import { Context, Next } from 'hono';

/**
 * Handles errors that occur during the execution of a middleware function.
 * 
 * @param c - The context object representing the current request and response.
 * @param next - The next function to be called in the middleware chain.
 * @returns A JSON response with an error message and a status code of 500 if an error occurs.
 */
export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    console.error('Unhandled error:', err);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
}