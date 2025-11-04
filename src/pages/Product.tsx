import { useParams } from 'react-router-dom'
import { Droplet, Zap, Shield } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import SpecTable from '../components/SpecTable'
import Notice from '../components/ui/Notice'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import SEO from '../components/SEO'
import AICameraSection from '../components/AICameraSection'
import { product, disclaimers } from '../content/data'

export default function Product() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product[currentLang].name,
    "description": disclaimers[currentLang],
    "category": "Educational Equipment",
  }

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Принтер' : currentLang === 'uz' ? 'Printer' : 'Printer'}
        description={disclaimers[currentLang]}
        keywords="bioprinter, Anet A8 Plus, шприцевый экструдер, syringe extruder"
        ogType="product"
        schemaData={schemaData}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container">
          {/* Header */}
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge variant="primary" className="mb-4">
                {currentLang === 'ru' ? 'Оборудование' : currentLang === 'uz' ? 'Uskunа' : 'Equipment'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary-600 to-cyan-500 bg-clip-text text-transparent">
                {product[currentLang].name}
              </h1>
              <p className="text-lg text-gray-600">
                {currentLang === 'ru'
                  ? 'На базе Anet A8 Plus с модифицированным шприцевым экструдером для образовательной биопечати'
                  : currentLang === 'uz'
                  ? 'Ta\'limiy biosiyoh bosib chiqarish uchun modifikatsiyalangan shpritsli ekstruderli Anet A8 Plus asosida'
                  : 'Based on Anet A8 Plus with modified syringe extruder for educational bioprinting'}
              </p>
            </div>
          </ScrollReveal>

          {/* Disclaimer */}
          <ScrollReveal>
            <Notice type="warning">
              <strong>
                {currentLang === 'ru' ? 'Важно:' : currentLang === 'uz' ? 'Muhim:' : 'Important:'}
              </strong>{' '}
              {disclaimers[currentLang]}
            </Notice>
          </ScrollReveal>

          {/* Specifications */}
          <ScrollReveal delay={0.1}>
            <div className="my-12">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                {currentLang === 'ru' ? 'Технические характеристики' : currentLang === 'uz' ? 'Texnik xususiyatlar' : 'Technical Specifications'}
              </h2>
              <SpecTable specs={product[currentLang].spec} />
            </div>
          </ScrollReveal>

          {/* Nozzles Info */}
          <ScrollReveal delay={0.2}>
            <Card className="my-12 bg-gradient-to-br from-primary-50 to-cyan-50 border-primary-200">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-lg">
                  <Droplet className="text-primary-500" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-2 text-gray-900">
                    {currentLang === 'ru' ? 'Сопла и иглы' : currentLang === 'uz' ? 'Nozul va ignalar' : 'Nozzles and Needles'}
                  </h3>
                  <p className="text-gray-700 mb-2">{product.nozzle}</p>
                  <Badge variant="primary">18G ≈ 1.2 мм — {currentLang === 'ru' ? 'рекомендовано' : currentLang === 'uz' ? 'tavsiya etiladi' : 'recommended'}</Badge>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Setup Parameters */}
          <ScrollReveal delay={0.3}>
            <div className="my-12">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                {currentLang === 'ru' ? 'Параметры настройки' : currentLang === 'uz' ? 'Sozlash parametrlari' : 'Setup Parameters'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <div className="flex items-start space-x-3 mb-4">
                    <Zap className="text-cyan-500 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {currentLang === 'ru' ? 'Конфигурация' : currentLang === 'uz' ? 'Konfiguratsiya' : 'Configuration'}
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {product.setup.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-3 mb-4">
                    <Shield className="text-green-500 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {currentLang === 'ru' ? 'Безопасность' : currentLang === 'uz' ? 'Xavfsizlik' : 'Safety'}
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {product.safety.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ScrollReveal>

          {/* Printer Image */}
          <ScrollReveal delay={0.4}>
            <div className="my-12 max-w-4xl mx-auto">
              <img 
                src="/printer.jpg"
                alt={currentLang === 'ru' ? 'Учебный биопринтер на базе Anet A8 Plus' : currentLang === 'uz' ? 'Anet A8 Plus asosidagi ta\'limiy bioprinter' : 'Educational bioprinter based on Anet A8 Plus'}
                className="w-full h-auto rounded-xl shadow-lg object-contain bg-white"
              />
            </div>
          </ScrollReveal>

          {/* AI Camera Section */}
          <ScrollReveal delay={0.5}>
            <AICameraSection lang={currentLang} />
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

