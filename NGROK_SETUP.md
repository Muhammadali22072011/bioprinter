# Настройка ngrok для EDU BIOPRINTER

## Проблема
При использовании бесплатной версии ngrok посетители видят предупреждающую страницу при первом посещении.

## Решения

### Вариант 1: Добавлен мета-тег (Уже сделано ✅)
В `index.html` добавлен:
```html
<meta name="ngrok-skip-browser-warning" content="true" />
```

### Вариант 2: Настройка Vite для добавления заголовков
Обновите `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  }
})
```

### Вариант 3: Запуск ngrok с опциями
```bash
# Запустите сервер
npm run dev

# В другом терминале запустите ngrok
ngrok http 5173 --host-header="localhost:5173"
```

### Вариант 4: Платная подписка ngrok (Рекомендуется)
- Убирает предупреждение полностью
- Пользовательский поддомен (eduprioprinter.ngrok.io)
- SSL сертификаты
- Стоимость: от $8/месяц

Ссылка: https://ngrok.com/pricing

## Текущий URL
Ваш ngrok URL: `https://eddd7ce710b0.ngrok-free.app`

## Примечания
- Предупреждение показывается только один раз для каждого посетителя
- После первого посещения (нажатия "Visit Site") страница больше не появляется
- Это стандартное поведение для бесплатной версии ngrok

## Для продакшена
Рекомендуется использовать нормальный хостинг:
- Vercel (бесплатно для небольших проектов)
- Netlify (бесплатно)
- GitHub Pages
- Cloudflare Pages
- Или VPS с собственным доменом eduprioprinter.uz

