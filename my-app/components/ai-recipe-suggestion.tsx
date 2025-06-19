"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Send, Loader2 } from "lucide-react"

export default function AiRecipeSuggestion() {
  const [ingredients, setIngredients] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestion, setSuggestion] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ingredients.trim()) return

    setIsLoading(true)
    setSuggestion("")

    // Simulate AI response
    setTimeout(() => {
      const mockResponse = `
        Based on your ingredients (${ingredients}), here's a recipe suggestion:
        
        ## Quick ${ingredients.includes("cabbage") ? "Cabbage" : ""} Stir Fry
        
        ### Ingredients:
        - ${ingredients}
        - 2 cloves garlic, minced
        - 1 tbsp olive oil
        - Salt and pepper to taste
        
        ### Instructions:
        1. Heat oil in a pan over medium heat
        2. Add garlic and sauté until fragrant
        3. Add all ingredients and stir fry for 5-7 minutes
        4. Season with salt and pepper
        5. Serve hot
        
        This recipe helps reduce food waste by using ingredients you already have!
      `

      setSuggestion(mockResponse)
      setIsLoading(false)
    }, 1500)
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      // In a real app, stop recording and process speech to text
    } else {
      setIsRecording(true)
      // In a real app, start recording

      // Simulate speech recognition result
      setTimeout(() => {
        setIngredients((prev) => prev + (prev ? ", " : "") + "cabbage, bacon")
        setIsRecording(false)
      }, 2000)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>AI Recipe Suggestions</CardTitle>
        <CardDescription>Enter ingredients you have and get recipe suggestions to reduce food waste</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Enter ingredients separated by commas (e.g., cabbage, bacon, eggs)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              onClick={toggleRecording}
              className="self-start"
            >
              <Mic className={`h-4 w-4 ${isRecording ? "animate-pulse" : ""}`} />
              <span className="sr-only">{isRecording ? "Stop recording" : "Start recording"}</span>
            </Button>
          </div>

          <Button type="submit" disabled={isLoading || !ingredients.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating suggestion...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Get Recipe Suggestions
              </>
            )}
          </Button>
        </form>

        {suggestion && (
          <div className="mt-4 p-4 bg-muted rounded-md whitespace-pre-line">
            <h3 className="font-medium mb-2">AI Suggestion:</h3>
            <div className="text-sm">{suggestion}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
