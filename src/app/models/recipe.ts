export interface Recipe {
  recipeID: string;
  recipeName: string;
  imageData: string;
  username: string;
  recipePublic: boolean;
  recipeIngredients: string[];
  recipeInstructions: string[];
}
