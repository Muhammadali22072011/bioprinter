import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Bioinks from './pages/Bioinks'
import Education from './pages/Education'
import TeacherGuide from './pages/education/TeacherGuide'
import Passport from './pages/education/Passport'
import Labs from './pages/education/Labs'
import OpenSource from './pages/OpenSource'
import AiQa from './pages/AiQa'
import AICamera from './pages/AICamera'
import AIObserver from './pages/AIObserver'
import ShopUz from './pages/ShopUz'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'

function App() {
  const { i18n } = useTranslation()
  const location = useLocation()

  // Определяем язык из URL
  useEffect(() => {
    const pathLang = location.pathname.split('/')[1]
    if (['ru', 'uz', 'en'].includes(pathLang) && pathLang !== i18n.language) {
      i18n.changeLanguage(pathLang)
    }
  }, [location, i18n])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      {/* Редирект на русскую версию по умолчанию */}
      <Route path="/" element={<Navigate to="/ru" replace />} />
      
      {/* AI Observer - отдельный роут без Layout */}
      <Route path="/ai-observer" element={<AIObserver />} />
      
      {/* Роуты с языком */}
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="bioinks" element={<Bioinks />} />
        <Route path="education" element={<Education />} />
        <Route path="education/teacher-guide" element={<TeacherGuide />} />
        <Route path="education/passport" element={<Passport />} />
        <Route path="education/labs" element={<Labs />} />
        <Route path="open-source" element={<OpenSource />} />
        <Route path="ai-qa" element={<AiQa />} />
        <Route path="ai-camera" element={<AICamera />} />
        <Route path="shop-uz" element={<ShopUz />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/ru" replace />} />
    </Routes>
  )
}

export default App

