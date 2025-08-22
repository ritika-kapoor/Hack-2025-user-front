"use client"

import { Button } from "@/components/ui/button"
import AuthGuard from "@/components/AuthGuard"
import { useAuth } from "@/hooks/useAuth"
import { User, LogOut, MapPin, Loader2, CheckCircle, AlertCircle, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const editProfileSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  zipcode: z.string().optional(),
  prefecture: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
})

type EditProfileForm = z.infer<typeof editProfileSchema>

export default function ProfilePage() {
  const { user, logout } = useAuth()
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
  })

  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSearchingAddress, setIsSearchingAddress] = useState(false)
  const [addressError, setAddressError] = useState("")

  // 郵便番号を監視
  const zipcode = watch("zipcode")

  // 郵便番号から住所を検索
  useEffect(() => {
    const searchAddress = async () => {
      // 郵便番号が7桁の数字でない場合は処理しない
      if (!zipcode || !/^\d{7}$/.test(zipcode)) {
        setAddressError("")
        return
      }

      setIsSearchingAddress(true)
      setAddressError("")

      try {
        const response = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`)
        
        if (response.data.status === 200 && response.data.results && response.data.results.length > 0) {
          const result = response.data.results[0]
          
          // 住所情報をフォームに設定
          setValue("prefecture", result.address1)
          setValue("city", result.address2)
          setValue("street", result.address3)
          
        } else {
          setAddressError("該当する住所が見つかりませんでした")
        }
      } catch (err) {
        console.error("住所検索エラー:", err)
        setAddressError("住所の検索に失敗しました")
      } finally {
        setIsSearchingAddress(false)
      }
    }

    // デバウンス処理（500ms待ってから実行）
    const timeoutId = setTimeout(searchAddress, 500)
    return () => clearTimeout(timeoutId)
  }, [zipcode, setValue])

  // プロファイル情報取得
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return
      
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        
        const response = await axios.get("http://localhost:8080/api/v1/users/profile", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        const profile = response.data.data
        
        // フォームに値をセット
        setValue("name", profile.name || "")
        setValue("zipcode", profile.zipcode || "")
        setValue("prefecture", profile.prefecture || "")
        setValue("city", profile.city || "")
        setValue("street", profile.street || "")
        
      } catch (err: unknown) {
        console.error("プロファイル情報の取得に失敗しました:", err)
        setError("プロファイル情報の取得に失敗しました")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [setValue, user])

  const onSubmit = async (data: EditProfileForm) => {
    setError("")
    setSuccessMessage("")
    
    try {
      const token = localStorage.getItem("token")
      
      const response = await axios.put("http://localhost:8080/api/v1/users/profile", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200) {
        setSuccessMessage("プロファイル情報を更新しました")
      }
    } catch (err: unknown) {
      console.error("更新エラー:", err)
      const axiosError = err as { response?: { data?: { error?: string } } }
      const errorMessage = err instanceof Error 
        ? err.message 
        : axiosError?.response?.data?.error || "プロファイル情報の更新に失敗しました"
      setError(errorMessage)
    }
  }

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">プロファイル情報を読み込み中...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <main className="container mx-auto px-4 pb-24 pt-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* ヘッダー */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">プロファイル設定</h1>
                <p className="text-blue-100">あなたの基本情報と住所を管理できます</p>
              </div>
            </div>
          </div>

          {/* メインフォーム */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 基本情報セクション */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                    <User className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">基本情報</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">名前</Label>
                      <Input 
                        id="name" 
                        {...register("name")} 
                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        placeholder="例：田中太郎"
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="zipcode" className="text-gray-700 font-medium">郵便番号</Label>
                      <div className="relative">
                        <Input 
                          id="zipcode" 
                          {...register("zipcode")} 
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl pr-10"
                          placeholder="1234567（ハイフンなし7桁）"
                          maxLength={7}
                        />
                        {isSearchingAddress && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                          </div>
                        )}
                        {!isSearchingAddress && zipcode && zipcode.length === 7 && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Search className="w-4 h-4 text-green-600" />
                          </div>
                        )}
                      </div>
                      {errors.zipcode && <p className="text-sm text-red-500 mt-1">{errors.zipcode.message}</p>}
                      {addressError && <p className="text-sm text-red-500 mt-1">{addressError}</p>}
                      {!addressError && zipcode && zipcode.length === 7 && !isSearchingAddress && (
                        <p className="text-sm text-green-600 mt-1">✓ 住所を自動入力しました</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 住所情報セクション */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">住所情報</h2>
                    {!addressError && zipcode && zipcode.length === 7 && !isSearchingAddress && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">自動入力済み</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="prefecture" className="text-gray-700 font-medium">都道府県</Label>
                      <Input 
                        id="prefecture" 
                        {...register("prefecture")} 
                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        placeholder="東京都"
                      />
                      {errors.prefecture && <p className="text-sm text-red-500 mt-1">{errors.prefecture.message}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="city" className="text-gray-700 font-medium">市区町村</Label>
                      <Input 
                        id="city" 
                        {...register("city")} 
                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        placeholder="渋谷区"
                      />
                      {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="street" className="text-gray-700 font-medium">番地</Label>
                      <Input 
                        id="street" 
                        {...register("street")} 
                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        placeholder="代々木1-2-3"
                      />
                      {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street.message}</p>}
                    </div>
                  </div>
                </div>

                {/* メッセージ */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-600">{successMessage}</p>
                  </div>
                )}

                {/* ボタン群 */}
                <div className="space-y-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        更新中...
                      </>
                    ) : (
                      "プロファイルを更新"
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={logout}
                    variant="outline"
                    className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all rounded-xl"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    ログアウト
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* ヒントカード */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">💡 ヒント</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• 郵便番号（7桁）を入力すると住所が自動で入力されます</p>
                <p>• 正確な住所情報は、配送サービスなどで役立ちます</p>
                <p>• プロファイル情報は安全に暗号化されて保存されます</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </AuthGuard>
  )
}
