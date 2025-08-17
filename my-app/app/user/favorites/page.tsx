"use client"

import AuthGuard from "@/components/AuthGuard"
import { Bookmark, Heart } from "lucide-react"

export default function FavoritesPage() {
  return (
    <AuthGuard>
      <main className="container mx-auto px-4 pb-24 pt-4">
        <h1 className="text-2xl font-bold mb-6">お気に入り</h1>
        
        {/* プレースホルダーコンテンツ */}
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">お気に入りはまだありません</h2>
          <p className="text-gray-500">商品やレシピをお気に入りに追加すると、ここに表示されます。</p>
        </div>
      </main>
    </AuthGuard>
  )
}
