# 🚀 Руководство по деплою

## Быстрый деплой

### Vercel (рекомендуется)

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой:
```bash
vercel
```

3. Production деплой:
```bash
vercel --prod
```

### Netlify

1. Создайте `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Деплой через Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

1. Установите `gh-pages`:
```bash
npm install -D gh-pages
```

2. Добавьте в `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://username.github.io/bioprinter-site"
}
```

3. В `vite.config.ts` установите base:
```ts
export default defineConfig({
  base: '/bioprinter-site/',
  // ...
})
```

4. Деплой:
```bash
npm run deploy
```

---

## Переменные окружения

Создайте `.env.production`:

```env
VITE_APP_TITLE=BIOPRINTER
VITE_BASE_URL=https://bioprinter.site
VITE_CONTACT_EMAIL=info@bioprinter.uz
```

Используйте в коде:
```ts
const baseUrl = import.meta.env.VITE_BASE_URL
```

---

## Оптимизация перед деплоем

### 1. Проверка сборки

```bash
npm run build
npm run preview
```

### 2. Lighthouse audit

```bash
npm install -g lighthouse
lighthouse http://localhost:4173 --view
```

### 3. Bundle анализ

```bash
npm run build -- --mode analyze
```

Добавьте в `vite.config.ts`:
```ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ]
})
```

---

## SSL и домены

### Vercel

- Автоматический HTTPS
- Бесплатный SSL
- Custom domain: Settings → Domains → Add

### Netlify

- Автоматический HTTPS
- Бесплатный Let's Encrypt SSL
- Custom domain: Settings → Domain management → Add custom domain

---

## CI/CD Pipeline (GitHub Actions)

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run typecheck
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Мониторинг и аналитика

### Google Analytics

Добавьте в `index.html`:

```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

```tsx
// src/main.tsx
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})
```

---

## Checklist перед деплоем

- [ ] `npm run build` работает без ошибок
- [ ] `npm run lint` проходит
- [ ] `npm run typecheck` проходит
- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Проверены все языки (ru/uz/en)
- [ ] Проверены все ссылки
- [ ] Meta-теги заполнены
- [ ] Favicon установлен
- [ ] robots.txt настроен
- [ ] manifest.json настроен
- [ ] SSL сертификат установлен (HTTPS)
- [ ] Мониторинг настроен (опционально)

---

## Полезные команды

```bash
# Проверка размера бандла
npm run build && npx vite-bundle-visualizer

# Предпросмотр production-версии локально
npm run preview

# Проверка доступности (a11y)
npx axe http://localhost:4173

# Проверка SEO
npx unlighthouse --site http://localhost:4173
```

---

**Готово к деплою! 🚀**

