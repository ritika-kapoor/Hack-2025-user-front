// このページはレシピの一覧を表示するページです。
// 親からpropsでレシピのデータを受け取って、それをRecipesItemsコンポーネントに渡します。
import { Recipe } from "@/types/Recipe";
import RecipeItem from "./RecipeItem";
import { getRecipes } from "@/features/recipes/GetRecipeApi";


export default async function RecipesLists() {

    
    const recipes = await getRecipes();
    
    if (!recipes) {
        // レシピがnullの場合、レシピが見つからないことを表示
        return <div>レシピが見つかりませんでした。</div>; 
    }
    
    return (
        <div className="self-stretch p-4 flex flex-col justify-start items-start">
            {recipes.map((recipe: Recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
    )
}