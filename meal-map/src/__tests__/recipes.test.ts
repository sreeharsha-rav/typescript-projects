import { FastifyInstance } from 'fastify';
import { build } from '../app';
import { Recipe } from '@prisma/client';
import { recipeService } from '../services/recipeService';

let app: FastifyInstance;

// Setup and teardown
beforeAll(async () => {
    app = await build();
});

afterAll(async () => {
    await app.close();
});

/*
 * Test cases for the Recipe API
 * - Create a new recipe
 * - Get all recipes
 * - Get a specific recipe
 * - Update a recipe
 * - Delete a recipe
 * - TODO: Add more test cases
 */
describe('Recipe API', () => {

    // Mock recipe data
    const mockRecipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'> = {
        name: 'Test Recipe',
        description: 'This is a test recipe',
        imageURL: 'https://example.com/test-recipe.jpg',
    };

    let createdRecipeId: number;

    beforeEach(async () => {
        // Clear the database before each test
        await recipeService.deleteAll();
    });
    
    test('POST /api/recipes - Create a new recipe', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/api/recipes',
            payload: mockRecipe,
        });

        expect(response.statusCode).toBe(201);
        const createdRecipe = JSON.parse(response.payload).recipe;
        expect(createdRecipe.name).toBe(mockRecipe.name);
        expect(createdRecipe.description).toBe(mockRecipe.description);
        expect(createdRecipe.imageURL).toBe(mockRecipe.imageURL);
        createdRecipeId = createdRecipe.id;
    });

    test('GET /api/recipes - Get all recipes', async () => {
        // First, create a recipe
        await recipeService.createRecipe(mockRecipe);

        const response = await app.inject({
            method: 'GET',
            url: '/api/recipes',
        });

        expect(response.statusCode).toBe(200);
        const recipes = JSON.parse(response.payload);
        expect(recipes).toBeInstanceOf(Array);
        expect(recipes.length).toBe(1);
        expect(recipes[0].name).toBe(mockRecipe.name);
    });

    test('GET /api/recipes/:id - Get a specific recipe', async () => {
        // First, create a recipe
        const createdRecipe = await recipeService.createRecipe(mockRecipe);

        const response = await app.inject({
            method: 'GET',
            url: `/api/recipes/${createdRecipe.id}`,
        });

        expect(response.statusCode).toBe(200);
        const recipe = JSON.parse(response.payload);
        expect(recipe.id).toBe(createdRecipe.id);
        expect(recipe.name).toBe(mockRecipe.name);
    });

    test('PUT /api/recipes/:id - Update a recipe', async () => {
        // First, create a recipe
        const createdRecipe = await recipeService.createRecipe(mockRecipe);

        const updatedRecipe = {
            name: 'Updated Recipe Name',
            description: 'Updated description',
        };

        const response = await app.inject({
            method: 'PUT',
            url: `/api/recipes/${createdRecipe.id}`,
            payload: updatedRecipe,
        });

        expect(response.statusCode).toBe(200);
        const recipe = JSON.parse(response.payload).recipe;
        expect(recipe.id).toBe(createdRecipe.id);
        expect(recipe.name).toBe(updatedRecipe.name);
        expect(recipe.description).toBe(updatedRecipe.description);
    });

    test('DELETE /api/recipes/:id - Delete a recipe', async () => {
        // First, create a recipe
        const createdRecipe = await recipeService.createRecipe(mockRecipe);

        const response = await app.inject({
            method: 'DELETE',
            url: `/api/recipes/${createdRecipe.id}`,
        });

        expect(response.statusCode).toBe(204);

        // Verify that the recipe was deleted
        const getResponse = await app.inject({
            method: 'GET',
            url: `/api/recipes/${createdRecipe.id}`,
        });

        expect(getResponse.statusCode).toBe(404);
    });
});
