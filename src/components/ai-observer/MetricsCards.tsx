import Card from '../ui/Card'
import type { Measurement, Statistics } from '../../lib/types'
import { useSettingsStore } from '../../store/settingsStore'

interface MetricsCardsProps {
  measurement: Measurement | null
  statistics: Statistics
}

export default function MetricsCards({ measurement, statistics }: MetricsCardsProps) {
  const { px_per_mm } = useSettingsStore()

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Текущая высота */}
      <Card className="p-4" hover={false}>
        <div className="text-sm text-gray-600 mb-1">Высота слоя</div>
        <div className="text-2xl font-bold text-blue-600">
          {measurement?.h_mm !== null && measurement?.h_mm !== undefined
            ? `${measurement.h_mm.toFixed(2)} мм`
            : '—'}
        </div>
      </Card>

      {/* Текущая ширина */}
      <Card className="p-4" hover={false}>
        <div className="text-sm text-gray-600 mb-1">Ширина дорожки</div>
        <div className="text-2xl font-bold text-green-600">
          {measurement?.w_mm !== null && measurement?.w_mm !== undefined
            ? `${measurement.w_mm.toFixed(2)} мм`
            : '—'}
        </div>
      </Card>

      {/* Средняя высота */}
      <Card className="p-4" hover={false}>
        <div className="text-sm text-gray-600 mb-1">Средняя высота</div>
        <div className="text-xl font-semibold text-gray-800">
          {statistics.h_avg !== null ? `${statistics.h_avg.toFixed(2)} мм` : '—'}
        </div>
      </Card>

      {/* Средняя ширина */}
      <Card className="p-4" hover={false}>
        <div className="text-sm text-gray-600 mb-1">Средняя ширина</div>
        <div className="text-xl font-semibold text-gray-800">
          {statistics.w_avg !== null ? `${statistics.w_avg.toFixed(2)} мм` : '—'}
        </div>
      </Card>

      {/* Вариация ширины */}
      <Card className="p-4" hover={false}>
        <div className="text-sm text-gray-600 mb-1">σ(w)</div>
        <div className="text-xl font-semibold text-orange-600">
          {statistics.w_sigma !== null ? `${statistics.w_sigma.toFixed(3)} мм` : '—'}
        </div>
      </Card>

      {/* Калибровка */}
      <Card className="p-4" hover={false}>
        <div className="text-sm text-gray-600 mb-1">Калибровка</div>
        <div className="text-xl font-semibold text-purple-600">
          {px_per_mm.toFixed(1)} px/мм
        </div>
      </Card>
    </div>
  )
}

