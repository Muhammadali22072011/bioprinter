import { useCallback, useRef, useEffect } from 'react'
import type { Advice } from '../lib/types'

const THROTTLE_MS = 4000 // Не чаще раза в 4 секунды

export function useSpeech(enabled: boolean) {
  const lastSpokenRef = useRef<number>(0)
  const lastLevelRef = useRef<string | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const speak = useCallback(
    (advice: Advice) => {
      if (!enabled || !synthRef.current) return

      const now = Date.now()

      // Озвучиваем только если уровень изменился и прошло достаточно времени
      if (
        advice.level !== lastLevelRef.current &&
        now - lastSpokenRef.current > THROTTLE_MS
      ) {
        // Отменяем предыдущую речь
        synthRef.current.cancel()

        const utterance = new SpeechSynthesisUtterance(advice.message)
        utterance.lang = 'ru-RU'
        utterance.rate = 1.0
        utterance.pitch = 1.0

        synthRef.current.speak(utterance)

        lastSpokenRef.current = now
        lastLevelRef.current = advice.level
      }
    },
    [enabled]
  )

  const cancel = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
    }
  }, [])

  return {
    speak,
    cancel,
  }
}

