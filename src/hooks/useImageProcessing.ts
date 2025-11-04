import { useCallback } from 'react'
import { useOpenCV } from './useOpenCV'
import { useSettingsStore } from '../store/settingsStore'
import { processEdges, processEdgesFallback } from '../lib/processing/edges'
import { detectBaseLine, detectBaseLineFallback } from '../lib/processing/baseline'
import { findTopEdge, measureWidth, findTopEdgeFallback, measureWidthFallback } from '../lib/processing/measure'
import { generateGrid } from '../lib/processing/overlays'
import type { ProcessingResult, ROI } from '../lib/types'

export function useImageProcessing() {
  const { cv, isLoaded } = useOpenCV()
  const settings = useSettingsStore()

  const processFrame = useCallback(
    (
      video: HTMLVideoElement,
      roi: ROI,
      canvas?: HTMLCanvasElement
    ): ProcessingResult | null => {
      if (!video || video.readyState < 2) return null

      const startTime = performance.now()

      try {
        // Получаем размеры видео
        const videoWidth = video.videoWidth
        const videoHeight = video.videoHeight

        if (!videoWidth || !videoHeight) return null

        // ROI в пикселях видео
        const roiX = Math.floor(roi.x * videoWidth)
        const roiY = Math.floor(roi.y * videoHeight)
        const roiW = Math.floor(roi.w * videoWidth)
        const roiH = Math.floor(roi.h * videoHeight)

        // Создаем временный canvas для ROI
        const tempCanvas = canvas || document.createElement('canvas')
        tempCanvas.width = roiW
        tempCanvas.height = roiH
        const ctx = tempCanvas.getContext('2d')
        if (!ctx) return null

        // Рисуем ROI
        ctx.drawImage(
          video,
          roiX,
          roiY,
          roiW,
          roiH,
          0,
          0,
          roiW,
          roiH
        )

        let baseLine = null
        let topEdgeY = null
        let h_mm = null
        let w_mm = null
        let probe = null
        const grid = settings.gridEnabled ? generateGrid(roiW, roiH, settings.px_per_mm) : []

        // OpenCV путь
        if (isLoaded && cv) {
          const src = cv.matFromImageData(ctx.getImageData(0, 0, roiW, roiH))
          const result = processEdges(cv, src, settings.cannyMin, settings.cannyMax)

          if (result) {
            const { edges, gray } = result

            // Базовая линия
            baseLine = detectBaseLine(cv, edges, roiW, roiH)

            if (baseLine) {
              // Верхняя кромка
              topEdgeY = findTopEdge(edges, baseLine, roiW, roiH)

              if (topEdgeY !== null) {
                const baseY = Math.floor((baseLine.y1 + baseLine.y2) / 2)
                const h_px = baseY - topEdgeY
                h_mm = h_px / settings.px_per_mm

                // Линия для измерения ширины
                const probeY = Math.floor(topEdgeY + h_px * 0.4)
                const widthResult = measureWidth(edges, probeY, roiW)

                if (widthResult) {
                  const w_px = widthResult.rightX - widthResult.leftX
                  w_mm = w_px / settings.px_per_mm
                  probe = {
                    x1: widthResult.leftX,
                    y: probeY,
                    x2: widthResult.rightX,
                  }
                }
              }
            }

            edges.delete()
            gray.delete()
          }

          src.delete()
        } else {
          // Fallback путь
          const imageData = processEdgesFallback(ctx, roiW, roiH, settings.cannyMin)
          
          baseLine = detectBaseLineFallback(imageData, roiW, roiH)

          if (baseLine) {
            topEdgeY = findTopEdgeFallback(imageData, baseLine, roiW)

            if (topEdgeY !== null) {
              const baseY = Math.floor((baseLine.y1 + baseLine.y2) / 2)
              const h_px = baseY - topEdgeY
              h_mm = h_px / settings.px_per_mm

              const probeY = Math.floor(topEdgeY + h_px * 0.4)
              const widthResult = measureWidthFallback(imageData, probeY, roiW)

              if (widthResult) {
                const w_px = widthResult.rightX - widthResult.leftX
                w_mm = w_px / settings.px_per_mm
                probe = {
                  x1: widthResult.leftX,
                  y: probeY,
                  x2: widthResult.rightX,
                }
              }
            }
          }
        }

        const frameTime = performance.now() - startTime

        return {
          baseLine,
          topEdgeY,
          h_mm,
          w_mm,
          probe,
          grid,
          debug: {
            frameTime,
            edgesFound: baseLine ? 1 : 0,
            cannyMin: settings.cannyMin,
            cannyMax: settings.cannyMax,
          },
        }
      } catch (err) {
        console.error('Processing error:', err)
        return null
      }
    },
    [cv, isLoaded, settings]
  )

  return { processFrame }
}

