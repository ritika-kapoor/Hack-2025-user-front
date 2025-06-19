import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark } from "lucide-react"
import Link from "next/link"

interface RecipeCardProps {
  recipe: {
    id: string
    title: string
    author: string
    authorType: "user" | "restaurant"
    image: string
    tags: string[]
    savedCount: number
    ingredients: string[]
  }
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/user/recipes/${recipe.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
        <div className="relative">
          <Image
            src={recipe.image || "/image/vegetable-curry.jpg"}
            alt={recipe.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1.5">
            <Bookmark className="h-4 w-4" />
          </div>
          {recipe.authorType === "restaurant" && (
            <Badge className="absolute top-2 left-2 bg-blue-600">Restaurant</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg line-clamp-1">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{recipe.author}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Ingredients: {recipe.ingredients.slice(0, 3).join(", ")}
            {recipe.ingredients.length > 3 ? "..." : ""}
          </p>

          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Bookmark className="h-3 w-3" />
            <span>{recipe.savedCount} saved</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
