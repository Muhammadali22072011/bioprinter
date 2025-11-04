import { useParams } from 'react-router-dom'
import { Beaker, AlertCircle, ShoppingBag, Wrench, TestTube, Droplet, CheckSquare } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import ScrollReveal from '../components/ui/ScrollReveal'
import InkRecipe from '../components/InkRecipe'
import HowToSteps from '../components/HowToSteps'
import Card from '../components/ui/Card'
import Notice from '../components/ui/Notice'
import Badge from '../components/ui/Badge'
import SEO from '../components/SEO'
import { bioinks, disclaimers } from '../content/data'

export default function Bioinks() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  const getMaterialsFromStores = () => {
    if (currentLang === 'uz') return bioinks.materials.fromStoresUz
    if (currentLang === 'en') return bioinks.materials.fromStoresEn
    return bioinks.materials.fromStores
  }

  const getTools = () => {
    if (currentLang === 'uz') return bioinks.materials.toolsUz
    if (currentLang === 'en') return bioinks.materials.toolsEn
    return bioinks.materials.tools
  }

  const steps = currentLang === 'ru' ? bioinks.howto.steps.ru : currentLang === 'uz' ? bioinks.howto.steps.uz : bioinks.howto.steps.en

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": currentLang === 'ru' ? "Приготовление биогеля" : currentLang === 'uz' ? "Biojel tayyorlash" : "Bioink Preparation",
    "description": currentLang === 'ru' ? "Пошаговая инструкция по приготовлению биогеля для учебного биопринтера" : currentLang === 'uz' ? "O'quv bioptinteri uchun biojel tayyorlash bo'yicha qadamma-qadam qo'llanma" : "Step-by-step guide for preparing bioink for educational bioprinter",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step
    }))
  }

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Биочернила' : currentLang === 'uz' ? 'Biosiyohlar' : 'Bioinks'}
        description={disclaimers[currentLang]}
        keywords="bioinks, биочернила, альгинат, желатин, гидрогель, рецепты"
        schemaData={schemaData}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container">
          {/* Header */}
          <SectionHeader
            title={currentLang === 'ru' ? 'Биочернила и рецепты' : currentLang === 'uz' ? 'Biosiyohlar va retseptlar' : 'Bioinks and Recipes'}
            subtitle={currentLang === 'ru' ? 'Безопасные пищевые гидрогели для образовательной биопечати' : currentLang === 'uz' ? 'Ta\'limiy biosiyoh bosib chiqarish uchun xavfsiz oziq-ovqat gidrojellari' : 'Safe food-grade hydrogels for educational bioprinting'}
          />

          {/* Disclaimer */}
          <ScrollReveal>
            <Notice type="info">
              {disclaimers[currentLang]}
            </Notice>
          </ScrollReveal>

          {/* Recipes */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Базовые рецепты' : currentLang === 'uz' ? 'Asosiy retseptlar' : 'Basic Recipes'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bioinks.recipes.map((recipe, index) => {
                const transformedRecipe = {
                  id: recipe.id,
                  title: currentLang === 'ru' ? recipe.title_ru : currentLang === 'uz' ? recipe.title_uz : recipe.title_en,
                  composition: recipe.composition.map(item => item[currentLang]),
                  hardener: currentLang === 'ru' ? recipe.hardener_ru : currentLang === 'uz' ? recipe.hardener_uz : recipe.hardener_en
                }
                return (
                  <ScrollReveal key={recipe.id} delay={index * 0.1}>
                    <InkRecipe recipe={transformedRecipe} index={index} />
                  </ScrollReveal>
                )
              })}
            </div>
          </div>

          {/* Mini Batch */}
          <ScrollReveal>
            <Card className="my-12 bg-gradient-to-br from-cyan-50 to-primary-50 border-cyan-200">
              <div className="flex items-start space-x-4">
                <Beaker className="text-cyan-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-display font-bold mb-2">
                    {currentLang === 'ru' ? 'Мини-порция для пробы' : currentLang === 'uz' ? 'Sinov uchun mini porsiya' : 'Mini Batch for Testing'}
                  </h3>
                  <p className="text-gray-700">{currentLang === 'ru' ? bioinks.miniBatch.ru : currentLang === 'uz' ? bioinks.miniBatch.uz : bioinks.miniBatch.en}</p>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* How To */}
          <div className="my-16">
            <ScrollReveal>
              <HowToSteps
                steps={steps}
                title={currentLang === 'ru' ? 'Как приготовить биогель' : currentLang === 'uz' ? 'Biojelni qanday tayyorlash' : 'How to Prepare Bioink'}
              />
            </ScrollReveal>
          </div>

          {/* Print Parameters */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Параметры печати' : currentLang === 'uz' ? 'Bosib chiqarish parametrlari' : 'Printing Parameters'}
            </h2>
            <ScrollReveal>
              <Card>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(bioinks.printParams[currentLang] || bioinks.printParams.ru).map((param, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                      <span>{param}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          </div>

          {/* What You Need */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Что нужно для работы' : currentLang === 'uz' ? 'Ish uchun kerak bo\'lgan narsalar' : 'What You Need'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <Card>
                  <div className="flex items-start space-x-4 mb-4">
                    <ShoppingBag className="text-primary-500 flex-shrink-0" size={32} />
                    <h3 className="text-lg font-display font-bold">
                      {currentLang === 'ru' ? 'Из аптек/магазинов' : currentLang === 'uz' ? 'Dorixona/do\'konlardan' : 'From Stores'}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {getMaterialsFromStores().map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckSquare size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Card>
                  <div className="flex items-start space-x-4 mb-4">
                    <Wrench className="text-cyan-500 flex-shrink-0" size={32} />
                    <h3 className="text-lg font-display font-bold">
                      {currentLang === 'ru' ? 'Инструменты' : currentLang === 'uz' ? 'Asboblar' : 'Tools'}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {getTools().map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckSquare size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            </div>
          </div>

          {/* Detailed Recipe */}
          <div className="my-16">
            <ScrollReveal>
              <Card className="bg-gradient-to-br from-primary-50 to-cyan-50 border-primary-200">
                <div className="flex items-start space-x-4 mb-4">
                  <TestTube className="text-primary-500 flex-shrink-0" size={40} />
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-2">{(bioinks.detailedRecipe[currentLang] || bioinks.detailedRecipe.ru).title}</h2>
                    <p className="text-gray-700">{(bioinks.detailedRecipe[currentLang] || bioinks.detailedRecipe.ru).description}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {currentLang === 'ru' ? 'Состав:' : currentLang === 'uz' ? 'Tarkibi:' : 'Composition:'}
                  </h3>
                  <ul className="space-y-2">
                    {(bioinks.detailedRecipe[currentLang] || bioinks.detailedRecipe.ru).composition.map((item, index) => (
                      <li key={index} className="text-gray-700 flex items-start space-x-2">
                        <span className="text-primary-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  {(bioinks.detailedRecipe[currentLang] || bioinks.detailedRecipe.ru).steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 text-gray-700">
                      <Badge variant="primary" className="flex-shrink-0">{index + 1}</Badge>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* Hardening Solution */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {(bioinks.hardeningSolution[currentLang] || bioinks.hardeningSolution.ru).title}
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              {(bioinks.hardeningSolution[currentLang] || bioinks.hardeningSolution.ru).description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(bioinks.hardeningSolution[currentLang] || bioinks.hardeningSolution.ru).variants.map((variant, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card>
                    <h3 className="font-display font-bold text-lg mb-3">{variant.name}</h3>
                    <ul className="space-y-2">
                      {variant.recipe.map((item, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start space-x-2">
                          <Droplet size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.2}>
              <Notice type="info" className="mt-6">
                <strong>{currentLang === 'ru' ? 'Как использовать:' : currentLang === 'uz' ? 'Qanday ishlatiladi:' : 'How to use:'}</strong> {(bioinks.hardeningSolution[currentLang] || bioinks.hardeningSolution.ru).usage}
              </Notice>
            </ScrollReveal>
          </div>

          {/* Printing Guide */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Как печатать' : currentLang === 'uz' ? 'Qanday bosib chiqarish' : 'How to Print'}
            </h2>
            <ScrollReveal>
              <Card>
                <ul className="space-y-3">
                  {(bioinks.printingGuide[currentLang] || bioinks.printingGuide.ru).map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Badge variant="secondary">{index + 1}</Badge>
                      <span className="text-gray-700 flex-1">{step}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          </div>

          {/* Viscosity Tuning */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Тонкая настройка вязкости' : currentLang === 'uz' ? 'Qovushqoqlikni sozlash' : 'Viscosity Tuning'}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {currentLang === 'ru' ? 'Очень важно для насоса' : currentLang === 'uz' ? 'Nasos uchun juda muhim' : 'Very important for the pump'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(bioinks.viscosityTuning[currentLang] || bioinks.viscosityTuning.ru).map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <Card>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="text-cyan-500 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.issue}</h3>
                        <p className="text-sm text-gray-600">{item.fix}</p>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Reinforced Version */}
          <div className="my-16">
            <ScrollReveal>
              <Card className="bg-gradient-to-br from-green-50 to-cyan-50 border-green-200">
                <div className="flex items-start space-x-4 mb-4">
                  <Beaker className="text-green-500 flex-shrink-0" size={32} />
                  <h2 className="text-2xl font-display font-bold">
                    {currentLang === 'ru' ? 'Укреплённая версия (опционально)' : currentLang === 'uz' ? 'Mustahkamlangan versiya (ixtiyoriy)' : 'Reinforced Version (Optional)'}
                  </h2>
                </div>
                <h3 className="text-lg font-semibold mb-3">{bioinks.reinforcedVersion[currentLang]?.title || bioinks.reinforcedVersion.ru.title}</h3>
                <ul className="space-y-2 mb-4">
                  {bioinks.reinforcedVersion[currentLang]?.composition.map((item: string, index: number) => (
                    <li key={index} className="text-gray-700 flex items-start space-x-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Notice type="success">
                  {bioinks.reinforcedVersion[currentLang]?.note || bioinks.reinforcedVersion.ru.note}
                </Notice>
              </Card>
            </ScrollReveal>
          </div>

          {/* Safety Reminder */}
          <div className="my-16">
            <ScrollReveal>
              <Card className="bg-yellow-50 border-yellow-200">
                <h2 className="text-2xl font-display font-bold mb-4 text-yellow-900">
                  {currentLang === 'ru' ? 'Безопасность' : currentLang === 'uz' ? 'Xavfsizlik' : 'Safety'}
                </h2>
                <ul className="space-y-2">
                  {(bioinks.safetyReminder[currentLang] || bioinks.safetyReminder.ru).map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-yellow-900">
                      <span className="text-yellow-600 font-bold">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          </div>

          {/* Checklist */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Быстрый чек-лист' : currentLang === 'uz' ? 'Tezkor tekshirish ro\'yxati' : 'Quick Checklist'}
            </h2>
            <ScrollReveal>
              <Card className="bg-gradient-to-br from-primary-50 to-cyan-50">
                <ul className="space-y-3">
                  {(bioinks.checklist[currentLang] || bioinks.checklist.ru).map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-md border-2 border-primary-500 flex items-center justify-center flex-shrink-0">
                        <CheckSquare size={16} className="text-primary-500" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          </div>

          {/* Troubleshooting */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Решение проблем' : currentLang === 'uz' ? 'Muammolarni hal qilish' : 'Troubleshooting'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(bioinks.troubleshooting[currentLang] || bioinks.troubleshooting.ru).map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.issue}</h3>
                        <p className="text-sm text-gray-600">{item.fix}</p>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

