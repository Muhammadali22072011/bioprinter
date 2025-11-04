import { useState } from 'react'
import Card from '../ui/Card'
import { useSettingsStore } from '../../store/settingsStore'

interface SettingsPanelProps {
  onCalibrate: () => void
}

export default function SettingsPanel({ onCalibrate }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<'params' | 'charts'>('params')
  const settings = useSettingsStore()

  return (
    <Card className="p-4" hover={false}>
      {/* Табы */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('params')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'params'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Параметры
        </button>
        <button
          onClick={() => setActiveTab('charts')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'charts'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Графики
        </button>
      </div>

      {/* Содержимое */}
      {activeTab === 'params' && (
        <div className="space-y-4">
          {/* Целевые значения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Целевая высота слоя (мм)
            </label>
            <input
              type="number"
              value={settings.H_target}
              onChange={(e) => settings.updateSettings({ H_target: parseFloat(e.target.value) })}
              step="0.1"
              min="0.1"
              max="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Целевая ширина дорожки (мм)
            </label>
            <input
              type="number"
              value={settings.W_target}
              onChange={(e) => settings.updateSettings({ W_target: parseFloat(e.target.value) })}
              step="0.1"
              min="0.1"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Калибровка */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Калибровка (px/мм)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={settings.px_per_mm}
                onChange={(e) => settings.updateSettings({ px_per_mm: parseFloat(e.target.value) })}
                step="0.5"
                min="1"
                max="100"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={onCalibrate}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
              >
                Калибровать
              </button>
            </div>
          </div>

          {/* Пороги Canny */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Canny Min: {settings.cannyMin}
            </label>
            <input
              type="range"
              value={settings.cannyMin}
              onChange={(e) => settings.updateSettings({ cannyMin: parseInt(e.target.value) })}
              min="10"
              max="150"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Canny Max: {settings.cannyMax}
            </label>
            <input
              type="range"
              value={settings.cannyMax}
              onChange={(e) => settings.updateSettings({ cannyMax: parseInt(e.target.value) })}
              min="50"
              max="250"
              className="w-full"
            />
          </div>

          {/* Флаги */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.opticalFlowEnabled}
                onChange={(e) => settings.updateSettings({ opticalFlowEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Оптический поток</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.speechEnabled}
                onChange={(e) => settings.updateSettings({ speechEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Озвучка советов</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.gridEnabled}
                onChange={(e) => settings.updateSettings({ gridEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Сетка масштаба</span>
            </label>
          </div>

          {/* Сброс */}
          <button
            onClick={() => settings.resetSettings()}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
          >
            Сбросить настройки
          </button>
        </div>
      )}

      {activeTab === 'charts' && (
        <div className="text-center text-gray-600 py-8">
          Графики отображаются в отдельной секции
        </div>
      )}
    </Card>
  )
}

