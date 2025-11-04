import type { BaseLine } from '../types'

/**
 * Находит верхнюю кромку печатаемого слоя
 */
export function findTopEdge(
  edges: any,
  baseLine: BaseLine,
  width: number,
  _height: number
): number | null {
  if (!edges || !baseLine) return null

  try {
    const baseY = Math.floor((baseLine.y1 + baseLine.y2) / 2)
    
    // Центральный коридор (30% ширины в центре)
    const startX = Math.floor(width * 0.35)
    const endX = Math.floor(width * 0.65)
    
    // Ищем первый белый пиксель выше базовой линии
    const data = edges.data

    for (let y = baseY - 1; y > 10; y--) {
      let whiteCount = 0
      
      for (let x = startX; x < endX; x++) {
        const idx = y * width + x
        if (data[idx] > 128) {
          whiteCount++
        }
      }
      
      // Если нашли достаточно белых пикселей (край)
      if (whiteCount > (endX - startX) * 0.2) {
        return y
      }
    }

    return null
  } catch (err) {
    console.error('Top edge detection error:', err)
    return null
  }
}

/**
 * Измеряет ширину дорожки на заданной высоте
 */
export function measureWidth(
  edges: any,
  probeY: number,
  width: number
): { leftX: number; rightX: number } | null {
  if (!edges || probeY < 0 || probeY >= edges.rows) return null

  try {
    const data = edges.data
    const centerX = Math.floor(width / 2)

    // Ищем левый край от центра
    let leftX = centerX
    for (let x = centerX; x > 10; x--) {
      const idx = probeY * width + x
      if (data[idx] > 128) {
        leftX = x
        break
      }
    }

    // Ищем правый край от центра
    let rightX = centerX
    for (let x = centerX; x < width - 10; x++) {
      const idx = probeY * width + x
      if (data[idx] > 128) {
        rightX = x
        break
      }
    }

    if (rightX - leftX < 5) {
      return null // Слишком узкая или не найдена
    }

    return { leftX, rightX }
  } catch (err) {
    console.error('Width measurement error:', err)
    return null
  }
}

/**
 * Fallback: измерение через ImageData
 */
export function findTopEdgeFallback(
  imageData: ImageData,
  baseLine: BaseLine,
  width: number
): number | null {
  const baseY = Math.floor((baseLine.y1 + baseLine.y2) / 2)
  const data = imageData.data
  
  const startX = Math.floor(width * 0.35)
  const endX = Math.floor(width * 0.65)

  for (let y = baseY - 1; y > 10; y--) {
    let whiteCount = 0
    
    for (let x = startX; x < endX; x++) {
      const idx = (y * width + x) * 4
      if (data[idx] > 128) {
        whiteCount++
      }
    }
    
    if (whiteCount > (endX - startX) * 0.2) {
      return y
    }
  }

  return null
}

export function measureWidthFallback(
  imageData: ImageData,
  probeY: number,
  width: number
): { leftX: number; rightX: number } | null {
  const data = imageData.data
  const centerX = Math.floor(width / 2)

  let leftX = centerX
  for (let x = centerX; x > 10; x--) {
    const idx = (probeY * width + x) * 4
    if (data[idx] > 128) {
      leftX = x
      break
    }
  }

  let rightX = centerX
  for (let x = centerX; x < width - 10; x++) {
    const idx = (probeY * width + x) * 4
    if (data[idx] > 128) {
      rightX = x
      break
    }
  }

  if (rightX - leftX < 5) {
    return null
  }

  return { leftX, rightX }
}

