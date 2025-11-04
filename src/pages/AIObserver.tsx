import { useEffect, useCallback, useRef, useState } from 'react'
import { useVideoStream } from '../hooks/useVideoStream'
import { useRoi } from '../hooks/useRoi'
import { useImageProcessing } from '../hooks/useImageProcessing'
import { useOpticalFlow } from '../hooks/useOpticalFlow'
import { useHistoryStats } from '../hooks/useHistoryStats'
import { useSpeech } from '../hooks/useSpeech'
import { useCsvLog } from '../hooks/useCsvLog'
import { useSettingsStore } from '../store/settingsStore'
import { useSessionStore } from '../store/sessionStore'
import { generateAdvice } from '../lib/processing/advice'
import type { ProcessingResult, Point } from '../lib/types'

// Компоненты
import TopBar from '../components/ai-observer/TopBar'
import CameraPanel from '../components/ai-observer/CameraPanel'
import RoiOverlay from '../components/ai-observer/RoiOverlay'
import MetricsCards from '../components/ai-observer/MetricsCards'
import StatusBanner from '../components/ai-observer/StatusBanner'
import HistoryCharts from '../components/ai-observer/HistoryCharts'
import SettingsPanel from '../components/ai-observer/SettingsPanel'
import CalibrationDialog from '../components/ai-observer/CalibrationDialog'
import CompactDataLog from '../components/ai-observer/CompactDataLog'

