import type { BaseLine } from '../types'

/**
 * Находит базовую линию стола методом Хафа (или эвристикой)
 */
export function detectBaseLine(
  cv: any,
  edges: any,
  _width: number,
  height: number
): BaseLine | null {
  if (!cv || !edges) return null

  try {
    const lines = new cv.MatVector()
    
    // HoughLinesP для поиска линий
    cv.HoughLinesP(
      edges,
      lines,
      1, // rho
      Math.PI / 180, // theta
      50, // threshold
      100, // minLineLength
      20 // maxLineGap
    )

    if (lines.size() === 0) {
      lines.delete()
      return null
    }

    // Ищем самую длинную горизонтальную линию в нижней части
    let bestLine: BaseLine | null = null
    let bestScore = 0

    for (let i = 0; i < lines.size(); i++) {
      const line = lines.get(i)
      const x1 = line.data32S[0]
      const y1 = line.data32S[1]
      const x2 = line.data32S[2]
      const y2 = line.data32S[3]

      // Угол линии
      const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
      
      // Горизонтальная линия (угол близок к 0 или 180)
      const isHorizontal = Math.abs(angle) < 15 || Math.abs(angle - 180) < 15 || Math.abs(angle + 180) < 15
      
      if (!isHorizontal) continue

      // Длина линии
      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
      
      // Позиция в нижней части (чем ближе к низу, тем лучше)
      const avgY = (y1 + y2) / 2
      const bottomness = avgY / height
      
      // Оценка: длина * bottomness
      const score = length * (bottomness > 0.5 ? bottomness : 0)

      if (score > bestScore) {
        bestScore = score
        bestLine = {
          x1,
          y1,
          x2,
          y2,
          angle,
          confidence: Math.min(score / 500, 1),
        }
      }
    }

    lines.delete()
    return bestLine
  } catch (err) {
    console.error('Baseline detection error:', err)
    return null
  }
}

/**
 * Fallback: эвристическое определение базовой линии
 * Ищет горизонтальную линию в нижней трети изображения
 */
export function detectBaseLineFallback(
  imageData: ImageData,
  width: number,
  height: number
): BaseLine | null {
  // Простая эвристика: ищем ряд с максимальным количеством белых пикселей
  // в нижней трети изображения
  
  const data = imageData.data
  const startY = Math.floor(height * 0.6)
  const endY = height - 10
  
  let maxWhiteCount = 0
  let bestY = startY

  for (let y = startY; y < endY; y++) {
    let whiteCount = 0
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const brightness = data[idx] // уже grayscale
      if (brightness > 128) {
        whiteCount++
      }
    }
    
    if (whiteCount > maxWhiteCount) {
      maxWhiteCount = whiteCount
      bestY = y
    }
  }

  if (maxWhiteCount < width * 0.3) {
    return null // Недостаточно уверенности
  }

  return {
    x1: 0,
    y1: bestY,
    x2: width,
    y2: bestY,
    angle: 0,
    confidence: Math.min(maxWhiteCount / width, 1),
  }
}

