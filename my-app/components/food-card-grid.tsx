import FoodCard from "./food-card"

// Mock data for food items
const foodItems = [
  {
    id: "1",
    name: "Vegetable Curry",
    restaurant: "Spice Garden",
    originalPrice: 1200,
    discountedPrice: 500,
    image:  "/images/vegetable-curry.jpg",
    expiresIn: "5 hours",
    distance: "0.8 km",
    category: "Main Dish",
  },
  {
    id: "2",
    name: "Fresh Bread Loaf",
    restaurant: "Artisan Bakery",
    originalPrice: 490,
    discountedPrice: 250,
    image: "/images/bread.jpeg",
    expiresIn: "8 hours",
    distance: "1.2 km",
    category: "Bakery",
  },
  {
    id: "3",
    name: "Organic Eggs (6)",
    restaurant: "Farm Fresh Market",
    originalPrice: 3.99,
    discountedPrice: 2.0,
    image: "/placeholder.svg?height=200&width=200",
    expiresIn: "2 days",
    distance: "0.5 km",
    category: "Ingredients",
  },
  {
    id: "4",
    name: "Sushi Platter",
    restaurant: "Ocean Delights",
    originalPrice: 18.99,
    discountedPrice: 9.5,
    image: "/placeholder.svg?height=200&width=200",
    expiresIn: "3 hours",
    distance: "1.5 km",
    category: "Main Dish",
  },
  {
    id: "5",
    name: "Eggplant (2)",
    restaurant: "Green Grocer",
    originalPrice: 2.99,
    discountedPrice: 1.25,
    image: "/placeholder.svg?height=200&width=200",
    expiresIn: "4 days",
    distance: "0.7 km",
    category: "Ingredients",
  },
  {
    id: "6",
    name: "Chocolate Cake Slice",
    restaurant: "Sweet Treats",
    originalPrice: 5.99,
    discountedPrice: 3.0,
    image: "/placeholder.svg?height=200&width=200",
    expiresIn: "1 day",
    distance: "1.0 km",
    category: "Dessert",
  },
]

export default function FoodCardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {foodItems.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  )
}
