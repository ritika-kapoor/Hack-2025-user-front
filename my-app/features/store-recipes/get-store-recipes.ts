import { Recipe } from "@/types/Recipe";

export const getStoreRecipes = async (): Promise<Recipe[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/StoreRecipe`);
  const data = await response.json();
  return data.filter((recipe: Recipe) => recipe.store_recipe === true);
};