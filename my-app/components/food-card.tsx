import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"
import Link from "next/link"

interface FoodCardProps {
  item: {
    id: string
    name: string
    restaurant: string
    originalPrice: number
    discountedPrice: number
    image: string
    expiresIn: string
    distance: string
    category: string
  }
}

export default function FoodCard({ item }: FoodCardProps) {
  const discountPercentage = Math.round(((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100)

  return (
    <Link href={`/user/food/${item.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
        <div className="relative">
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-green-600">{discountPercentage}% OFF</Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg line-clamp-1">{item.name}</h3>
            <Badge variant="outline">{item.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{item.restaurant}</p>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{item.expiresIn}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{item.distance}</span>
            </div>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-lg font-bold">¥{item.discountedPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">¥{item.originalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
