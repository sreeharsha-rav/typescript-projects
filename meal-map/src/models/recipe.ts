/*
 * Recipe type
    * id - unique identifier for the recipe
    * name - name of the recipe (e.g. "Spaghetti Carbonara")
    * description - description of the recipe
    * imageURL - URL of the image for the recipe
 */
export interface Recipe {
    id: number;
    name: string;
    description: string;
    imageURL: string;
    createdAt: Date;
    updatedAt: Date;
}