import { useEffect, useRef } from 'react'
import { Camera } from 'lucide-react'

interface CameraPanelProps {
  videoRef: React.RefObject<HTMLVideoElement>
  overlayCanvasRef: React.RefObject<HTMLCanvasElement>
  isActive: boolean
  error: string | null
  roiHandlers: {
    onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
    onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void
    onMouseLeave: (e: React.MouseEvent<HTMLCanvasElement>) => void
  }
}

export default function CameraPanel({
  videoRef,
  overlayCanvasRef,
  isActive,
  error,
  roiHandlers,
}: CameraPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Синхронизация размеров canvas с видео
  useEffect(() => {
    if (!videoRef.current || !overlayCanvasRef.current) return

    const video = videoRef.current
    const canvas = overlayCanvasRef.current

    const updateSize = () => {
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      }
    }

    video.addEventListener('loadedmetadata', updateSize)
    video.addEventListener('resize', updateSize)

    return () => {
      video.removeEventListener('loadedmetadata', updateSize)
      video.removeEventListener('resize', updateSize)
    }
  }, [videoRef, overlayCanvasRef])

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
      <div ref={containerRef} className="relative w-full h-full">
        {/* Видео (скрытое, используется только как источник) */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Canvas для оверлеев */}
        <canvas
          ref={overlayCanvasRef}
          className="absolute inset-0 w-full h-full object-contain"
          {...roiHandlers}
        />

        {/* Состояние без камеры */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center text-white">
              <Camera size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">{error || 'Выберите камеру и нажмите Start'}</p>
            </div>
          </div>
        )}

        {/* Подсказки по клавишам */}
        {isActive && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-xs space-y-1">
            <div><kbd className="bg-gray-700 px-2 py-1 rounded">C</kbd> - Режим ROI</div>
            <div><kbd className="bg-gray-700 px-2 py-1 rounded">K</kbd> - Калибровка</div>
            <div><kbd className="bg-gray-700 px-2 py-1 rounded">L</kbd> - Lock/Unlock ROI</div>
            <div><kbd className="bg-gray-700 px-2 py-1 rounded">Space</kbd> - Пауза</div>
          </div>
        )}
      </div>
    </div>
  )
}

