import { useEffect } from 'react'
import type { ProcessingResult, ROI, FlowPoint } from '../../lib/types'
import { drawLine, drawText, drawRoiRect } from '../../lib/processing/overlays'

interface RoiOverlayProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  videoRef: React.RefObject<HTMLVideoElement>
  roi: ROI
  result: ProcessingResult | null
  trail: FlowPoint[]
  normalizedToCanvas: (x: number, y: number) => { x: number; y: number }
}

export default function RoiOverlay({
  canvasRef,
  videoRef,
  roi,
  result,
  trail,
  normalizedToCanvas,
}: RoiOverlayProps) {
  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    
    if (!canvas || !video) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      // Очистка
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Рисуем видео
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      }

      // ROI координаты на канвасе
      const roiCanvas = normalizedToCanvas(roi.x, roi.y)
      const roiCanvas2 = normalizedToCanvas(roi.x + roi.w, roi.y + roi.h)
      const roiWidth = roiCanvas2.x - roiCanvas.x
      const roiHeight = roiCanvas2.y - roiCanvas.y

      // Оверлеи внутри ROI
      if (result && roiWidth > 0 && roiHeight > 0) {
        ctx.save()
        ctx.translate(roiCanvas.x, roiCanvas.y)

        // Сетка
        if (result.grid && result.grid.length > 0) {
          result.grid.forEach(line => {
            drawLine(ctx, line, '#ffffff', 0.5)
          })
        }

        // Базовая линия (зелёная)
        if (result.baseLine) {
          drawLine(ctx, result.baseLine, '#10b981', 3)
          const baseY = (result.baseLine.y1 + result.baseLine.y2) / 2
          drawText(ctx, 'Базовая линия', 10, baseY - 5, '#10b981', 'rgba(0,0,0,0.7)', 12)
        }

        // Верхняя кромка (синяя)
        if (result.topEdgeY !== null && result.baseLine) {
          const line = { x1: 0, y1: result.topEdgeY, x2: roiWidth, y2: result.topEdgeY }
          drawLine(ctx, line, '#3b82f6', 2)
        }

        // Линия ширины (красная)
        if (result.probe) {
          const line = {
            x1: result.probe.x1,
            y1: result.probe.y,
            x2: result.probe.x2,
            y2: result.probe.y,
          }
          drawLine(ctx, line, '#ef4444', 2)
        }

        // Значения
        if (result.h_mm !== null) {
          drawText(
            ctx,
            `h = ${result.h_mm.toFixed(2)} мм`,
            roiWidth - 140,
            30,
            '#fff',
            'rgba(0,0,0,0.8)',
            16
          )
        }

        if (result.w_mm !== null) {
          drawText(
            ctx,
            `w = ${result.w_mm.toFixed(2)} мм`,
            roiWidth - 140,
            55,
            '#fff',
            'rgba(0,0,0,0.8)',
            16
          )
        }

        ctx.restore()
      }

      // Trail оптического потока
      if (trail.length > 0) {
        ctx.save()
        ctx.translate(roiCanvas.x, roiCanvas.y)

        trail.forEach((point, idx) => {
          const alpha = 1 - idx / trail.length
          const size = 8 - (idx / trail.length) * 4
          
          ctx.fillStyle = `rgba(255, 100, 100, ${alpha})`
          ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size)
        })

        ctx.restore()
      }

      // ROI рамка
      drawRoiRect(ctx, roiCanvas.x, roiCanvas.y, roiWidth, roiHeight, roi.locked)

      requestAnimationFrame(draw)
    }

    const animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [canvasRef, videoRef, roi, result, trail, normalizedToCanvas])

  return null // Компонент только для эффекта
}

