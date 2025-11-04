import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogType?: string
  schemaData?: object
}

export default function SEO({ title, description, keywords, ogType = 'website', schemaData }: SEOProps) {
  const { i18n } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  const currentLang = lang || 'ru'
  const location = useLocation()
  
  const fullTitle = `${title} | EDU BIOPRINTER`
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://edubioprinter.uz'
  const currentUrl = typeof window !== 'undefined' ? window.location.href : baseUrl

  // Canonical and hreflang
  const segments = location.pathname.split('/')
  const pathAfterLang = '/' + segments.slice(2).join('/')
  const localized = (code: string) => `${baseUrl}/${code}${pathAfterLang === '/' ? '' : pathAfterLang}`
  const canonicalUrl = localized(currentLang)

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ru" href={localized('ru')} />
      <link rel="alternate" hrefLang="uz" href={localized('uz')} />
      <link rel="alternate" hrefLang="en" href={localized('en')} />
      <link rel="alternate" hrefLang="x-default" href={localized('ru')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="EDU BIOPRINTER" />
      <meta property="og:image" content={`${baseUrl}/assets/favicon.svg`} />
      <meta property="og:locale" content={currentLang === 'uz' ? 'uz_UZ' : currentLang === 'en' ? 'en_US' : 'ru_RU'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/assets/favicon.svg`} />
      
      {/* Schema.org JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  )
}

