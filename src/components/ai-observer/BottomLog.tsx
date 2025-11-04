import { useSessionStore } from '../../store/sessionStore'
import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'

export default function BottomLog() {
  const { logs } = useSessionStore()

  const icons = {
    info: Info,
    success: CheckCircle,
    warn: AlertTriangle,
    error: AlertCircle,
  }

  const colors = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warn: 'text-yellow-600',
    error: 'text-red-600',
  }

  if (logs.length === 0) return null

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="text-sm font-semibold text-gray-700 mb-2">Логи:</div>
        <div className="space-y-1">
          {logs.map((log, idx) => {
            const Icon = icons[log.type]
            const color = colors[log.type]
            const time = new Date(log.timestamp).toLocaleTimeString('ru-RU')

            return (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <Icon size={16} className={`flex-shrink-0 mt-0.5 ${color}`} />
                <span className="text-gray-500">{time}</span>
                <span className="text-gray-800">{log.message}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

