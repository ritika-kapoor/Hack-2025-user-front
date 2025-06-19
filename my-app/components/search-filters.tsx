"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal } from "lucide-react"

export default function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")
  const [maxDistance, setMaxDistance] = useState([5])
  const [maxPrice, setMaxPrice] = useState([20])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log({ searchQuery, category, maxDistance, maxPrice })
  }

  return (
    <div className="mb-6 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search food or restaurant..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Options</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="main-dish">Main Dish</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                    <SelectItem value="ingredients">Ingredients</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Max Distance (km)</label>
                <div className="pt-4">
                  <Slider value={maxDistance} min={0.5} max={10} step={0.5} onValueChange={setMaxDistance} />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>0.5 km</span>
                    <span>{maxDistance[0]} km</span>
                    <span>10 km</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Max Price (¥)</label>
                <div className="pt-4">
                  <Slider value={maxPrice} min={1} max={50} step={1} onValueChange={setMaxPrice} />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>¥1</span>
                    <span>¥{maxPrice[0]}</span>
                    <span>¥50</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={() => handleSearch}>
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          All
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Main Dish
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Dessert
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Bakery
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Ingredients
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Near Me
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          Expiring Soon
        </Button>
      </div>
    </div>
  )
}
