"use client"

import { useState } from "react"
import { Camera, BookOpen, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LogoutButton from "@/components/logout-button"
import CameraCapture from "@/components/camera-capture"
import LoadingAnimation from "@/components/loading-animation"
import { useRouter } from "next/navigation"

export default function UserHomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'camera' | 'loading'>('home')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const router = useRouter()

  const handleCameraClick = () => {
    setCurrentView('camera')
  }

  const handleRecipeClick = () => {
    router.push('/user/recipes')
  }

  const handleImageCapture = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl)
    setCurrentView('loading')
    
    // Simulate AI analysis
    setTimeout(() => {
      router.push('/user/recipes')
    }, 4000) // Increased to 4 seconds to show the full loading animation
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setCapturedImage(null)
  }

  if (currentView === 'camera') {
    return (
      <main className="container mx-auto px-4 pb-24 pt-4 min-h-screen bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={handleBackToHome} className="text-lg">
            ← 戻る
          </Button>
          <h1 className="text-2xl font-bold">撮影</h1>
          <div className="w-20"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <CameraCapture 
            onImageCapture={handleImageCapture}
            onBack={handleBackToHome}
          />
        </div>
      </main>
    )
  }

  if (currentView === 'loading') {
    return (
      <main className="container mx-auto px-4 pb-24 pt-4 min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingAnimation imageDataUrl={capturedImage} />
      </main>
    )
  }

  // Home view
  return (
    <main className="container mx-auto px-4 pb-24 pt-4 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">ホーム画面</h1>
        <LogoutButton />
      </div>

      {/* Meguru logo */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-4xl">🍞</span>
        </div>
        <h2 className="text-3xl font-bold text-orange-500">meguru</h2>
      </div>

      {/* Camera option */}
      <Card className="mb-8 cursor-pointer hover:shadow-lg transition-shadow" onClick={handleCameraClick}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <Camera className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-3">冷蔵庫の中身を撮影してレシピを検索しよう</p>
            <h3 className="text-xl font-semibold text-blue-600">撮影</h3>
          </div>
        </CardContent>
      </Card>

      {/* Recipe option */}
      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleRecipeClick}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-gray-600 mb-3">前回のレシピを確認しよう</p>
            <h3 className="text-xl font-semibold text-green-600">レシピ</h3>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
