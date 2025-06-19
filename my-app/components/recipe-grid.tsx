import RecipeCard from "./recipe-card"

// Mock data for recipes
const recipes = [
  {
    id: "1",
    title: "Vegetable Stir Fry",
    author: "Green Garden Restaurant",
    authorType: "restaurant",
    image: "/images/vegetable-curry.jpg",
    tags: ["#vegetables", "#quick", "#healthy"],
    savedCount: 45,
    ingredients: ["Bell peppers", "Broccoli", "Carrots", "Soy sauce", "Ginger"],
  },
  {
    id: "2",
    title: "Leftover Bread Pudding",
    author: "Sarah Johnson",
    authorType: "user",
    image: "/images/Bread_Pudding.jpg",
    tags: ["#bread", "#dessert", "#leftovers"],
    savedCount: 28,
    ingredients: ["Stale bread", "Milk", "Eggs", "Sugar", "Vanilla extract"],
  },
  {
    id: "3",
    title: "Cabbage and Bacon Stir Fry",
    author: "Home Cook Cafe",
    authorType: "restaurant",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["#cabbage", "#bacon", "#quick"],
    savedCount: 32,
    ingredients: ["Cabbage", "Bacon", "Garlic", "Soy sauce", "Black pepper"],
  },
  {
    id: "4",
    title: "Fridge Cleaning Frittata",
    author: "Mike Chen",
    authorType: "user",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["#eggs", "#fridge-cleaning", "#versatile"],
    savedCount: 56,
    ingredients: ["Eggs", "Leftover vegetables", "Cheese", "Herbs", "Olive oil"],
  },
  {
    id: "5",
    title: "Overripe Banana Bread",
    author: "Sweet Bakery",
    authorType: "restaurant",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["#banana", "#baking", "#overripe"],
    savedCount: 67,
    ingredients: ["Overripe bananas", "Flour", "Sugar", "Eggs", "Butter"],
  },
  {
    id: "6",
    title: "Vegetable Scrap Stock",
    author: "Emma Wilson",
    authorType: "user",
    image: "/placeholder.svg?height=200&width=200",
    tags: ["#scraps", "#stock", "#zero-waste"],
    savedCount: 41,
    ingredients: ["Vegetable scraps", "Herbs", "Bay leaf", "Peppercorns", "Water"],
  },
]

export default function RecipeGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
