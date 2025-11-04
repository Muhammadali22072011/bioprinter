import { Camera, Play, Pause, Image, Download } from 'lucide-react'
import { useSessionStore } from '../../store/sessionStore'

interface TopBarProps {
  cameras: MediaDeviceInfo[]
  selectedCamera: string | null
  onCameraSelect: (deviceId: string) => void
  onStartStop: () => void
  onCapture: () => void
  onDownloadLog: () => void
}

export default function TopBar({
  cameras,
  selectedCamera,
  onCameraSelect,
  onStartStop,
  onCapture,
  onDownloadLog,
}: TopBarProps) {
  const { isActive, isPaused, fps } = useSessionStore()

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Левая часть: Выбор камеры */}
          <div className="flex items-center gap-3">
            <Camera className="text-blue-600" size={24} />
            <select
              value={selectedCamera || ''}
              onChange={(e) => onCameraSelect(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isActive}
            >
              <option value="">Выбрать камеру</option>
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || `Camera ${camera.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>

          {/* Центр: Кнопки управления */}
          <div className="flex items-center gap-2">
            <button
              onClick={onStartStop}
              disabled={!selectedCamera}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive
                  ? isPaused
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
              }`}
            >
              {isActive ? (
                isPaused ? (
                  <>
                    <Play size={18} />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Pause size={18} />
                    <span>Pause</span>
                  </>
                )
              ) : (
                <>
                  <Play size={18} />
                  <span>Start</span>
                </>
              )}
            </button>

            <button
              onClick={onCapture}
              disabled={!isActive}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Image size={18} />
              <span>Screenshot</span>
            </button>

            <button
              onClick={onDownloadLog}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors"
            >
              <Download size={18} />
              <span>Download Log</span>
            </button>
          </div>

          {/* Правая часть: FPS индикатор */}
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">FPS:</div>
            <div className={`text-lg font-bold ${fps > 20 ? 'text-green-600' : fps > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
              {fps.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

