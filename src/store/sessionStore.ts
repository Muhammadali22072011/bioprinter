import { create } from 'zustand'
import type { SessionState, Measurement, Statistics, Advice, LogEntry } from '../lib/types'

interface SessionStore extends SessionState {
  setActive: (active: boolean) => void
  setPaused: (paused: boolean) => void
  setSelectedCamera: (camera: string | null) => void
  setCameras: (cameras: MediaDeviceInfo[]) => void
  setFps: (fps: number) => void
  setCurrentMeasurement: (measurement: Measurement | null) => void
  setStatistics: (stats: Statistics) => void
  setAdvice: (advice: Advice) => void
  addLog: (type: LogEntry['type'], message: string) => void
  clearLogs: () => void
}

const initialAdvice: Advice = {
  level: 'ok',
  message: 'Waiting for data...',
}

export const useSessionStore = create<SessionStore>((set) => ({
  isActive: false,
  isPaused: false,
  selectedCamera: null,
  cameras: [],
  fps: 0,
  currentMeasurement: null,
  statistics: {
    h_avg: null,
    w_avg: null,
    w_sigma: null,
    count: 0,
  },
  advice: initialAdvice,
  logs: [],

  setActive: (active) => set({ isActive: active }),
  setPaused: (paused) => set({ isPaused: paused }),
  setSelectedCamera: (camera) => set({ selectedCamera: camera }),
  setCameras: (cameras) => set({ cameras }),
  setFps: (fps) => set({ fps }),
  setCurrentMeasurement: (measurement) => set({ currentMeasurement: measurement }),
  setStatistics: (stats) => set({ statistics: stats }),
  setAdvice: (advice) => set({ advice }),
  
  addLog: (type, message) =>
    set((state) => ({
      logs: [
        { timestamp: Date.now(), type, message },
        ...state.logs.slice(0, 4), // Держим только 5 последних
      ],
    })),
  
  clearLogs: () => set({ logs: [] }),
}))

