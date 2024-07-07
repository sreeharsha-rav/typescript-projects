import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Recipe } from '../types/recipe';

// Create an array to store recipes
let recipes: Recipe[] = [];
let nextId = 1;

/*
 * Routes for recipes
    * GET / - get all recipes
    * GET /:id - get a single recipe
    * POST / - create a new recipe
    * PUT /:id - update a recipe
    * DELETE /:id - delete a recipe
 */
export default async function (fastify: FastifyInstance) {
    // Get all recipes
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        return recipes;
    });

    // Get a single recipe
    fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const id = parseInt(request.params.id, 10);
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) {
            reply.code(404).send({ error: 'Recipe not found' });
        } else {
            return recipe;
        }
    });

    // Create a new recipe
    fastify.post('/', async (request: FastifyRequest<{ Body: Omit<Recipe, 'id'> }>, reply: FastifyReply) => {
        const { name, description, imageURL } = request.body;
        const newRecipe = {
            id: nextId++,
            name,
            description,
            imageURL
        };
        recipes.push(newRecipe);
        reply.code(201).send(newRecipe);
    });

    // Update a recipe
    fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string }, Body: Omit<Recipe, 'id'> }>, reply: FastifyReply) => {
        const id = parseInt(request.params.id, 10);
        const { name, description, imageURL } = request.body;
        const recipeIndex = recipes.findIndex(u => u.id === id);
        if (recipeIndex === -1) {
            reply.code(404).send({ error: 'Recipe not found' });
        } else {
            recipes[recipeIndex] = { id, name, description, imageURL };
            return { message: 'Recipe updated', recipe: recipes[recipeIndex] };
        }
    });

    // Delete a recipe
    fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const id = parseInt(request.params.id, 10);
        const recipeIndex = recipes.findIndex(r => r.id === id);
        if (recipeIndex === -1) {
            reply.code(404).send({ error: 'Recipe not found' });
        } else {
            recipes = recipes.filter(r => r.id !== id);
            return { message: 'Recipe deleted' };
        }
    });
}
