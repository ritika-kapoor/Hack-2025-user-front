// このページはレシピの一覧を表示するページです。
// 親からpropsでレシピのデータを受け取って、それをRecipesItemsコンポーネントに渡します。
"use client"
import { Recipe } from "@/types/Recipe";
import RecipeItem from "./RecipeItem";


export default function RecipesLists({recipes}: {recipes: Recipe[]}) {

    return (
        <div className="self-stretch p-4 flex flex-col justify-start items-start">
            <div className="self-stretch px-14 py-4 relative inline-flex justify-center items-center gap-14">
                <div className="text-center justify-start text-black text-sm font-bold font-['Work_Sans'] leading-tight">本日分</div>
                <div className="text-center justify-start text-zinc-400 text-sm font-bold font-['Work_Sans'] leading-tight">数日分</div>
            </div>
            {recipes.map(recipe => (
                <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
    )
}