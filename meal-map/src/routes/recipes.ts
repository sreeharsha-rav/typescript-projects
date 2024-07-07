import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Recipe } from '../types/recipe';
import recipeDbClient from '../db';

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
        const recipes = recipeDbClient.getAllRecipes();
        if (recipes.length === 0) {
            reply.code(404).send({ error: 'No recipes found' });
        } else {
            reply.send({ message: 'Recipes found', recipes });
        }
    });

    // Get a single recipe
    fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const id = parseInt(request.params.id, 10);
        const recipe = recipeDbClient.getRecipeById(id);
        if (!recipe) {
            reply.code(404).send({ error: 'Recipe not found' });
        } else {
            reply.send({ message: 'Recipe found', recipe });
        }
    });

    // Create a new recipe
    fastify.post('/', async (request: FastifyRequest<{ Body: Omit<Recipe, 'id'> }>, reply: FastifyReply) => {
        const { name, description, imageURL } = request.body;
        const newRecipe: Recipe = recipeDbClient.addRecipe({ name, description, imageURL });
        reply.code(201).send({ message: 'Recipe created successfully', recipe: newRecipe });
    });

    // Update a recipe
    fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string }, Body: Omit<Recipe, 'id'> }>, reply: FastifyReply) => {
        const id = parseInt(request.params.id, 10);
        const { name, description, imageURL } = request.body;
        const updatedRecipe = recipeDbClient.updateRecipe(id, { name, description, imageURL });
        if (!updatedRecipe) {
            reply.code(404).send({ error: 'Recipe not found' });
        } else {
            reply.send({ message: 'Recipe updated successfully', recipe: updatedRecipe });
        }
    });

    // Delete a recipe
    fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const id = parseInt(request.params.id, 10);
        const isDeleted = recipeDbClient.deleteRecipe(id);
        if (!isDeleted) {
            reply.code(404).send({ error: 'Recipe not found' });
        } else {
            reply.code(204).send({ message: 'Recipe deleted successfully' });
        }
    });
}
