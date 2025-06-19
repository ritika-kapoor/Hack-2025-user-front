"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function RecipeFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log({ searchQuery, filter })
  }

  return (
    <div className="mb-6 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search recipes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Recipes</SelectItem>
            <SelectItem value="restaurant">Restaurant</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="saved">Saved</SelectItem>
            <SelectItem value="my-recipes">My Recipes</SelectItem>
          </SelectContent>
        </Select>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          All
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          #leftovers
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          #quick
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          #vegetables
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          #fridge-cleaning
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          #zero-waste
        </Button>
      </div>
    </div>
  )
}
