import type { RecipeDetail as RecipeDetailType } from "@/types/RecipeDetail";
import RecipeImage from "./RecipeImage";
import RecipeTitle from "./RecipeTitle";
import RecipeIngredient from "./RecipeIngredient";
import Refrigerator from "./Refrigerator";
import RecipeSteps from "./RecipeSteps";

export default function RecipeDetail({recipe}: {recipe: RecipeDetailType}) {
    return (
        <div className="w-96 mx-auto bg-white">
            <RecipeImage image={recipe.image} />
            <div className="py-10 flex flex-col gap-10">
                <RecipeTitle
                    title={recipe.title}
                    cookingTime={recipe.cookingTime}
                    calories={recipe.calories}
                    store_recipe={recipe.store_recipe}
                    description={recipe.description}
                />
                <RecipeIngredient ingredients={recipe.ingredients}/>
                <Refrigerator/>
                <RecipeSteps steps={recipe.steps} cookingPoint={recipe.cookingPoint} />
            </div>
        </div>
    )
}