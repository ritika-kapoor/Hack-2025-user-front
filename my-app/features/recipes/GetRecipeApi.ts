import { Recipe } from "@/types/Recipe";

export const getRecipes = async (): Promise<Recipe[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/Recipe`);
  const data = await response.json();
  return data;
};