import { useMemo } from 'react'
import Card from '../ui/Card'

interface CompactDataLogProps {
  logs: Array<{
    timestamp: number
    h_mm: number | null
    w_mm: number | null
    status: string
    fps: number
  }>
}

export default function CompactDataLog({ logs }: CompactDataLogProps) {
  // Показываем последние 10 записей
  const recentLogs = useMemo(() => {
    return logs.slice(-10).reverse()
  }, [logs])

  if (logs.length === 0) {
    return (
      <Card className="p-4" hover={false}>
        <div className="text-center text-gray-500 text-sm">
          <p className="font-semibold mb-1">Нет данных</p>
          <p className="text-xs">Ожидание измерений...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4" hover={false}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-gray-900">
          Последние измерения
        </h4>
        <div className="text-xs text-gray-600">
          {logs.length} записей
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {recentLogs.map((entry, idx) => {
          const time = new Date(entry.timestamp).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
          const isOk = entry.status.includes('норме') || entry.status.includes('OK')
          const isWarn = entry.status.includes('Нестабильная')

          return (
            <div
              key={idx}
              className={`p-2 rounded-lg border-l-4 ${
                isOk
                  ? 'bg-green-50 border-green-500'
                  : isWarn
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-gray-600">{time}</span>
                <span className="text-xs text-gray-500">FPS: {entry.fps}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-600">h:</span>{' '}
                  <span className="font-bold text-blue-600">
                    {entry.h_mm?.toFixed(2) ?? '—'}
                  </span>{' '}
                  <span className="text-gray-500">мм</span>
                </div>
                <div>
                  <span className="text-gray-600">w:</span>{' '}
                  <span className="font-bold text-green-600">
                    {entry.w_mm?.toFixed(2) ?? '—'}
                  </span>{' '}
                  <span className="text-gray-500">мм</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

