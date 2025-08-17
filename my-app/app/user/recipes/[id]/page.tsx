import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AuthGuard from "@/components/AuthGuard"
import { Bookmark, Clock, ChefHat, ArrowLeft } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const getRecipe = (id: string) => {
  return {
    id,
    title: "Cabbage and Bacon Stir Fry",
    author: "Home Cook Cafe",
    authorType: "restaurant" as const,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["#cabbage", "#bacon", "#quick", "#easy", "#fridge-cleaning"],
    savedCount: 32,
    prepTime: "10 mins",
    cookTime: "15 mins",
    ingredients: [
      "1 small cabbage, shredded",
      "200g bacon, diced",
      "2 cloves garlic, minced",
      "1 tbsp soy sauce",
      "1 tsp black pepper",
      "2 tbsp olive oil",
      "Salt to taste",
    ],
    instructions: [
      "Heat olive oil in a large pan over medium heat.",
      "Add diced bacon and cook until crispy, about 5 minutes.",
      "Add minced garlic and cook for 30 seconds until fragrant.",
      "Add shredded cabbage and stir fry for 5-7 minutes until wilted but still slightly crisp.",
      "Season with soy sauce, black pepper, and salt to taste.",
      "Serve hot as a main dish or side.",
    ],
    tips: "This recipe is perfect for using up leftover cabbage. You can also add other vegetables like carrots or bell peppers that need to be used up. The bacon can be substituted with leftover ham or sausage.",
  }
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipe = getRecipe(id)

  return (
    <AuthGuard>
      <div className="pb-20">
      <div className="relative h-64 sm:h-80">
        <Link href="/user/recipes" className="absolute top-4 left-4 z-10">
          <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" size="icon" className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
      </div>

      <div className="container px-4 py-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          {recipe.authorType === "restaurant" && <Badge className="bg-blue-600">Restaurant</Badge>}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{recipe.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {recipe.prepTime} prep · {recipe.cookTime} cook
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-3">
                <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {index + 1}
                </div>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Tips for Using Leftovers</h2>
          <div className="bg-muted p-4 rounded-md">
            <p>{recipe.tips}</p>
          </div>
        </section>
      </div>
      </div>
    </AuthGuard>
  )
}
