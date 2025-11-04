/**
 * Обработка изображения: grayscale, blur, Canny
 */

export function processEdges(
  cv: any,
  src: any,
  cannyMin: number,
  cannyMax: number
): { edges: any; gray: any } | null {
  if (!cv || !src) return null

  try {
    const gray = new cv.Mat()
    const blurred = new cv.Mat()
    const edges = new cv.Mat()

    // Grayscale
    if (src.channels() === 4) {
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY)
    } else if (src.channels() === 3) {
      cv.cvtColor(src, gray, cv.COLOR_RGB2GRAY)
    } else {
      src.copyTo(gray)
    }

    // Gaussian Blur
    const ksize = new cv.Size(3, 3)
    cv.GaussianBlur(gray, blurred, ksize, 0)

    // Canny Edge Detection
    cv.Canny(blurred, edges, cannyMin, cannyMax)

    blurred.delete()

    return { edges, gray }
  } catch (err) {
    console.error('Edge detection error:', err)
    return null
  }
}

/**
 * Fallback: простая детекция краев через Canvas2D
 */
export function processEdgesFallback(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  threshold: number = 40
): ImageData {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  
  // Grayscale
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    data[i] = data[i + 1] = data[i + 2] = gray
  }

  // Простой Sobel operator для детекции краев
  const output = ctx.createImageData(width, height)
  const outData = output.data

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4

      // Sobel kernels
      const gx =
        -data[((y - 1) * width + (x - 1)) * 4] +
        data[((y - 1) * width + (x + 1)) * 4] +
        -2 * data[(y * width + (x - 1)) * 4] +
        2 * data[(y * width + (x + 1)) * 4] +
        -data[((y + 1) * width + (x - 1)) * 4] +
        data[((y + 1) * width + (x + 1)) * 4]

      const gy =
        -data[((y - 1) * width + (x - 1)) * 4] +
        -2 * data[((y - 1) * width + x) * 4] +
        -data[((y - 1) * width + (x + 1)) * 4] +
        data[((y + 1) * width + (x - 1)) * 4] +
        2 * data[((y + 1) * width + x) * 4] +
        data[((y + 1) * width + (x + 1)) * 4]

      const magnitude = Math.sqrt(gx * gx + gy * gy)
      const value = magnitude > threshold ? 255 : 0

      outData[idx] = outData[idx + 1] = outData[idx + 2] = value
      outData[idx + 3] = 255
    }
  }

  return output
}

