import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import SEO from '../components/SEO'
import { faq, disclaimers } from '../content/data'

export default function Faq() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  }

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'FAQ' : currentLang === 'uz' ? 'Savol-javoblar' : 'FAQ'}
        description={currentLang === 'ru' ? 'Часто задаваемые вопросы о биопринтере' : currentLang === 'uz' ? 'Bioprinter haqida tez-tez so\'raladigan savollar' : 'Frequently asked questions about the bioprinter'}
        schemaData={schemaData}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <SectionHeader
            title={currentLang === 'ru' ? 'Часто задаваемые вопросы' : currentLang === 'uz' ? 'Tez-tez so\'raladigan savollar' : 'Frequently Asked Questions'}
            subtitle={currentLang === 'ru' ? 'Ответы на популярные вопросы' : currentLang === 'uz' ? 'Mashhur savollarga javoblar' : 'Answers to popular questions'}
          />

          <div className="mt-12 space-y-4">
            {faq.map((item, index) => (
              <Card key={index} hover={false} className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.q}
                  </h3>
                  <ChevronDown
                    className={clsx(
                      'text-primary-500 flex-shrink-0 transition-transform duration-300',
                      openIndex === index && 'rotate-180'
                    )}
                    size={24}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mt-4 text-gray-600 border-t border-gray-200 pt-4">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

