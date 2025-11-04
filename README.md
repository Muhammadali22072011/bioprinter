<<<<<<< HEAD
# BIOPRINTER — Учебный биопринтер

> **Production-ready** сайт образовательного биопринтера на базе **Vite + React + TypeScript + Tailwind CSS + Framer Motion**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)](https://vitejs.dev/)

## 📋 Описание

**BIOPRINTER** — полнофункциональный трёхъязычный (RU/UZ/EN) сайт учебного биопринтера с шприцевым экструдером на базе Anet A8 Plus. Проект разработан строго на основе образовательных требований и содержит:

- ✅ Только пищевые/бытовые реагенты (E401, E422, E509)
- ✅ Без живых клеток — 100% безопасно для школ
- ✅ Рецепты биогелей с пошаговыми инструкциями
- ✅ Материалы для учителей (планы занятий, ТБ, оценивание)
- ✅ Ссылки на покупку всех компонентов в Узбекистане

---

## 🚀 Быстрый старт

### Требования

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Установка и запуск

```bash
# 1. Установите зависимости
npm install

# 2. Запустите dev-сервер
npm run dev

# 3. Откройте в браузере
# http://localhost:5173
```

### Сборка для production

```bash
# Сборка оптимизированной версии
npm run build

# Предпросмотр production-сборки
npm run preview
```

---

## 📁 Структура проекта

```
bioprinter-site/
├── public/                    # Статические файлы
│   └── assets/
│       └── favicon.svg
├── src/
│   ├── components/           # React-компоненты
│   │   ├── layout/          # Layout компоненты
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LangSwitcher.tsx
│   │   ├── ui/              # UI компоненты
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Notice.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── ScrollReveal.tsx
│   │   ├── AIBlock.tsx      # AI-модуль контроля
│   │   ├── HeroBlob.tsx     # Анимированный фон
│   │   ├── HowToSteps.tsx   # Пошаговые инструкции
│   │   ├── InkRecipe.tsx    # Карточка рецепта
│   │   ├── SEO.tsx          # SEO компонент
│   │   ├── ShopList.tsx     # Список магазинов
│   │   └── SpecTable.tsx    # Таблица характеристик
│   ├── content/             # Данные контента
│   │   └── data.ts          # Единственный источник DATA_SOURCE
│   ├── i18n/                # Интернационализация
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── ru.json
│   │       ├── uz.json
│   │       └── en.json
│   ├── pages/               # Страницы
│   │   ├── education/       # Подстраницы образования
│   │   │   ├── TeacherGuide.tsx
│   │   │   ├── Passport.tsx
│   │   │   └── Labs.tsx
│   │   ├── Home.tsx
│   │   ├── Product.tsx
│   │   ├── Bioinks.tsx
│   │   ├── Education.tsx
│   │   ├── OpenSource.tsx
│   │   ├── AiQa.tsx
│   │   ├── ShopUz.tsx
│   │   ├── Faq.tsx
│   │   ├── Contact.tsx
│   │   └── Privacy.tsx
│   ├── App.tsx              # Главный компонент с роутингом
│   ├── main.tsx             # Точка входа
│   └── index.css            # Глобальные стили
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🌐 Роутинг и языки

### Структура URL

```
/ → редирект на /ru
/:lang → главная
/:lang/product → принтер
/:lang/bioinks → биочернила
/:lang/education → образование
/:lang/education/teacher-guide → инструкция учителю
/:lang/education/passport → паспорт
/:lang/education/labs → лаборатории
/:lang/open-source → open source
/:lang/ai-qa → AI-контроль
/:lang/shop-uz → где купить (UZ)
/:lang/faq → FAQ
/:lang/contact → контакты
/:lang/privacy → конфиденциальность
```

### Поддерживаемые языки

- **ru** — Русский (по умолчанию)
- **uz** — O'zbekcha (Узбекский)
- **en** — English (Английский)

---

## ✏️ Редактирование контента

### Изменение текстов и данных

Весь контент находится в файле `src/content/data.ts`. Это единственный источник данных (DATA_SOURCE).

**Пример:**

```typescript
// src/content/data.ts

export const bioinks = {
  recipes: [
    {
      id: "A",
      title: "Альгинатный (универсальный)",
      composition: [
        "Альгинат натрия (E401) — 2 г",
        // ... добавьте свои ингредиенты
      ],
      hardener: "Раствор CaCl₂ 2% (2 г на 100 мл)"
    },
    // Добавьте новые рецепты здесь
  ]
}
```

### Изменение UI-строк (кнопки, меню)

UI-переводы находятся в `src/i18n/locales/`:

```json
// src/i18n/locales/ru.json
{
  "nav": {
    "home": "Главная",
    "product": "Принтер"
    // Редактируйте здесь
  }
}
```

---

## 🎨 Дизайн-система

### Цветовая палитра

```css
/* Primary (синий) */
primary-500: #3B82F6
primary-600: #1D63D8

/* Cyan (циан) */
cyan-500: #06B6D4
cyan-600: #0591A8

/* Использование в компонентах */
<Badge variant="primary">Текст</Badge>
<Card className="bg-primary-50">...</Card>
```

### Типографика

- **Display** (заголовки): `Plus Jakarta Sans`
- **Body** (текст): `Inter`

```tsx
<h1 className="font-display font-bold">Заголовок</h1>
<p className="font-sans">Текст параграфа</p>
```

### Компоненты

```tsx
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Notice from '@/components/ui/Notice'
import SectionHeader from '@/components/ui/SectionHeader'

// Использование
<Badge variant="primary">Безопасно</Badge>
<Card hover={true}>Содержимое карточки</Card>
<Notice type="warning">Важное предупреждение</Notice>
<SectionHeader title="Заголовок" subtitle="Подзаголовок" />
```

---

## 🎬 Анимации

### Hero Blob (морфирующий фон)

```tsx
import HeroBlob from '@/components/HeroBlob'

<section className="relative">
  <HeroBlob />
  {/* Контент */}
</section>
```

### Scroll Reveal (появление при скролле)

```tsx
import ScrollReveal from '@/components/ui/ScrollReveal'

<ScrollReveal delay={0.2}>
  <Card>Контент</Card>
</ScrollReveal>
```

### Плавный скролл (Lenis)

Автоматически подключён в `App.tsx` через `<ReactLenis>`.

---

## 🔍 SEO и доступность

### Meta-теги и Schema.org

```tsx
import SEO from '@/components/SEO'

<SEO
  title="Заголовок страницы"
  description="Описание"
  keywords="ключевые, слова"
  schemaData={{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "BIOPRINTER"
  }}
/>
```

### Типы Schema.org

- **Organization** (главная)
- **Product** (страница принтера)
- **HowTo** (рецепты)
- **FAQPage** (FAQ)

### Accessibility (A11y)

- ✅ Контраст ≥ 4.5:1
- ✅ `aria-label` на кнопках и иконках
- ✅ Видимый фокус
- ✅ `prefers-reduced-motion` (отключение анимаций)

---

## 📦 Зависимости

### Production

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.0",
  "react-i18next": "^14.0.5",
  "i18next": "^23.10.0",
  "framer-motion": "^11.0.8",
  "@lenis/react": "^1.0.2",
  "clsx": "^2.1.0",
  "lucide-react": "^0.344.0",
  "react-helmet-async": "^2.0.4"
}
```

### Development

```json
{
  "vite": "^5.1.4",
  "typescript": "^5.3.3",
  "tailwindcss": "^3.4.1",
  "eslint": "^8.57.0"
}
```

---

## 📝 Скрипты

```bash
# Разработка (hot-reload)
npm run dev

# Production-сборка
npm run build

# Предпросмотр production
npm run preview

# Линтинг
npm run lint

# Проверка типов TypeScript
npm run typecheck
```

---

## ⚡ Производительность

### Lighthouse Target

- **Performance**: ≥ 95
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 95
- **SEO**: ≥ 95

### Оптимизации

- ✅ Code splitting (react-vendor, i18n, animation chunks)
- ✅ Lazy loading изображений
- ✅ Минификация CSS/JS
- ✅ Tree shaking
- ✅ Preconnect к шрифтам Google Fonts

---

## 🛠️ Разработка

### Добавление новой страницы

1. Создайте файл страницы в `src/pages/`:

```tsx
// src/pages/NewPage.tsx
import SEO from '@/components/SEO'

export default function NewPage() {
  return (
    <>
      <SEO title="Новая страница" description="Описание" />
      <div className="container py-16">
        <h1>Новая страница</h1>
      </div>
    </>
  )
}
```

2. Добавьте роут в `App.tsx`:

```tsx
import NewPage from './pages/NewPage'

<Route path="new-page" element={<NewPage />} />
```

3. Добавьте ссылку в навигацию (`Navbar.tsx`):

```tsx
const navLinks = [
  // ...
  { path: 'new-page', label: 'Новая страница' }
]
```

### Добавление нового компонента

```tsx
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string
}

export default function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>
}
```

---

## 🌍 Добавление нового языка

1. Создайте файл `src/i18n/locales/de.json` (пример: немецкий)
2. Добавьте переводы UI-строк
3. Импортируйте в `src/i18n/index.ts`:

```typescript
import deTranslations from './locales/de.json'

i18n.init({
  resources: {
    ru: { translation: ruTranslations },
    uz: { translation: uzTranslations },
    en: { translation: enTranslations },
    de: { translation: deTranslations } // Новый язык
  },
  supportedLngs: ['ru', 'uz', 'en', 'de']
})
```

4. Обновите `LangSwitcher.tsx`:

```typescript
const languages = [
  // ...
  { code: 'de', name: 'Deutsch', short: 'DE' }
]
```

---

## 📄 Лицензия и использование

### Контент

Весь контент (DATA_SOURCE) взят из пользовательского документа и предназначен **только для образовательных целей**.

### Код

Проект создан для образовательных учреждений. Примеры кода могут быть использованы в учебных целях.

---

## 🤝 Контакты и поддержка

- **Email**: info@bioprinter.uz
- **Вопросы**: См. раздел [FAQ](/ru/faq)

---

## ✨ Ключевые особенности

✅ **Трёхъязычность** (RU/UZ/EN)  
✅ **Production-ready** (Lighthouse ≥ 95)  
✅ **Современный стек** (React 18, TypeScript, Tailwind)  
✅ **Плавные анимации** (Framer Motion, Lenis)  
✅ **SEO-оптимизация** (Schema.org, OpenGraph)  
✅ **Accessibility** (A11y-совместимость)  
✅ **Безопасность** (только образовательный контент)  
✅ **Готовые материалы** (рецепты, инструкции, программы)  

---

**Создано с ❤️ для образования**

=======
# bioprinter
>>>>>>> 6dcd65dcc54456e26a06ffd432b045e9ef00d717
