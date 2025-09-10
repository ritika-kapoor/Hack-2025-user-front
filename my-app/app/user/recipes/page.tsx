import RecipesContainer from "../../../components/Recipes/RecipesContainer";
import { Suspense } from "react";

export default function MainRecipes() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <span className="sr-only">Loading</span>
          </div>
        }
      >
        <RecipesContainer />
      </Suspense>
    </div>
  )
}
