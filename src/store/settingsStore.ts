import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Settings } from '../lib/types'

interface SettingsStore extends Settings {
  updateSettings: (settings: Partial<Settings>) => void
  resetSettings: () => void
}

const defaultSettings: Settings = {
  H_target: 0.6,
  W_target: 1.2,
  px_per_mm: 20,
  cannyMin: 40,
  cannyMax: 120,
  opticalFlowEnabled: false,
  speechEnabled: false,
  gridEnabled: true,
  historySize: 30,
  thresholds: {
    heightLow: 0.7,
    heightHigh: 1.3,
    widthSigmaRatio: 0.15,
  },
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'ai-observer-settings',
    }
  )
)

