"use client"

import { useState, useEffect } from "react"
import { Recipe } from "@/types/Recipe"
import RecipeItem from "@/components/Recipes/RecipeItem"
import UserHeader from "@/components/Recipes/user-header"
import { getRecipes } from "@/features/recipes/GetRecipeApi"
import { Sparkles } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function MainRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentSort, setCurrentSort] = useState("おすすめ")
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([])
  const [aiRecommendations, setAiRecommendations] = useState<Recipe[]>([])

  useEffect(() => {
    // Check for detected ingredients and AI recommendations from localStorage
    const storedIngredients = localStorage.getItem('detectedIngredients')
    const storedRecommendations = localStorage.getItem('aiRecommendations')
    
    if (storedIngredients) {
      try {
        const ingredients = JSON.parse(storedIngredients)
        setDetectedIngredients(ingredients)
      } catch (error) {
        console.error("Error parsing stored ingredients:", error)
      }
    }
    
    if (storedRecommendations) {
      try {
        const recommendations = JSON.parse(storedRecommendations)
        setAiRecommendations(recommendations)
      } catch (error) {
        console.error("Error parsing stored AI recommendations:", error)
      }
    }

    // Load all recipes
    loadRecipes()
  }, [])

  const loadRecipes = async () => {
    try {
      const allRecipes = await getRecipes()
      setRecipes(allRecipes || [])
    } catch (error) {
      console.error("Error loading recipes:", error)
    } finally {
      setIsLoading(false)
    }
  }



  const handleSortChange = (value: string) => {
    setCurrentSort(value)
  }

  const getDisplayRecipes = () => {
    if (currentSort === "おすすめ" && detectedIngredients.length > 0) {
      return aiRecommendations
    }
    return recipes
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <span className="sr-only">Loading</span>
      </div>
    )
  }

  const displayRecipes = getDisplayRecipes()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        <UserHeader onSortChange={handleSortChange} currentSort={currentSort} />
        
        {/* AI Recommendations Header */}
        {currentSort === "おすすめ" && detectedIngredients.length > 0 && (
          <div className="w-full p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg m-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-blue-800">AI おすすめレシピ</h2>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              検出された食材: {detectedIngredients.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              {aiRecommendations.length} 件のレシピが見つかりました
            </p>
          </div>
        )}

        {/* Recipe List */}
        <div className="w-full p-4">
          {displayRecipes.length > 0 ? (
            <div className="space-y-4">
              {displayRecipes.map((recipe) => (
                <RecipeItem key={recipe.recipe_id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {currentSort === "おすすめ" ? "AIおすすめのレシピが見つかりませんでした。" : "レシピが見つかりませんでした。"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
