import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

const languages = [
  { code: 'ru', name: 'Русский', short: 'RU' },
  { code: 'uz', name: 'O\'zbekcha', short: 'UZ' },
  { code: 'en', name: 'English', short: 'EN' },
]

export default function LangSwitcher() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useParams<{ lang: string }>()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (newLang: string) => {
    const pathParts = location.pathname.split('/')
    pathParts[1] = newLang
    const newPath = pathParts.join('/')
    i18n.changeLanguage(newLang)
    navigate(newPath)
    setIsOpen(false)
  }

  const currentLang = languages.find(l => l.code === lang) || languages[0]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className="hidden sm:inline">{currentLang.short}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={clsx(
                  'w-full text-left px-4 py-3 text-sm transition-colors',
                  language.code === lang
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <span className="font-medium">{language.short}</span>
                <span className="ml-2 text-gray-500">{language.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

