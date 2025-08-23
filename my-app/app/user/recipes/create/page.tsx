"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import AuthGuard from "@/components/AuthGuard"
import { Camera, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateRecipePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to recipes page
    router.push("/user/recipes")
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Create New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Recipe Title</Label>
          <Input id="title" placeholder="Enter recipe title" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ingredients">Ingredients</Label>
          <Textarea
            id="ingredients"
            placeholder="Enter ingredients (one per line)"
            className="min-h-[120px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea
            id="instructions"
            placeholder="Enter step-by-step instructions"
            className="min-h-[200px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tips">Tips for Using Leftovers</Label>
          <Textarea
            id="tips"
            placeholder="Share tips for using leftovers or preventing waste"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tag">Tags</Label>
          <div className="flex gap-2">
            <Input
              id="tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. #cabbage #quick"
            />
            <Button type="button" onClick={addTag} variant="outline">
              Add
            </Button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Photo</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Camera className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Upload a photo of your recipe</p>
              <Button type="button" variant="outline" size="sm" className="mt-2">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Post Recipe"}
          </Button>
        </div>
      </form>
      </div>
    </AuthGuard>
  )
}