export default function AIObserver() {
  const settings = useSettingsStore()
  
  // Деструктуризация для стабильных зависимостей
  const {
    isPaused,
    selectedCamera,
    advice,
    currentMeasurement,
    fps,
    setStatistics,
    setAdvice,
    setCurrentMeasurement,
    setFps,
    setPaused,
    setSelectedCamera,
  } = useSessionStore()

  // Видео стрим
  const { videoRef, isActive, error, cameras, startCamera, stopCamera: _stopCamera, switchCamera } = useVideoStream()

  // ROI
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 })

  const {
    roi,
    canvasRef: _canvasRef,
    toggleLock,
    normalizedToCanvas,
    normalizedToVideo,
    handlers: roiHandlers,
  } = useRoi({
    canvasWidth: canvasSize.width,
    canvasHeight: canvasSize.height,
    videoWidth: videoRef.current?.videoWidth || 1280,
    videoHeight: videoRef.current?.videoHeight || 720,
  })

  // Обработка изображений
  const { processFrame } = useImageProcessing()

  // Оптический поток
  const { trail, detectFlow, clearTrail: _clearTrail } = useOpticalFlow(settings.opticalFlowEnabled)

  // История и статистика
  const { history, statistics, addMeasurement, clearHistory: _clearHistory } = useHistoryStats(settings.historySize)

  // Озвучка
  const { speak } = useSpeech(settings.speechEnabled)

  // Логирование
  const { addEntry, downloadCsv, clearLog: _clearLog, logs: csvLogs } = useCsvLog()

  // Состояние обработки
  const [currentResult, setCurrentResult] = useState<ProcessingResult | null>(null)
  const frameCountRef = useRef(0)
  const lastFrameTimeRef = useRef(Date.now())
  const animationFrameRef = useRef<number | null>(null)

  // Калибровка
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [calibrationPoints, setCalibrationPoints] = useState<Point[]>([])

  // Обновление размеров canvas
  useEffect(() => {
    if (!overlayCanvasRef.current) return

    const updateSize = () => {
      if (overlayCanvasRef.current) {
        setCanvasSize({
          width: overlayCanvasRef.current.width,
          height: overlayCanvasRef.current.height,
        })
      }
    }

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(overlayCanvasRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  // Главный цикл обработки
  const processLoop = useCallback(() => {
    if (!isActive || isPaused || !videoRef.current) {
      animationFrameRef.current = requestAnimationFrame(processLoop)
      return
    }

    const video = videoRef.current
    if (video.readyState < 2) {
      animationFrameRef.current = requestAnimationFrame(processLoop)
      return
    }

    // FPS
    frameCountRef.current++
    const now = Date.now()
    if (now - lastFrameTimeRef.current >= 1000) {
      const currentFps = (frameCountRef.current * 1000) / (now - lastFrameTimeRef.current)
      setFps(currentFps)
      frameCountRef.current = 0
      lastFrameTimeRef.current = now
    }

    // Обработка кадра
    const result = processFrame(video, roi)
    setCurrentResult(result)

    if (result && (result.h_mm !== null || result.w_mm !== null)) {
      // Измерение (используем fps из ref для избежания зависимости)
      const currentFps = frameCountRef.current > 0 
        ? (frameCountRef.current * 1000) / (Date.now() - lastFrameTimeRef.current)
        : 0
      
      const measurement = {
        timestamp: Date.now(),
        h_mm: result.h_mm,
        w_mm: result.w_mm,
        fps: currentFps,
      }

      addMeasurement(measurement)
      setCurrentMeasurement(measurement)
    }

    // Оптический поток
    if (settings.opticalFlowEnabled && !roi.locked) {
      const roiVideo = normalizedToVideo(roi.x, roi.y, roi.w, roi.h)
      detectFlow(video, roiVideo.x, roiVideo.y, roiVideo.w, roiVideo.h)
    }

    animationFrameRef.current = requestAnimationFrame(processLoop)
  }, [isActive, isPaused, videoRef, roi, processFrame, addMeasurement, setFps, setCurrentMeasurement, settings.opticalFlowEnabled, normalizedToVideo, detectFlow])

  // Запуск цикла
  useEffect(() => {
    if (isActive) {
      animationFrameRef.current = requestAnimationFrame(processLoop)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive, processLoop])

  // Обновление статистики и советов
  useEffect(() => {
    setStatistics(statistics)

    const advice = generateAdvice(
      currentMeasurement?.h_mm ?? null,
      currentMeasurement?.w_mm ?? null,
      statistics,
      settings
    )

    setAdvice(advice)
    speak(advice)

    // Логирование
    if (currentMeasurement) {
      addEntry(currentMeasurement, statistics, advice, fps)
    }
  }, [statistics, currentMeasurement, settings, speak, addEntry, setStatistics, setAdvice, fps])

  // Горячие клавиши
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyC') {
        setIsCalibrating(prev => !prev)
        setCalibrationPoints([])
      } else if (e.code === 'KeyK') {
        setIsCalibrating(true)
        setCalibrationPoints([])
      } else if (e.code === 'KeyL') {
        toggleLock()
      } else if (e.code === 'Space') {
        e.preventDefault()
        setPaused(!isPaused)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setPaused, isPaused, toggleLock])

  // Обработчики
  const handleStartStop = useCallback(() => {
    if (isActive) {
      if (isPaused) {
        setPaused(false)
      } else {
        setPaused(true)
      }
    } else {
      if (selectedCamera) {
        startCamera(selectedCamera)
      }
    }
  }, [isActive, isPaused, setPaused, selectedCamera, startCamera])

  const handleCameraSelect = useCallback(
    (deviceId: string) => {
      setSelectedCamera(deviceId)
      switchCamera(deviceId)
    },
    [setSelectedCamera, switchCamera]
  )

  const handleCapture = useCallback(() => {
    if (!overlayCanvasRef.current) return

    const canvas = overlayCanvasRef.current
    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `screenshot-${Date.now()}.png`
    link.click()
  }, [])

  const handleCalibrationClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isCalibrating) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setCalibrationPoints(prev => {
        if (prev.length >= 2) return [{ x, y }]
        return [...prev, { x, y }]
      })
    },
    [isCalibrating]
  )

  // Объединенные обработчики ROI
  const combinedHandlers = {
    onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => {
      handleCalibrationClick(e)
      if (!isCalibrating) roiHandlers.onMouseDown(e)
    },
    onMouseMove: roiHandlers.onMouseMove,
    onMouseUp: roiHandlers.onMouseUp,
    onMouseLeave: roiHandlers.onMouseLeave,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* TopBar */}
      <TopBar
        cameras={cameras}
        selectedCamera={selectedCamera}
        onCameraSelect={handleCameraSelect}
        onStartStop={handleStartStop}
        onCapture={handleCapture}
        onDownloadLog={downloadCsv}
      />

      {/* Главная область */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка: Видео */}
          <div className="lg:col-span-2 space-y-4">
            <CameraPanel
              videoRef={videoRef}
              overlayCanvasRef={overlayCanvasRef}
              isActive={isActive}
              error={error}
              roiHandlers={combinedHandlers}
            />

            <RoiOverlay
              canvasRef={overlayCanvasRef}
              videoRef={videoRef}
              roi={roi}
              result={currentResult}
              trail={trail}
              normalizedToCanvas={normalizedToCanvas}
            />

            {/* Компактный лог данных под камерой */}
            <CompactDataLog logs={csvLogs} />
          </div>

          {/* Правая колонка: Метрики и настройки */}
          <div className="space-y-4">
            <StatusBanner advice={advice} />
            
            <MetricsCards measurement={currentMeasurement} statistics={statistics} />

            <SettingsPanel onCalibrate={() => setIsCalibrating(true)} />

            <HistoryCharts history={history} />
          </div>
        </div>
      </div>

      {/* CalibrationDialog */}
      <CalibrationDialog
        isOpen={isCalibrating}
        onClose={() => {
          setIsCalibrating(false)
          setCalibrationPoints([])
        }}
        points={calibrationPoints}
        onReset={() => setCalibrationPoints([])}
      />
    </div>
  )
}


