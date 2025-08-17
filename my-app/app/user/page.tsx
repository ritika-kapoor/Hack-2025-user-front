import { Suspense } from "react"
import FoodCardGrid from "@/components/food-card-grid"
import SearchFilters from "@/components/search-filters"
import AuthGuard from "@/components/AuthGuard"
import { Loader2 } from "lucide-react"

export default function UserHomePage() {
  return (
    <AuthGuard>
      <main className="container mx-auto px-4 pb-24 pt-4">
        <h1 className="text-2xl font-bold mb-4">Available Food</h1>

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
    </AuthGuard>
  )
}
