'use client';
import { useEffect } from "react";
import { getRecipes } from "@/features/recipes/GetRecipeApi";

export default function Page() {
    useEffect(() => {
        const fetchAndStoreRecipes = async () => {
            const recipes = await getRecipes();
            if (typeof window !== 'undefined' && recipes) {
                localStorage.setItem("ai_recommended_recipes", JSON.stringify(recipes.ai_recommended_recipes));
                localStorage.setItem("extracted_ingredients", JSON.stringify(recipes.extracted_ingredients));
                localStorage.setItem("low_calorie_recipes", JSON.stringify(recipes.low_calorie_recipes));
                localStorage.setItem("low_price_recipes", JSON.stringify(recipes.low_price_recipes));
                localStorage.setItem("quick_cook_recipes", JSON.stringify(recipes.quick_cook_recipes));
            }
        };
        fetchAndStoreRecipes();
    }, []);

    return (
        <div>
            <h1>ダミーデータを読み込んで、localstorageに保存しました。</h1>
        </div>
    )
}