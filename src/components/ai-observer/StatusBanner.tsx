import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import type { Advice } from '../../lib/types'
import { ADVICE_COLORS } from '../../lib/processing/advice'

interface StatusBannerProps {
  advice: Advice
}

export default function StatusBanner({ advice }: StatusBannerProps) {
  const icons = {
    ok: CheckCircle,
    warn: AlertTriangle,
    bad: AlertCircle,
  }

  const Icon = icons[advice.level]
  const color = ADVICE_COLORS[advice.level]

  return (
    <div
      className="rounded-lg p-4 mb-4 flex items-start gap-3"
      style={{ backgroundColor: `${color}20`, borderLeft: `4px solid ${color}` }}
    >
      <Icon size={24} style={{ color }} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-bold text-lg mb-1" style={{ color }}>
          {advice.message}
        </div>
        {advice.details && (
          <div className="text-sm text-gray-700">
            {advice.details}
          </div>
        )}
      </div>
    </div>
  )
}

