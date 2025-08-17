"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, RotateCcw, Check, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CameraCaptureProps {
  onImageCapture: (imageDataUrl: string) => void
  onBack: () => void
}

export default function CameraCapture({ onImageCapture, onBack }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isMobile ? 'environment' : 'user', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      setStream(mediaStream)
      setIsCameraActive(true)
      setError(null)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('カメラにアクセスできませんでした。カメラの権限を確認してください。')
      // Fallback to mock camera for demo purposes
      setIsCameraActive(true)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsCameraActive(false)
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw the current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8)
        setCapturedImage(imageDataUrl)
      }
    } else {
      // Fallback: create a mock refrigerator image
      const canvas = document.createElement('canvas')
      canvas.width = 400
      canvas.height = 300
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Create a mock refrigerator image
        ctx.fillStyle = '#f0f0f0'
        ctx.fillRect(0, 0, 400, 300)
        ctx.fillStyle = '#87CEEB'
        ctx.fillRect(50, 50, 300, 200)
        ctx.fillStyle = '#90EE90'
        ctx.fillRect(70, 70, 60, 40)
        ctx.fillStyle = '#FFB6C1'
        ctx.fillRect(150, 70, 80, 60)
        ctx.fillStyle = '#FFD700'
        ctx.fillRect(250, 70, 70, 50)
      }
      
      const imageDataUrl = canvas.toDataURL('image/jpeg')
      setCapturedImage(imageDataUrl)
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
  }

  const confirmPhoto = () => {
    if (capturedImage) {
      onImageCapture(capturedImage)
    }
  }

  const handleBack = () => {
    stopCamera()
    onBack()
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">
          <Camera className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg font-semibold">カメラエラー</p>
        </div>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="space-x-4">
          <Button onClick={handleBack} variant="outline">
            戻る
          </Button>
          <Button onClick={startCamera}>
            再試行
          </Button>
        </div>
      </div>
    )
  }

  if (capturedImage) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <img 
            src={capturedImage} 
            alt="Captured refrigerator contents" 
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="absolute top-4 left-4 right-4 bg-gray-800 bg-opacity-80 text-white p-3 rounded-lg">
            <p className="text-center">冷蔵庫の中を写してください</p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button onClick={retakePhoto} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            撮り直し
          </Button>
          <Button onClick={confirmPhoto} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Check className="w-4 h-4" />
            確認
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        {isCameraActive && stream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-80 object-cover rounded-lg bg-gray-900"
          />
        ) : (
          <div className="w-full h-80 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Camera className="w-16 h-16 mx-auto mb-4 animate-pulse" />
              <p>カメラを起動中...</p>
              {isMobile && (
                <div className="mt-2 text-sm text-gray-300 flex items-center justify-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  モバイルカメラを使用
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="absolute top-4 left-4 right-4 bg-gray-800 bg-opacity-80 text-white p-3 rounded-lg">
          <p className="text-center">冷蔵庫の中を写してください</p>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={captureImage}
          disabled={!isCameraActive}
          size="lg"
          className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Camera className="w-10 h-10 text-white" />
        </Button>
      </div>
      
      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
} 