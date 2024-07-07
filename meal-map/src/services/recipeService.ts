import { Recipe } from '../models/recipe';
import { recipeRepository } from '../repositories/recipeRepository';

/*
 * Service for recipes to handle logic
    * getAllRecipes - get all recipes
    * getRecipeById - get a single recipe by ID
    * createRecipe - create a new recipe
    * updateRecipe - update a recipe by ID
    * deleteRecipe - delete a recipe by ID
*/
class RecipeService {
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

export const recipeService = new RecipeService();
