import { useState, useCallback, useRef, useEffect } from 'react'
import type { ROI, Point } from '../lib/types'

interface UseRoiOptions {
  canvasWidth: number
  canvasHeight: number
  videoWidth: number
  videoHeight: number
}

export function useRoi(options: UseRoiOptions) {
  const { canvasWidth, canvasHeight, videoWidth, videoHeight } = options

  const [roi, setRoi] = useState<ROI>({
    x: 0.2,
    y: 0.2,
    w: 0.6,
    h: 0.6,
    locked: false,
  })

  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState<Point | null>(null)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Конвертация координат canvas -> normalized (0-1)
  const canvasToNormalized = useCallback((x: number, y: number): Point => {
    return {
      x: x / canvasWidth,
      y: y / canvasHeight,
    }
  }, [canvasWidth, canvasHeight])

  // Конвертация normalized -> canvas
  const normalizedToCanvas = useCallback((x: number, y: number): Point => {
    return {
      x: x * canvasWidth,
      y: y * canvasHeight,
    }
  }, [canvasWidth, canvasHeight])

  // Конвертация normalized -> video pixels
  const normalizedToVideo = useCallback((x: number, y: number, w: number, h: number) => {
    return {
      x: Math.floor(x * videoWidth),
      y: Math.floor(y * videoHeight),
      w: Math.floor(w * videoWidth),
      h: Math.floor(h * videoHeight),
    }
  }, [videoWidth, videoHeight])

  // Проверка попадания в ручку
  const getResizeHandle = useCallback((mouseX: number, mouseY: number): string | null => {
    const handleSize = 10
    const { x, y } = normalizedToCanvas(roi.x, roi.y)
    const { x: x2, y: y2 } = normalizedToCanvas(roi.x + roi.w, roi.y + roi.h)

    const handles = {
      'nw': { x, y },
      'ne': { x: x2, y },
      'sw': { x, y: y2 },
      'se': { x: x2, y: y2 },
      'n': { x: (x + x2) / 2, y },
      's': { x: (x + x2) / 2, y: y2 },
      'e': { x: x2, y: (y + y2) / 2 },
      'w': { x, y: (y + y2) / 2 },
    }

    for (const [name, pos] of Object.entries(handles)) {
      if (
        Math.abs(mouseX - pos.x) < handleSize &&
        Math.abs(mouseY - pos.y) < handleSize
      ) {
        return name
      }
    }

    return null
  }, [roi, normalizedToCanvas])

  // Проверка попадания в ROI
  const isInsideRoi = useCallback((mouseX: number, mouseY: number): boolean => {
    const { x, y } = normalizedToCanvas(roi.x, roi.y)
    const { x: x2, y: y2 } = normalizedToCanvas(roi.x + roi.w, roi.y + roi.h)
    return mouseX >= x && mouseX <= x2 && mouseY >= y && mouseY <= y2
  }, [roi, normalizedToCanvas])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (roi.locked) return

    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Проверяем ручки
    const handle = getResizeHandle(mouseX, mouseY)
    if (handle) {
      setIsResizing(true)
      setResizeHandle(handle)
      setDragStart({ x: mouseX, y: mouseY })
      return
    }

    // Проверяем перетаскивание
    if (isInsideRoi(mouseX, mouseY)) {
      setIsDragging(true)
      setDragStart({ x: mouseX, y: mouseY })
    }
  }, [roi.locked, getResizeHandle, isInsideRoi])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (roi.locked) return
    if (!dragStart) return

    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const deltaX = mouseX - dragStart.x
    const deltaY = mouseY - dragStart.y

    if (isDragging) {
      const norm = canvasToNormalized(deltaX, deltaY)
      setRoi(prev => ({
        ...prev,
        x: Math.max(0, Math.min(1 - prev.w, prev.x + norm.x)),
        y: Math.max(0, Math.min(1 - prev.h, prev.y + norm.y)),
      }))
      setDragStart({ x: mouseX, y: mouseY })
    } else if (isResizing && resizeHandle) {
      const norm = canvasToNormalized(deltaX, deltaY)
      
      setRoi(prev => {
        let newRoi = { ...prev }

        if (resizeHandle.includes('n')) {
          newRoi.y += norm.y
          newRoi.h -= norm.y
        }
        if (resizeHandle.includes('s')) {
          newRoi.h += norm.y
        }
        if (resizeHandle.includes('w')) {
          newRoi.x += norm.x
          newRoi.w -= norm.x
        }
        if (resizeHandle.includes('e')) {
          newRoi.w += norm.x
        }

        // Ограничения
        newRoi.x = Math.max(0, Math.min(0.9, newRoi.x))
        newRoi.y = Math.max(0, Math.min(0.9, newRoi.y))
        newRoi.w = Math.max(0.1, Math.min(1 - newRoi.x, newRoi.w))
        newRoi.h = Math.max(0.1, Math.min(1 - newRoi.y, newRoi.h))

        return newRoi
      })
      setDragStart({ x: mouseX, y: mouseY })
    }
  }, [roi.locked, dragStart, isDragging, isResizing, resizeHandle, canvasToNormalized])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
    setDragStart(null)
    setResizeHandle(null)
  }, [])

  const toggleLock = useCallback(() => {
    setRoi(prev => ({ ...prev, locked: !prev.locked }))
  }, [])

  // Курсор
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMoveForCursor = (e: MouseEvent) => {
      if (roi.locked) {
        canvas.style.cursor = 'default'
        return
      }

      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const handle = getResizeHandle(mouseX, mouseY)
      if (handle) {
        const cursors: Record<string, string> = {
          'nw': 'nw-resize',
          'ne': 'ne-resize',
          'sw': 'sw-resize',
          'se': 'se-resize',
          'n': 'n-resize',
          's': 's-resize',
          'e': 'e-resize',
          'w': 'w-resize',
        }
        canvas.style.cursor = cursors[handle] || 'default'
      } else if (isInsideRoi(mouseX, mouseY)) {
        canvas.style.cursor = 'move'
      } else {
        canvas.style.cursor = 'default'
      }
    }

    canvas.addEventListener('mousemove', handleMouseMoveForCursor)
    return () => canvas.removeEventListener('mousemove', handleMouseMoveForCursor)
  }, [roi.locked, getResizeHandle, isInsideRoi])

  return {
    roi,
    canvasRef,
    toggleLock,
    normalizedToCanvas,
    normalizedToVideo,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
    },
  }
}

