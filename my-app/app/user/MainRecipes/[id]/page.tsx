import RecipeDetail from "@/components/Recipes/RecipeDetail/RecipeDetail";
import { getSingleRecipe } from "@/features/singleRecipe/GetSingleRecipeApi";
 
export default async function Page({params}: {params: {id: string}}) {
    // console.log(params.id)
    const recipe = await getSingleRecipe(params.id)

    if (!recipe) {
        // レシピがnullの場合、レシピが見つからないことを表示
        return <div>レシピが見つかりませんでした。</div>; 
    }

    return (
        <RecipeDetail recipe={recipe}/>
    )
}