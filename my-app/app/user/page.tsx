import { Suspense } from "react"
import FoodCardGrid from "@/components/food-card-grid"
import SearchFilters from "@/components/search-filters"
import { Loader2 } from "lucide-react"
import LogoutButton from "@/components/logout-button" // 👈 add

export default function UserHomePage() {
  return (
    <main className="container mx-auto px-4 pb-24 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Available Food</h1>
        <LogoutButton />
      </div>

      <SearchFilters />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="sr-only">Loading</span>
          </div>
        }
      >
        <FoodCardGrid />
      </Suspense>
    </main>
  )
}
