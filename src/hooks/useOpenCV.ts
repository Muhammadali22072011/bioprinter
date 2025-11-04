import { useState, useEffect, useCallback } from 'react'

interface OpenCVState {
  loaded: boolean
  loading: boolean
  error: string | null
}

declare global {
  interface Window {
    cv: any
  }
}

export function useOpenCV() {
  const [state, setState] = useState<OpenCVState>({
    loaded: false,
    loading: false,
    error: null,
  })

  const loadOpenCV = useCallback(() => {
    // Уже загружен
    if (window.cv && window.cv.Mat) {
      setState({ loaded: true, loading: false, error: null })
      return Promise.resolve()
    }

    // Уже загружается
    if (state.loading) {
      return new Promise((resolve, reject) => {
        const check = setInterval(() => {
          if (window.cv && window.cv.Mat) {
            clearInterval(check)
            resolve(true)
          }
        }, 100)
        
        setTimeout(() => {
          clearInterval(check)
          reject(new Error('OpenCV load timeout'))
        }, 30000)
      })
    }

    setState(prev => ({ ...prev, loading: true }))

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = '/opencv/opencv.js'
      script.async = true

      script.onload = () => {
        // OpenCV загружается асинхронно после загрузки скрипта
        if (window.cv) {
          window.cv.onRuntimeInitialized = () => {
            console.log('OpenCV.js initialized')
            setState({ loaded: true, loading: false, error: null })
            resolve()
          }
        } else {
          // Ждем инициализации
          const checkInterval = setInterval(() => {
            if (window.cv && window.cv.Mat) {
              clearInterval(checkInterval)
              console.log('OpenCV.js ready')
              setState({ loaded: true, loading: false, error: null })
              resolve()
            }
          }, 100)

          // Timeout
          setTimeout(() => {
            clearInterval(checkInterval)
            const error = 'OpenCV initialization timeout'
            setState({ loaded: false, loading: false, error })
            reject(new Error(error))
          }, 15000)
        }
      }

      script.onerror = () => {
        const error = 'Failed to load OpenCV.js'
        console.error(error)
        setState({ loaded: false, loading: false, error })
        reject(new Error(error))
      }

      document.body.appendChild(script)
    })
  }, [state.loading])

  // Автозагрузка
  useEffect(() => {
    loadOpenCV().catch(err => {
      console.warn('OpenCV failed to load, will use fallback:', err)
    })
  }, [loadOpenCV])

  return {
    cv: window.cv,
    isLoaded: state.loaded,
    isLoading: state.loading,
    error: state.error,
    loadOpenCV,
  }
}

