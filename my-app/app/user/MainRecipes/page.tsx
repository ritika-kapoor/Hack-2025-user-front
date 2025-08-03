import RecipesLists from "@/components/Recipes/RecipeLists"
import UserHeader from "@/components/Recipes/user-header"
import { getRecipes } from "@/features/recipes/GetRecipeApi";

export default async function MainRecipes() {
    const recipes = await getRecipes();
    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center">
                <UserHeader />
                <RecipesLists recipes={recipes}/>
            </div>
        </div>
    )
}