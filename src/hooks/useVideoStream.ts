import { useRef, useEffect, useCallback, useState } from 'react'
import { useSessionStore } from '../store/sessionStore'

export function useVideoStream() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { 
    isActive, 
    selectedCamera, 
    cameras, 
    setActive, 
    setCameras, 
    addLog 
  } = useSessionStore()

  // Получить список камер
  const enumerateDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(device => device.kind === 'videoinput')
      setCameras(videoDevices)
      return videoDevices
    } catch (err) {
      console.error('Failed to enumerate devices:', err)
      setError('Failed to list cameras')
      return []
    }
  }, [setCameras])

  // Запустить камеру
  const startCamera = useCallback(async (deviceId?: string) => {
    try {
      setError(null)
      
      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setActive(true)
        addLog('success', 'Camera started successfully')
      }

      // После получения доступа обновляем список устройств
      await enumerateDevices()
    } catch (err: any) {
      console.error('Camera error:', err)
      const message = err.name === 'NotAllowedError' 
        ? 'Camera access denied' 
        : 'Failed to start camera'
      setError(message)
      addLog('error', message)
    }
  }, [setActive, addLog, enumerateDevices])

  // Остановить камеру
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setActive(false)
    addLog('info', 'Camera stopped')
  }, [setActive, addLog])

  // Переключить камеру
  const switchCamera = useCallback(async (deviceId: string) => {
    if (isActive) {
      stopCamera()
      await startCamera(deviceId)
    }
  }, [isActive, stopCamera, startCamera])

  // Cleanup
  useEffect(() => {
    // Инициализация списка камер
    enumerateDevices()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [enumerateDevices])

  // Автозапуск при выборе камеры
  useEffect(() => {
    if (selectedCamera && !isActive) {
      startCamera(selectedCamera)
    }
  }, [selectedCamera, isActive, startCamera])

  return {
    videoRef,
    isActive,
    error,
    cameras,
    startCamera,
    stopCamera,
    switchCamera,
  }
}

