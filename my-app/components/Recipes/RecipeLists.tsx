'use client';

// このページはレシピの一覧を表示するページです。
// 親からpropsでレシピのデータを受け取って、それをRecipesItemsコンポーネントに渡します。
import RecipeItem from "./RecipeItem";
import { useEffect, useState } from "react";

interface RecipesListsProps {
    selectedCategory: string;
}

export default function RecipesLists({ selectedCategory }: RecipesListsProps) {
    const [recipes, setRecipes] = useState<any[]>([]);

    useEffect(() => {
        // localStorageから選択されたカテゴリのレシピを取得
        const storedRecipes = localStorage.getItem(selectedCategory);
        if (storedRecipes) {
            try {
                const parsedRecipes = JSON.parse(storedRecipes);
                setRecipes(parsedRecipes);
            } catch (error) {
                console.error("Error parsing recipes from localStorage:", error);
                setRecipes([]);
            }
        } else {
            setRecipes([]);
        }
    }, [selectedCategory]);

    // レシピが存在しない場合の表示
    if (recipes.length === 0) {
        return (
            <div className="self-stretch p-4 flex flex-col justify-center items-center">
                <p className="text-gray-500">レシピが見つかりません</p>
            </div>
        );
    }
    
    return(
        <div className="self-stretch p-4 flex flex-col justify-start items-start">
            {recipes.map((recipe, index) => (
                <RecipeItem key={recipe.recipe_id || index} recipe={recipe} />
            ))}
        </div>
    )
}