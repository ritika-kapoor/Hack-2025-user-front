'use client';

import RecipesLists from "@/components/Recipes/RecipeLists";
import UserHeader from "@/components/Recipes/user-header";
import { useState } from "react";

export default function RecipesContainer() {
  const [selectedCategory, setSelectedCategory] = useState('ai_recommended_recipes');
  
  return (
    <div className="flex flex-col items-center">
      <UserHeader onCategoryChange={setSelectedCategory} />
      <RecipesLists selectedCategory={selectedCategory} />
    </div>
  );
}
