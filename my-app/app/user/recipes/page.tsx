import { Suspense } from "react"
import RecipeGrid from "@/components/recipe-grid"
import RecipeFilters from "@/components/recipe-filters"
import AiRecipeSuggestion from "@/components/ai-recipe-suggestion"
import { Button } from "@/components/ui/button"
import { PlusCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function RecipePage() {
  return (
    <main className="container mx-auto px-4 pb-24 pt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <Link href="/user/recipes/create">
          <Button size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>New Recipe</span>
          </Button>
        </Link>
      </div>

      <AiRecipeSuggestion />

      <RecipeFilters />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="sr-only">Loading</span>
          </div>
        }
      >
        <RecipeGrid />
      </Suspense>
    </main>
  )
}
