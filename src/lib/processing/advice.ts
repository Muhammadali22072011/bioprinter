import type { Advice, Statistics, Settings } from '../types'

/**
 * Генерирует совет на основе измерений и статистики
 */
export function generateAdvice(
  h_mm: number | null,
  w_mm: number | null,
  stats: Statistics,
  settings: Settings
): Advice {
  const { H_target, W_target, thresholds } = settings

  // Недостаточно данных
  if (h_mm === null || w_mm === null) {
    return {
      level: 'ok',
      message: 'Ожидание данных...',
      details: 'Направьте камеру на печатаемый слой',
    }
  }

  // Проверка высоты слоя
  const heightRatio = h_mm / H_target

  if (heightRatio < thresholds.heightLow) {
    return {
      level: 'bad',
      message: 'Недо-экструзия / низкий слой',
      details: `Высота ${h_mm.toFixed(2)}мм < ${(H_target * thresholds.heightLow).toFixed(2)}мм. Увеличьте подачу материала или опустите Z-ось.`,
    }
  }

  if (heightRatio > thresholds.heightHigh) {
    return {
      level: 'bad',
      message: 'Пере-экструзия / толстый слой',
      details: `Высота ${h_mm.toFixed(2)}мм > ${(H_target * thresholds.heightHigh).toFixed(2)}мм. Уменьшите подачу материала или поднимите Z-ось.`,
    }
  }

  // Проверка стабильности ширины
  if (stats.w_sigma !== null && stats.w_avg !== null && stats.count >= 10) {
    const sigmaRatio = stats.w_sigma / stats.w_avg

    if (sigmaRatio > thresholds.widthSigmaRatio) {
      return {
        level: 'warn',
        message: 'Нестабильная подача',
        details: `σ(w)=${stats.w_sigma.toFixed(2)}мм (${(sigmaRatio * 100).toFixed(1)}%). Проверьте вязкость материала, наличие пузырьков или люфт в механике.`,
      }
    }
  }

  // Проверка ширины дорожки
  const widthRatio = w_mm / W_target

  if (widthRatio < 0.7) {
    return {
      level: 'warn',
      message: 'Дорожка слишком узкая',
      details: `Ширина ${w_mm.toFixed(2)}мм < ${(W_target * 0.7).toFixed(2)}мм. Возможно недостаточная подача или слишком быстрая скорость печати.`,
    }
  }

  if (widthRatio > 1.5) {
    return {
      level: 'warn',
      message: 'Дорожка слишком широкая',
      details: `Ширина ${w_mm.toFixed(2)}мм > ${(W_target * 1.5).toFixed(2)}мм. Возможно избыточная подача или слишком медленная скорость.`,
    }
  }

  // Всё хорошо
  return {
    level: 'ok',
    message: 'Параметры в норме',
    details: `h=${h_mm.toFixed(2)}мм (${(heightRatio * 100).toFixed(0)}%), w=${w_mm.toFixed(2)}мм (${(widthRatio * 100).toFixed(0)}%)`,
  }
}

/**
 * Цвета для разных уровней
 */
export const ADVICE_COLORS = {
  ok: '#16a34a',
  warn: '#f59e0b',
  bad: '#ef4444',
}

