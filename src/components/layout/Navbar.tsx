import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LangSwitcher from './LangSwitcher'
import clsx from 'clsx'

export default function Navbar() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '', label: t('nav.home') },
    { path: 'product', label: t('nav.product') },
    { path: 'bioinks', label: t('nav.bioinks') },
    { path: 'education', label: t('nav.education') },
    { path: 'open-source', label: t('nav.openSource') },
    { path: 'ai-qa', label: t('nav.aiQa') },
    { path: 'ai-camera', label: t('nav.aiCamera') },
    { path: 'shop-uz', label: t('nav.shopUz') },
    { path: 'faq', label: t('nav.faq') },
  ]

  return (
    <motion.nav
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to={`/${lang}`}
            className="flex flex-col hover:scale-105 transition-transform"
          >
            <span className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-cyan-500 bg-clip-text text-transparent">
              EDU BIOPRINTER
            </span>
            <span className="text-[10px] md:text-xs text-primary-600 font-medium -mt-1">
              edubioprinter.uz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path ? `/${lang}/${link.path}` : `/${lang}`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <LangSwitcher />
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path ? `/${lang}/${link.path}` : `/${lang}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

