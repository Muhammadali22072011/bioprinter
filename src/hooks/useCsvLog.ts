import { useCallback, useEffect, useState } from 'react'
import type { Measurement, Statistics, Advice } from '../lib/types'

interface CsvLogEntry {
  timestamp: number
  h_mm: number | null
  w_mm: number | null
  h_avg: number | null
  w_avg: number | null
  w_sigma: number | null
  status: string
  fps: number
}

const LOG_STORAGE_KEY = 'bioprinter-logs'
const MAX_LOGS = 1000 // Максимум записей в localStorage

export function useCsvLog() {
  const [logs, setLogs] = useState<CsvLogEntry[]>(() => {
    // Загружаем из localStorage при инициализации
    try {
      const saved = localStorage.getItem(LOG_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs))
    } catch (err) {
      console.error('Failed to save logs to localStorage:', err)
    }
  }, [logs])

  const addEntry = useCallback(
    (
      measurement: Measurement | null,
      statistics: Statistics,
      advice: Advice,
      fps: number
    ) => {
      if (!measurement) return

      const entry: CsvLogEntry = {
        timestamp: measurement.timestamp,
        h_mm: measurement.h_mm,
        w_mm: measurement.w_mm,
        h_avg: statistics.h_avg,
        w_avg: statistics.w_avg,
        w_sigma: statistics.w_sigma,
        status: advice.message,
        fps: Math.round(fps),
      }

      setLogs(prev => {
        const newLogs = [...prev, entry]
        // Ограничиваем количество записей
        return newLogs.slice(-MAX_LOGS)
      })
    },
    []
  )

  const downloadCsv = useCallback(() => {
    if (logs.length === 0) {
      alert('Нет данных для скачивания')
      return
    }

    // Заголовки
    const headers = [
      'Timestamp',
      'Time',
      'h_mm',
      'w_mm',
      'h_avg',
      'w_avg',
      'w_sigma',
      'Status',
      'FPS',
    ]

    // Строки
    const rows = logs.map(entry => {
      const date = new Date(entry.timestamp)
      const time = date.toLocaleTimeString('ru-RU')
      
      return [
        entry.timestamp,
        time,
        entry.h_mm?.toFixed(3) ?? '',
        entry.w_mm?.toFixed(3) ?? '',
        entry.h_avg?.toFixed(3) ?? '',
        entry.w_avg?.toFixed(3) ?? '',
        entry.w_sigma?.toFixed(3) ?? '',
        `"${entry.status}"`,
        entry.fps,
      ].join(',')
    })

    const csv = [headers.join(','), ...rows].join('\n')

    // Скачивание
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `bioprinter-log-${Date.now()}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [logs])

  const clearLog = useCallback(() => {
    setLogs([])
    localStorage.removeItem(LOG_STORAGE_KEY)
  }, [])

  const getLogs = useCallback(() => logs, [logs])

  return {
    addEntry,
    downloadCsv,
    clearLog,
    getLogs,
    entryCount: logs.length,
    logs, // Экспортируем логи для отображения
  }
}

