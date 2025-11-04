import { useEffect, useRef } from 'react'
import Card from '../ui/Card'
import type { Measurement } from '../../lib/types'

interface HistoryChartsProps {
  history: Measurement[]
}

export default function HistoryCharts({ history }: HistoryChartsProps) {
  const hChartRef = useRef<HTMLCanvasElement>(null)
  const wChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!hChartRef.current || !wChartRef.current) return

    const drawChart = (
      canvas: HTMLCanvasElement,
      data: (number | null)[],
      color: string,
      label: string
    ) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const width = canvas.width
      const height = canvas.height
      const padding = 40

      // Очистка
      ctx.clearRect(0, 0, width, height)

      // Фон
      ctx.fillStyle = '#f9fafb'
      ctx.fillRect(0, 0, width, height)

      // Оси
      ctx.strokeStyle = '#d1d5db'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(padding, padding)
      ctx.lineTo(padding, height - padding)
      ctx.lineTo(width - padding, height - padding)
      ctx.stroke()

      if (data.length === 0) {
        ctx.fillStyle = '#6b7280'
        ctx.font = '14px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Нет данных', width / 2, height / 2)
        return
      }

      // Фильтруем null
      const validData = data.filter((v): v is number => v !== null)
      if (validData.length === 0) return

      const min = Math.min(...validData)
      const max = Math.max(...validData)
      const range = max - min || 1

      const chartWidth = width - padding * 2
      const chartHeight = height - padding * 2

      // Рисуем линию
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()

      data.forEach((value, idx) => {
        if (value === null) return

        const x = padding + (idx / Math.max(data.length - 1, 1)) * chartWidth
        const y = height - padding - ((value - min) / range) * chartHeight

        if (idx === 0 || data[idx - 1] === null) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Точки
      ctx.fillStyle = color
      data.forEach((value, idx) => {
        if (value === null) return

        const x = padding + (idx / Math.max(data.length - 1, 1)) * chartWidth
        const y = height - padding - ((value - min) / range) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Метки
      ctx.fillStyle = '#374151'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(label, padding, padding - 10)

      ctx.textAlign = 'right'
      ctx.fillText(`${max.toFixed(2)}`, padding - 5, padding + 5)
      ctx.fillText(`${min.toFixed(2)}`, padding - 5, height - padding + 5)
    }

    // Подготовка данных
    const hData = history.map(m => m.h_mm).reverse()
    const wData = history.map(m => m.w_mm).reverse()

    // Отрисовка
    drawChart(hChartRef.current, hData, '#3b82f6', 'Высота (мм)')
    drawChart(wChartRef.current, wData, '#10b981', 'Ширина (мм)')
  }, [history])

  return (
    <div className="space-y-4">
      <Card className="p-4" hover={false}>
        <canvas ref={hChartRef} width={400} height={200} className="w-full" />
      </Card>
      <Card className="p-4" hover={false}>
        <canvas ref={wChartRef} width={400} height={200} className="w-full" />
      </Card>
    </div>
  )
}

