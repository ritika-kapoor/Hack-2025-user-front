"use client"

import { getStoreRecipes } from "@/features/store-recipes/get-store-recipes"
import StoreRecipeItem from "./store-recipe-item";
import { Recipe } from "@/types/Recipe";
import StoreRecipesHeader from "./store-recipe-header";
import { useState, useEffect } from "react";

export default function StoreRecipeLists() {
    const [storeRecipes, setStoreRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = await getStoreRecipes();
            if (recipes) {
                setStoreRecipes(recipes);
                setFilteredRecipes(recipes);
            }
            setLoading(false);
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!storeRecipes || storeRecipes.length === 0) {
        return <div>レシピが見つかりませんでした。</div>; 
    }

    return (
        <div>
            {Array.isArray(storeRecipes) && (
                <StoreRecipesHeader recipe={storeRecipes} setFilteredRecipes={setFilteredRecipes} />
            )}
            <div className="self-stretch p-4 flex flex-col justify-start items-start">
                {Array.isArray(filteredRecipes) && filteredRecipes.map((recipe: Recipe) => (
                    <StoreRecipeItem key={recipe.recipe_id} recipe={recipe}/>
                ))}
            </div>
        </div>
    )
}