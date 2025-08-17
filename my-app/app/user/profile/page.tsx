"use client"

import { Button } from "@/components/ui/button"
import AuthGuard from "@/components/AuthGuard"
import { useAuth } from "@/hooks/useAuth"
import { User, LogOut, Settings, Shield, Mail } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <AuthGuard>
      <main className="container mx-auto px-4 pb-24 pt-6">
        <div className="max-w-md mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name || "ユーザー"}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          {/* ユーザー情報セクション */}
          <div className="bg-white rounded-lg border shadow-sm mb-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">アカウント情報</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">メールアドレス</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 設定メニュー */}
          <div className="bg-white rounded-lg border shadow-sm mb-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">設定</h2>
            </div>
            <div className="divide-y">
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">アカウント設定</span>
                </div>
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">プライバシー設定</span>
                </div>
              </button>
            </div>
          </div>

          {/* ログアウトボタン */}
          <Button
            onClick={logout}
            variant="outline"
            className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all"
          >
            <LogOut className="h-5 w-5 mr-2" />
            ログアウト
          </Button>
        </div>
      </main>
    </AuthGuard>
  )
}
