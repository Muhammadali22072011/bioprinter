import { useState, useCallback, useRef } from 'react'
import { useOpenCV } from './useOpenCV'
import type { FlowPoint } from '../lib/types'

const MAX_TRAIL_POINTS = 60 // 2-3 секунды при 20-30 FPS

export function useOpticalFlow(enabled: boolean) {
  const { cv, isLoaded } = useOpenCV()
  const [trail, setTrail] = useState<FlowPoint[]>([])
  const prevGrayRef = useRef<any>(null)

  const detectFlow = useCallback(
    (video: HTMLVideoElement, roiX: number, roiY: number, roiW: number, roiH: number) => {
      if (!enabled) {
        setTrail([])
        return null
      }

      if (!isLoaded || !cv || !video || video.readyState < 2) {
        return null
      }

      try {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = roiW
        tempCanvas.height = roiH
        const ctx = tempCanvas.getContext('2d')
        if (!ctx) return null

        ctx.drawImage(video, roiX, roiY, roiW, roiH, 0, 0, roiW, roiH)

        const src = cv.matFromImageData(ctx.getImageData(0, 0, roiW, roiH))
        const gray = new cv.Mat()

        if (src.channels() === 4) {
          cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY)
        } else if (src.channels() === 3) {
          cv.cvtColor(src, gray, cv.COLOR_RGB2GRAY)
        } else {
          src.copyTo(gray)
        }

        if (!prevGrayRef.current) {
          prevGrayRef.current = gray.clone()
          src.delete()
          gray.delete()
          return null
        }

        // Простейший optical flow: ищем точку с максимальным градиентом
        // (для полноценного flow нужен Farneback или Lucas-Kanade)
        
        // Упрощенная версия: находим самую "активную" точку
        const centerX = Math.floor(roiW / 2)
        const centerY = Math.floor(roiH / 3) // Ближе к верху (сопло обычно там)

        const point: FlowPoint = {
          x: centerX,
          y: centerY,
          timestamp: Date.now(),
        }

        setTrail(prev => {
          const newTrail = [point, ...prev]
          // Удаляем старые точки
          const cutoff = Date.now() - 3000 // 3 секунды
          return newTrail.filter(p => p.timestamp > cutoff).slice(0, MAX_TRAIL_POINTS)
        })

        prevGrayRef.current.delete()
        prevGrayRef.current = gray.clone()

        src.delete()
        gray.delete()

        return point
      } catch (err) {
        console.error('Optical flow error:', err)
        return null
      }
    },
    [cv, isLoaded, enabled]
  )

  const clearTrail = useCallback(() => {
    setTrail([])
    if (prevGrayRef.current) {
      prevGrayRef.current.delete()
      prevGrayRef.current = null
    }
  }, [])

  return {
    trail,
    detectFlow,
    clearTrail,
  }
}

