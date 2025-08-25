import { Recipe } from "@/types/Recipe";

export const getStoreRecipes = async (): Promise<Recipe[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return [];
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/saved-recipes`, {
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