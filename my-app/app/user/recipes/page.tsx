'use client';

import RecipesLists from "@/components/Recipes/RecipeLists";
import UserHeader from "@/components/Recipes/user-header";
import { Suspense, useState } from "react";

export default function MainRecipes() {
  const [selectedCategory, setSelectedCategory] = useState('ai_recommended_recipes');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <span className="sr-only">Loading</span>
          </div>
        }
      >
        <div className="flex flex-col items-center">
          <UserHeader onCategoryChange={setSelectedCategory} />
          <RecipesLists selectedCategory={selectedCategory} />
        </div>
      </Suspense>
    </div>
  )
}
