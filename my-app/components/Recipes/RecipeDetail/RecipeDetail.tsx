import RecipeImage from "./RecipeImage";
import RecipeTitle from "./RecipeTitle";
import RecipeIngredient from "./RecipeIngredient";
import Refrigerator from "./Refrigerator";
import RecipeSteps from "./RecipeSteps";
import { getRecipeDetail } from "@/app/api/ShowRecipe/main-show-recipe";
// import { RecipeApiResponse } from "@/types/RecipeDetail";

export default async function RecipeDetail({id}: {id: string}) {

    const apiResponse = await getRecipeDetail(id);

    if (apiResponse instanceof Response) {
        // エラーレスポンスの場合
        const errorData = await apiResponse.json();
        console.error("API Error Response:", errorData);
        return <div>Error: {errorData.message}</div>;
    }

    console.log("API Response:", apiResponse); // ここにconsole.logを追加

    // apiResponseがnullまたはundefined、または期待されるデータ構造でない場合のチェックを強化
    if (!apiResponse || !apiResponse.data || !apiResponse.data.recipe || !apiResponse.data.ingredients || !apiResponse.data.seasonings || !apiResponse.data.steps) {
        return <div>レシピが見つかりませんでした。</div>;
    }

    const recipeData = apiResponse.data.recipe;
    const ingredientsData = apiResponse.data.ingredients;
    const seasoningsData = apiResponse.data.seasonings;
    const stepsData = apiResponse.data.steps;

    // レシピオブジェクトにマージ
    const fullRecipe = {
        id: recipeData.recipe_id,
        title: recipeData.name,
        description: recipeData.author_comment, // APIレスポンスから取得
        image: recipeData.image_url, // APIレスポンスから画像URLを取得
        ingredients: [
            ...ingredientsData.map((ing: { id: number; name: string; display_order: number; amount_text: string; }) => ({ id: ing.id, name: ing.name, amount: ing.amount_text })),
            ...seasoningsData.map((seasoning: { id: number; name: string; display_order: number; amount_text: string; }) => ({ id: seasoning.id, name: seasoning.name, amount: seasoning.amount_text }))
        ],
        steps: stepsData.map((step: { id: number; instruction: string; step_number: number; }) => ({ id: step.id, description: step.instruction })), // APIレスポンスから取得
        store_recipe: false, // store_recipeはデータに含まれていないため仮でfalse
        cookingTime: recipeData.cook_time.toString(),
        calories: recipeData.calories.toString(),
        cookingPoint: recipeData.cooking_point, // APIレスポンスから取得
    };
    // 
    if (!fullRecipe) {
        // レシピがnullの場合、レシピが見つからないことを表示
        return <div>レシピが見つかりませんでした。</div>; 
    }

    return (
        <div className="w-96 mx-auto bg-white">
            <RecipeImage image={fullRecipe.image} />
            <div className="py-10 flex flex-col gap-10">
                <RecipeTitle
                    title={fullRecipe.title}
                    cookingTime={fullRecipe.cookingTime}
                    calories={fullRecipe.calories}
                    // store_recipe={fullRecipe.store_recipe}
                    // 保存するためにIDを渡す
                    recipe_id={fullRecipe.id}
                    description={fullRecipe.description}
                />
                <RecipeIngredient ingredients={fullRecipe.ingredients}/>
                <Refrigerator/>
                <RecipeSteps steps={fullRecipe.steps} cookingPoint={fullRecipe.cookingPoint} />
            </div>
        </div>
    )
}