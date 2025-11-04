import { useSettingsStore } from '../store/settingsStore'

/**
 * Удобный хук для работы с настройками
 */
export function useSettings() {
  return useSettingsStore()
}

