"use client"

import { useState, useEffect } from "react"

interface LoadingAnimationProps {
  imageDataUrl?: string | null
}

export default function LoadingAnimation({ imageDataUrl }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    "画像を分析中...",
    "食材を識別中...",
    "レシピを検索中...",
    "完了！"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 60) // Update every 60ms for smooth animation

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer)
          return steps.length - 1
        }
        return prev + 1
      })
    }, 750) // Change step every 750ms

    return () => {
      clearInterval(timer)
      clearInterval(stepTimer)
    }
  }, [])

  return (
    <div className="text-center">
      <div className="mb-8">
        {/* Meguru logo with animation */}
        <div className="w-32 h-32 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-6xl">🍞</span>
        </div>
        <h1 className="text-4xl font-bold text-orange-500 mb-2">meguru</h1>
      </div>
      
      {/* Progress bar */}
      <div className="w-80 h-3 bg-gray-200 rounded-full overflow-hidden mb-6 mx-auto">
        <div 
          className="h-full bg-amber-700 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Current step */}
      <p className="text-xl text-gray-600 mb-6">{steps[currentStep]}</p>
      
      {/* Progress percentage */}
      <p className="text-lg text-gray-500 mb-6">{progress}%</p>
      
      {/* Animated dots */}
      <div className="flex justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i <= currentStep ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Show captured image preview */}
      {imageDataUrl && (
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-3">分析中の画像:</p>
          <div className="relative inline-block">
            <img 
              src={imageDataUrl} 
              alt="Analyzing" 
              className="w-32 h-24 object-cover rounded-lg mx-auto border-2 border-orange-200"
            />
            <div className="absolute inset-0 bg-orange-500 bg-opacity-20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      )}
      
      {/* Loading spinner */}
      <div className="mt-6">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    </div>
  )
} 