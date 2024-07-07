import { Recipe } from '../models/recipe';
import { prisma } from '../config/prisma';

/*
 * Service for recipes to handle logic for recipe operations
    * getAllRecipes - get all recipes
    * getRecipeById - get a single recipe by ID
    * createRecipe - create a new recipe
    * updateRecipe - update a recipe by ID
    * deleteRecipe - delete a recipe by ID
*/
class RecipeService {
    private static instance: RecipeService;  // Singleton instance

    private constructor() {}

    // Get the singleton instance of the service
    public static getInstance(): RecipeService {
        if (!RecipeService.instance) {
            RecipeService.instance = new RecipeService();
        }
        return RecipeService.instance;
    }

    /* Logic for handling recipe operations */

    async getAllRecipes(): Promise<Recipe[]> {
        try {
            return prisma.recipe.findMany();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getRecipeById(id: number): Promise<Recipe | null> {
        try {
            return prisma.recipe.findUnique({ where: { id } });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createRecipe(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
        try {
            return prisma.recipe.create({ data: recipe });
        } catch (error) {
            console.error(error);
            throw new Error('Prisma: Failed to create recipe');
        }
    }

    async updateRecipe(id: number, recipe: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Recipe | null> {
        try {
            return prisma.recipe.update({ where: { id }, data: recipe });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteRecipe(id: number): Promise<boolean> {
        try {
            await prisma.recipe.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}

export const recipeService = RecipeService.getInstance();
