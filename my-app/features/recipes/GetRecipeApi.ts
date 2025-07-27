import { Recipe } from "@/types/Recipe";

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch("/api/Recipe");
  const data = await response.json();
  return data;
};