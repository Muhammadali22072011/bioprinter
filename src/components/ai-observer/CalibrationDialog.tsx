import { X } from 'lucide-react'
import { useState } from 'react'
import { useSettingsStore } from '../../store/settingsStore'
import type { Point } from '../../lib/types'

interface CalibrationDialogProps {
  isOpen: boolean
  onClose: () => void
  points: Point[]
  onReset: () => void
}

export default function CalibrationDialog({
  isOpen,
  onClose,
  points,
  onReset,
}: CalibrationDialogProps) {
  const [knownDistance, setKnownDistance] = useState(10)
  const settings = useSettingsStore()

  if (!isOpen) return null

  const handleCalculate = () => {
    if (points.length !== 2) {
      alert('Нужно выбрать ровно 2 точки')
      return
    }

    const dx = points[1].x - points[0].x
    const dy = points[1].y - points[0].y
    const distancePx = Math.sqrt(dx * dx + dy * dy)

    const px_per_mm = distancePx / knownDistance

    settings.updateSettings({ px_per_mm })
    onReset()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Калибровка</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Кликните на две точки с известным расстоянием между ними.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-semibold text-blue-900 mb-2">
              Выбрано точек: {points.length} / 2
            </div>
            {points.map((point, idx) => (
              <div key={idx} className="text-sm text-blue-700">
                Точка {idx + 1}: ({point.x.toFixed(0)}, {point.y.toFixed(0)})
              </div>
            ))}
          </div>

          {points.length === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Известное расстояние (мм)
                </label>
                <input
                  type="number"
                  value={knownDistance}
                  onChange={(e) => setKnownDistance(parseFloat(e.target.value))}
                  step="0.5"
                  min="0.1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Вычислить
              </button>
            </>
          )}

          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              Сбросить
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

