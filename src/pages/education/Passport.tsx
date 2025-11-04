import { useParams } from 'react-router-dom'
import { Package, CheckCircle } from 'lucide-react'
import SectionHeader from '../../components/ui/SectionHeader'
import Card from '../../components/ui/Card'
import ScrollReveal from '../../components/ui/ScrollReveal'
import SpecTable from '../../components/SpecTable'
import SEO from '../../components/SEO'
import { education, product, disclaimers } from '../../content/data'

export default function Passport() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Паспорт устройства' : currentLang === 'uz' ? 'Qurilma pasporti' : 'Device Passport'}
        description={disclaimers[currentLang]}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container max-w-5xl">
          <SectionHeader
            title={education.passport.title}
            subtitle={currentLang === 'ru' ? 'Технический паспорт и спецификации' : currentLang === 'uz' ? 'Texnik pasport va spetsifikatsiyalar' : 'Technical passport and specifications'}
          />

          {/* Kit Contents */}
          <ScrollReveal>
            <Card className="my-8">
              <div className="flex items-start space-x-4">
                <Package className="text-primary-500 flex-shrink-0" size={32} />
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'Комплектация' : currentLang === 'uz' ? 'Komplektatsiya' : 'Kit Contents'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {education.passport.kit.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Specifications */}
          <ScrollReveal delay={0.1}>
            <div className="my-8">
              <h3 className="text-xl font-display font-bold mb-4 text-center">
                {currentLang === 'ru' ? 'Технические характеристики' : currentLang === 'uz' ? 'Texnik xususiyatlar' : 'Technical Specifications'}
              </h3>
              <SpecTable specs={product.spec} />
            </div>
          </ScrollReveal>

          {/* Acceptance */}
          <ScrollReveal delay={0.2}>
            <Card className="my-8">
              <div className="flex items-start space-x-4">
                <CheckCircle className="text-green-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'Приёмка и контроль качества' : currentLang === 'uz' ? 'Qabul qilish va sifat nazorati' : 'Acceptance and Quality Control'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {education.passport.acceptance.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

