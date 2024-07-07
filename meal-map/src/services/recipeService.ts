import { Recipe } from '../models/recipe';
import { recipeRepository } from '../repositories/recipeRepository';

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
        return recipeRepository.findAll();
    }

    async getRecipeById(id: number): Promise<Recipe | null> {
        return recipeRepository.findById(id);
    }

    async createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
        return recipeRepository.create(recipe);
    }

    async updateRecipe(id: number, recipe: Partial<Recipe>): Promise<Recipe | null> {
        return recipeRepository.update(id, recipe);
    }

    async deleteRecipe(id: number): Promise<boolean> {
        return recipeRepository.delete(id);
    }
}

export const recipeService = RecipeService.getInstance();
