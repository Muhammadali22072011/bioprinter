# 🐛 Исправление: Бесконечный цикл обновлений

## Проблема

При запуске `/ai-observer` возникала ошибка:
```
Uncaught Error: Maximum update depth exceeded.
This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
```

## Причина

В компоненте `AIObserver.tsx` был неправильно настроен `useEffect`:

```typescript
// ❌ ПЛОХО - session в зависимостях вызывает бесконечный цикл
useEffect(() => {
  session.setStatistics(statistics)
  session.setAdvice(advice)
  // ...
}, [statistics, session, ...]) // session - это объект store, который всегда новый!
```

При каждом вызове `session.setStatistics()` Zustand обновлял store, что создавало новый объект `session`, который триггерил `useEffect` снова → бесконечный цикл!

## Решение

### 1. Правильная деструктуризация Zustand store

**До:**
```typescript
const session = useSessionStore()
// session используется как целый объект
```

**После:**
```typescript
// Деструктурируем конкретные свойства и методы
const {
  isPaused,
  selectedCamera,
  advice,
  currentMeasurement,
  fps,
  setStatistics,
  setAdvice,
  setCurrentMeasurement,
  setFps,
  setPaused,
  setSelectedCamera,
} = useSessionStore()
```

### 2. Использование конкретных зависимостей

**До:**
```typescript
useEffect(() => {
  session.setStatistics(statistics)
  // ...
}, [statistics, session, ...]) // ❌ session - нестабильная ссылка
```

**После:**
```typescript
useEffect(() => {
  setStatistics(statistics)
  // ...
}, [statistics, setStatistics, ...]) // ✅ setStatistics - стабильная ссылка
```

## Что было изменено

### Файл: `src/pages/AIObserver.tsx`

1. ✅ Заменена прямая ссылка `session` на деструктурированные свойства
2. ✅ Обновлены все `useEffect` зависимости
3. ✅ Убраны неиспользуемые переменные (с префиксом `_`)
4. ✅ Исправлены все callbacks (`handleStartStop`, `handleCameraSelect`)

### Изменённые строки:

- **Строка 26-41**: Деструктуризация store
- **Строка 111**: `session.isPaused` → `isPaused`
- **Строка 156**: `session.isPaused` → `isPaused`
- **Строка 163-180**: Обновлен useEffect со статистикой
- **Строка 213-225**: Исправлен `handleStartStop`
- **Строка 227-233**: Исправлен `handleCameraSelect`
- **Строка 276-283**: TopBar props
- **Строка 310**: StatusBanner prop

## Дополнительные исправления

### OpenCV.js - 404 (это нормально!)

```
Failed to load resource: opencv/opencv.js 404
OpenCV failed to load, will use fallback
```

Это **не ошибка**! Система автоматически использует Canvas2D fallback, который работает без OpenCV.

Если хотите использовать OpenCV:
```bash
mkdir -p public/opencv
# Скачайте opencv.js и opencv.wasm туда
```

## Результат

✅ **Бесконечный цикл устранён**  
✅ **Приложение запускается корректно**  
✅ **Все функции работают**  
✅ **Fallback на Canvas2D работает**  

## Как проверить исправление

1. Запустите `npm run dev`
2. Откройте `http://localhost:5173/ai-observer`
3. Откройте DevTools Console (F12)
4. **Не должно быть** ошибок о "Maximum update depth"
5. **Должно быть**:
   - ✅ Приложение загружается
   - ✅ Можно выбрать камеру
   - ✅ Камера запускается
   - ✅ FPS обновляется

## Best Practice для Zustand

### ❌ НЕ ДЕЛАЙТЕ ТАК:

```typescript
const store = useStore()
useEffect(() => {
  store.doSomething()
}, [store]) // ❌ store всегда новый объект!
```

### ✅ ДЕЛАЙТЕ ТАК:

```typescript
// Вариант 1: Деструктуризация
const { value, doSomething } = useStore()
useEffect(() => {
  doSomething()
}, [doSomething]) // ✅ Стабильная ссылка

// Вариант 2: Селектор
const doSomething = useStore(state => state.doSomething)
useEffect(() => {
  doSomething()
}, [doSomething]) // ✅ Стабильная ссылка
```

## Дополнительная информация

- [Zustand Best Practices](https://github.com/pmndrs/zustand#selecting-multiple-state-slices)
- [React useEffect Dependencies](https://react.dev/reference/react/useEffect#specifying-reactive-dependencies)

---

**Проблема решена!** 🎉

Теперь приложение работает корректно без бесконечных циклов.

