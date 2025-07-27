'use client'

import { Recipe } from "@/types/Recipe";
import { useEffect, useState } from "react";
import { getRecipes } from "./GetRecipeApi";

export default function useRecipesApi() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        getRecipes().then(setRecipes);
    }, []);

    return { recipes}
}