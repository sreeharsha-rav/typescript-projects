import { Recipe } from "./types/recipe";

/*
 * Recipe database to store and manage recipes in memory
    * getAllRecipes - get all recipes
    * getRecipeById - get a single recipe by ID
    * addRecipe - add a new recipe
    * updateRecipe - update an existing recipe
    * deleteRecipe - delete a recipe by ID
 */
class RecipeDatabase {
    private recipes: Recipe[];

    constructor() {
        this.recipes = [
            {
                id: 1,
                name: "Spaghetti Carbonara",
                description: "A classic Italian pasta dish made with cream, eggs, Parmesan cheese, bits of bacon, and plenty of black pepper.",
                imageURL: "https://example.com/images/spaghetti-carbonara.jpg"
            },
            {
                id: 2,
                name: "Margherita Pizza",
                description: "Simple yet delicious pizza topped with fresh tomatoes, mozzarella cheese, fresh basil, and extra-virgin olive oil.",
                imageURL: "https://example.com/images/margherita-pizza.jpg"
            },
            {
                id: 3,
                name: "Caesar Salad",
                description: "Crisp romaine lettuce tossed with traditional Caesar dressing, croutons, and Parmesan cheese.",
                imageURL: "https://example.com/images/caesar-salad.jpg"
            },
            {
                id: 4,
                name: "Beef Bourguignon",
                description: "A French stew made with beef braised in red wine, often red Burgundy, and beef broth, typically flavored with carrots, onions, garlic, and a bouquet garni, and garnished with pearl onions, mushrooms, and bacon.",
                imageURL: "https://example.com/images/beef-bourguignon.jpg"
            },
            {
                id: 5,
                name: "Chicken Tikka Masala",
                description: "Chunks of grilled chicken (tikka) cooked in a smooth, creamy, and spicy sauce rich in Indian spices and tomato base.",
                imageURL: "https://example.com/images/chicken-tikka-masala.jpg"
            }
        ];
    }

    getAllRecipes(): Recipe[] {
        return this.recipes;
    }

    getRecipeById(id: number): Recipe | undefined {
        return this.recipes.find(recipe => recipe.id === id);
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
    }

    updateRecipe(id: number, updatedRecipe: Recipe): void {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            this.recipes[index] = updatedRecipe;
        }
    }

    deleteRecipe(id: number): void {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            this.recipes.splice(index, 1);
        }
    }
}

// Create an instance of the RecipeDatabase class
const recipeDatabase = new RecipeDatabase();

export default recipeDatabase;