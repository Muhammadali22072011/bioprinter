import type { Line } from '../types'

/**
 * Генерирует линии сетки для калибровки
 */
export function generateGrid(
  width: number,
  height: number,
  px_per_mm: number,
  gridSpacingMm: number = 5
): Line[] {
  const grid: Line[] = []
  const spacingPx = gridSpacingMm * px_per_mm

  // Вертикальные линии
  for (let x = spacingPx; x < width; x += spacingPx) {
    grid.push({
      x1: x,
      y1: 0,
      x2: x,
      y2: height,
    })
  }

  // Горизонтальные линии
  for (let y = spacingPx; y < height; y += spacingPx) {
    grid.push({
      x1: 0,
      y1: y,
      x2: width,
      y2: y,
    })
  }

  return grid
}

/**
 * Рисует линию на canvas
 */
export function drawLine(
  ctx: CanvasRenderingContext2D,
  line: Line,
  color: string,
  lineWidth: number = 2
) {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(line.x1, line.y1)
  ctx.lineTo(line.x2, line.y2)
  ctx.stroke()
}

/**
 * Рисует текст с фоном
 */
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string = '#fff',
  bgColor: string = '#000',
  fontSize: number = 14
) {
  ctx.font = `bold ${fontSize}px sans-serif`
  const metrics = ctx.measureText(text)
  const padding = 6

  // Фон
  ctx.fillStyle = bgColor
  ctx.fillRect(
    x - padding,
    y - fontSize - padding / 2,
    metrics.width + padding * 2,
    fontSize + padding
  )

  // Текст
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

/**
 * Рисует прямоугольник с ручками
 */
export function drawRoiRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  locked: boolean = false
) {
  const color = locked ? '#ef4444' : '#10b981'
  const handleSize = 8

  // Рамка
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.setLineDash(locked ? [] : [5, 5])
  ctx.strokeRect(x, y, w, h)
  ctx.setLineDash([])

  if (!locked) {
    // Ручки по углам
    ctx.fillStyle = color
    const handles = [
      { x: x, y: y }, // nw
      { x: x + w, y: y }, // ne
      { x: x, y: y + h }, // sw
      { x: x + w, y: y + h }, // se
      { x: x + w / 2, y: y }, // n
      { x: x + w / 2, y: y + h }, // s
      { x: x, y: y + h / 2 }, // w
      { x: x + w, y: y + h / 2 }, // e
    ]

    handles.forEach(handle => {
      ctx.fillRect(
        handle.x - handleSize / 2,
        handle.y - handleSize / 2,
        handleSize,
        handleSize
      )
    })
  }
}

