import { FastifyInstance } from 'fastify';
import { recipeController } from '../controllers/recipeController';

/*
 * Routes for recipes CRUD operations
    * GET /recipes - get all recipes
    * GET /recipes/:id - get a single recipe by ID
    * POST /recipes - create a new recipe
    * PUT /recipes/:id - update a recipe by ID
    * DELETE /recipes/:id - delete a recipe by ID
*/
export async function recipeRoutes(fastify: FastifyInstance) {
    fastify.get('/recipes', recipeController.getAllRecipes);
    fastify.get('/recipes/:id', recipeController.getRecipeById);
    fastify.post('/recipes', recipeController.createRecipe);
    fastify.put('/recipes/:id', recipeController.updateRecipe);
    fastify.delete('/recipes/:id', recipeController.deleteRecipe);
}