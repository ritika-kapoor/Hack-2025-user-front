'use client'
import RecipesLists from "@/components/Recipes/RecipeLists"
import UserHeader from "@/components/Recipes/user-header"
import useRecipesApi from "@/features/recipes/UseRecipesApi"

export default function MainRecipes() {
    const { recipes} = useRecipesApi();
    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center">
                <UserHeader />
                <RecipesLists recipes={recipes}/>
            </div>
        </div>
    )
}