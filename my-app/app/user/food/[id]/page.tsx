import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AuthGuard from "@/components/AuthGuard"
import { Clock, MapPin, Store, ArrowLeft } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const getFoodItem = (id: string) => {
  return {
    id,
    name: "Vegetable Curry",
    restaurant: "Spice Garden",
    restaurantAddress: "123 Main St, Anytown",
    originalPrice: 1200,
    discountedPrice: 500,
    image: "/images/vegetable-curry.jpg",
    expiresIn: "5 hours",
    distance: "0.8 km",
    category: "Main Dish",
    description:
      "A delicious vegetable curry made with fresh seasonal vegetables, coconut milk, and aromatic spices. Perfect for a hearty meal.",
    ingredients: ["Seasonal vegetables", "Coconut milk", "Curry spices", "Rice"],
    quantity: 3,
    dietaryInfo: ["Vegetarian", "Gluten-free"],
  }
}

export default function FoodDetailPage({ params }: { params: { id: string } }) {
  const item = getFoodItem(params.id)
  const discountPercentage = Math.round(((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100)

  return (
    <AuthGuard>
      <div className="pb-20">
      <div className="relative h-64 sm:h-80">
        <Link href="/user" className="absolute top-4 left-4 z-10">
          <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Badge className="absolute top-4 right-4 z-10 bg-green-600">{discountPercentage}% OFF</Badge>
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      <div className="container px-4 py-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <Badge variant="outline">{item.category}</Badge>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Store className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{item.restaurant}</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Expires in {item.expiresIn}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{item.distance}</span>
          </div>
        </div>

        <div className="flex items-end gap-2 mb-6">
          <span className="text-2xl font-bold">￥{item.discountedPrice.toFixed(2)}</span>
          <span className="text-lg text-muted-foreground line-through">￥{item.originalPrice.toFixed(2)}</span>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{item.description}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {item.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary">
                {ingredient}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Dietary Information</h2>
          <div className="flex flex-wrap gap-2">
            {item.dietaryInfo.map((info, index) => (
              <Badge key={index} variant="outline">
                {info}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Pickup Information</h2>
          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">{item.restaurant}</p>
            <p className="text-sm text-muted-foreground">{item.restaurantAddress}</p>
            <p className="text-sm mt-2">Available: {item.quantity} left</p>
          </div>
        </section>

        <Button className="w-full">Reserve for Pickup</Button>
      </div>
      </div>
    </AuthGuard>
  )
}
