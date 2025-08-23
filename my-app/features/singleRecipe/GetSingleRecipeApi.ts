import type { RecipeDetail } from "@/types/RecipeDetail";

export const getSingleRecipe = async (id: string): Promise<RecipeDetail | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/ShowRecipe?id=${id}`);

  if (!response.ok) {
    // エラーレスポンスの場合
    console.error(`Failed to fetch recipe: ${response.status} ${response.statusText}`);
    return null;
  }

  const data: RecipeDetail = await response.json();
  return data;
};