export interface Recipe {
  recipeID: string;
  recipeName: string;
  imageURL: string;
  username: string;
  recipePublic: boolean;
  recipeIngredients: string[];
  recipeInstructions: string[];
}
