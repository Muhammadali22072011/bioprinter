import { useState, useCallback } from 'react'
import type { Measurement, Statistics } from '../lib/types'

export function useHistoryStats(maxSize: number = 30) {
  const [history, setHistory] = useState<Measurement[]>([])
  const [statistics, setStatistics] = useState<Statistics>({
    h_avg: null,
    w_avg: null,
    w_sigma: null,
    count: 0,
  })

  const addMeasurement = useCallback(
    (measurement: Measurement) => {
      setHistory(prev => {
        const newHistory = [measurement, ...prev].slice(0, maxSize)

        // Пересчитываем статистику
        const validH = newHistory.filter(m => m.h_mm !== null).map(m => m.h_mm!)
        const validW = newHistory.filter(m => m.w_mm !== null).map(m => m.w_mm!)

        const h_avg = validH.length > 0 
          ? validH.reduce((sum, v) => sum + v, 0) / validH.length 
          : null

        const w_avg = validW.length > 0 
          ? validW.reduce((sum, v) => sum + v, 0) / validW.length 
          : null

        let w_sigma = null
        if (validW.length >= 2 && w_avg !== null) {
          const variance = validW.reduce((sum, v) => sum + (v - w_avg) ** 2, 0) / validW.length
          w_sigma = Math.sqrt(variance)
        }

        setStatistics({
          h_avg,
          w_avg,
          w_sigma,
          count: newHistory.length,
        })

        return newHistory
      })
    },
    [maxSize]
  )

  const clearHistory = useCallback(() => {
    setHistory([])
    setStatistics({
      h_avg: null,
      w_avg: null,
      w_sigma: null,
      count: 0,
    })
  }, [])

  return {
    history,
    statistics,
    addMeasurement,
    clearHistory,
  }
}

