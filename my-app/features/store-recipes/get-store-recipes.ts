import { Recipe } from "@/types/Recipe";

export const getStoreRecipes = async (): Promise<Recipe[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return [];
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
    const response = await fetch(`${baseUrl}/api/v1/saved-recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.data.recipes; // recipesを返す
  } catch (error) {
    alert(error);
    return [];
  }
};