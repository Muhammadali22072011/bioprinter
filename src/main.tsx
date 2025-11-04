import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './i18n'
import './index.css'

// Регистрация Service Worker ТОЛЬКО для ngrok (чтобы избежать лишних авто-обновлений)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const isNgrok = window.location.hostname.includes('ngrok')
    if (isNgrok) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Игнорируем ошибки регистрации SW
      })
    } else {
      // На обычных доменах отключаем SW, чтобы не было нежелательных авто-обновлений
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister())
      })
    }
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)

