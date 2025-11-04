// Типы для AI-наблюдателя печати

export interface Point {
  x: number
  y: number
}

export interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface ROI {
  x: number
  y: number
  w: number
  h: number
  locked: boolean
}

export interface BaseLine extends Line {
  angle: number
  confidence: number
}

export interface ProcessingResult {
  baseLine: BaseLine | null
  topEdgeY: number | null
  h_mm: number | null
  w_mm: number | null
  probe: { x1: number; y: number; x2: number } | null
  grid: Line[]
  debug: {
    frameTime: number
    edgesFound: number
    cannyMin: number
    cannyMax: number
  }
}

export interface FlowPoint extends Point {
  timestamp: number
}

export interface Measurement {
  timestamp: number
  h_mm: number | null
  w_mm: number | null
  fps: number
}

export interface Statistics {
  h_avg: number | null
  w_avg: number | null
  w_sigma: number | null
  count: number
}

export type AdviceLevel = 'ok' | 'warn' | 'bad'

export interface Advice {
  level: AdviceLevel
  message: string
  details?: string
}

export interface Settings {
  // Целевые значения
  H_target: number
  W_target: number
  px_per_mm: number

  // Параметры Canny
  cannyMin: number
  cannyMax: number

  // Флаги функций
  opticalFlowEnabled: boolean
  speechEnabled: boolean
  gridEnabled: boolean

  // Параметры истории
  historySize: number

  // Пороги
  thresholds: {
    heightLow: number // 0.7
    heightHigh: number // 1.3
    widthSigmaRatio: number // 0.15
  }
}

export interface SessionState {
  isActive: boolean
  isPaused: boolean
  selectedCamera: string | null
  cameras: MediaDeviceInfo[]
  fps: number
  currentMeasurement: Measurement | null
  statistics: Statistics
  advice: Advice
  logs: LogEntry[]
}

export interface LogEntry {
  timestamp: number
  type: 'info' | 'warn' | 'error' | 'success'
  message: string
}

export interface CalibrationState {
  isCalibrating: boolean
  points: Point[]
  knownDistance: number
}

