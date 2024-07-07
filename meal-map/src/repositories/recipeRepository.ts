import { Recipe } from "../models/recipe";

/*
 * Repository for recipes to interact with recipe data
    * findAll - get all recipes
    * findById - get a single recipe by ID
    * create - create a new recipe
    * update - update a recipe by ID
    * delete - delete a recipe by ID
*/
class RecipeRepository {
    private recipes: Recipe[] = [];

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

    async findAll(): Promise<Recipe[]> {
        return this.recipes;
    }

    async findById(id: number): Promise<Recipe | null> {
        return this.recipes.find(recipe => recipe.id === id) || null;
    }

    async create(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
        const newId = this.recipes.length > 0 ? Math.max(...this.recipes.map(recipe => recipe.id)) + 1 : 1;
        const newRecipe = {
            id: newId,
            name: recipe.name,
            description: recipe.description,
            imageURL: recipe.imageURL
        }
        this.recipes.push(newRecipe);
        return newRecipe;
    }

    async update(id: number, recipe: Partial<Recipe>): Promise<Recipe | null> {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index === -1) return null;
        this.recipes[index] = { ...this.recipes[index], ...recipe };
        return this.recipes[index];
    }

    async delete(id: number): Promise<boolean> {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index === -1) return false;
        this.recipes.splice(index, 1);
        return true;
    }
}

export const recipeRepository = new RecipeRepository();
