import { FastifyRequest, FastifyReply } from 'fastify';
import { recipeService } from '../services/recipeService';
import { Recipe } from '../models/recipe';

/*
 * Controller for recipes to handle requests and responses
    * getAllRecipes - get all recipes
    * getRecipeById - get a single recipe by ID
    * createRecipe - create a new recipe
    * updateRecipe - update a recipe by ID
    * deleteRecipe - delete a recipe by ID
*/
class RecipeController {
    private static instance: RecipeController;  // Singleton instance

    private constructor() {}

    // Get the singleton instance of the controller
    public static getInstance(): RecipeController {
        if (!RecipeController.instance) {
            RecipeController.instance = new RecipeController();
        }
        return RecipeController.instance;
    }

    /* Request and response handling for recipe operations */

    async getAllRecipes(request: FastifyRequest, reply: FastifyReply) {
        const recipes = await recipeService.getAllRecipes();
        reply.send(recipes);
    }

    async getRecipeById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const id = parseInt(request.params.id);

        // Check if ID is a number -> TODO: Move this to a validation middleware
        if (typeof id !== 'number') {
            reply.code(400).send({ error: 'Invalid ID' });
            return;
        }

        const recipe = await recipeService.getRecipeById(id);
        if (recipe) {
            reply.send(recipe);
        } else {
            reply.code(404).send({ error: 'Recipe not found' });
        }
    }

    async createRecipe(request: FastifyRequest<{ Body: Omit<Recipe, 'id'> }>, reply: FastifyReply) {
        try {
            const recipe = await recipeService.createRecipe(request.body);
            reply.code(201).send({ message: 'Recipe created successfully', recipe });
        } catch (error) {
            reply.code(400).send({ error: 'Failed to create recipe' });
        }
    }

    async updateRecipe(request: FastifyRequest<{ Params: { id: string }, Body: Partial<Recipe> }>, reply: FastifyReply) {
        const id = parseInt(request.params.id);

        // Check if ID is a number
        if (typeof id !== 'number') {
            reply.code(400).send({ error: 'Invalid ID' });
            return;
        }

        const updatedRecipe = await recipeService.updateRecipe(id, request.body);
        if (updatedRecipe) {
            reply.send({ message: 'Recipe updated successfully', recipe: updatedRecipe });
        } else {
            reply.code(404).send({ error: 'Recipe not found' });
        }
    }

    async deleteRecipe(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const id = parseInt(request.params.id);

        // Check if ID is a number
        if (typeof id !== 'number') {
            reply.code(400).send({ error: 'Invalid ID' });
            return;
        }

        const deleted = await recipeService.deleteRecipe(id);
        if (deleted) {
            reply.code(204).send({ message: 'Recipe deleted successfully' });
        } else {
            reply.code(404).send({ error: 'Recipe not found' });
        }
    }
}

export const recipeController = RecipeController.getInstance();
