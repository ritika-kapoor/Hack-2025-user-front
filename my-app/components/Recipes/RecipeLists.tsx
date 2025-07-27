// このページはレシピの一覧を表示するページです。
// 親からpropsでレシピのデータを受け取って、それをRecipesItemsコンポーネントに渡します。
"use client"
import { Recipe } from "@/types/Recipe";
import RecipeItem from "./RecipeItem";


export default function RecipesLists({recipes}: {recipes: Recipe[]}) {

    return (
        <div className="self-stretch p-4 flex flex-col justify-start items-start">
            {recipes.map(recipe => (
                <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
    )
}