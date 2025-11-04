import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, FileText, Shield } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: string }>()

  const quickLinks = [
    { path: 'product', label: t('nav.product') },
    { path: 'bioinks', label: t('nav.bioinks') },
    { path: 'education', label: t('nav.education') },
    { path: 'shop-uz', label: t('nav.shopUz') },
  ]

  const resources = [
    { path: 'open-source', label: t('nav.openSource') },
    { path: 'ai-qa', label: t('nav.aiQa') },
    { path: 'faq', label: t('nav.faq') },
    { path: 'contact', label: t('nav.contact') },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to={`/${lang}`}
              className="inline-block text-2xl font-display font-bold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent mb-2"
            >
              EDU BIOPRINTER
            </Link>
            <p className="text-primary-400 font-medium mb-3">edubioprinter.uz</p>
            <p className="text-sm text-gray-400 max-w-md mb-4">
              {t('footer.description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="badge bg-primary-500/10 text-primary-400 border border-primary-500/20">
                {t('common.educationOnly')}
              </span>
              <span className="badge bg-green-500/10 text-green-400 border border-green-500/20">
                {t('common.noLiveCells')}
              </span>
              <span className="badge bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {t('common.safeReagents')}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={`/${lang}/${link.path}`}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={`/${lang}/${link.path}`}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} BIOPRINTER. {t('footer.allRightsReserved')}. {t('footer.education')}.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to={`/${lang}/privacy`}
                className="text-sm text-gray-500 hover:text-primary-400 transition-colors flex items-center space-x-1"
              >
                <Shield size={16} />
                <span>{t('footer.privacy')}</span>
              </Link>
              <Link
                to={`/${lang}/contact`}
                className="text-sm text-gray-500 hover:text-primary-400 transition-colors flex items-center space-x-1"
              >
                <Mail size={16} />
                <span>{t('nav.contact')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

