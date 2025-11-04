import { useParams } from 'react-router-dom'
import { Code, FileCode, Github } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import ScrollReveal from '../components/ui/ScrollReveal'
import SEO from '../components/SEO'
import { education } from '../content/data'

export default function OpenSource() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Open Source' : currentLang === 'uz' ? 'Open Source' : 'Open Source'}
        description={currentLang === 'ru' ? 'Открытые материалы: G-code примеры, схемы, документация для DIY биопринтера' : currentLang === 'uz' ? 'Ochiq materiallar: G-code namunalari, sxemalar, DIY bioprinter uchun hujjatlar' : 'Open materials: G-code examples, schematics, documentation for DIY bioprinter'}
        keywords="open source, G-code, DIY, биопринтер, схемы, документация"
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            title={currentLang === 'ru' ? 'Open Source' : currentLang === 'uz' ? 'Open Source' : 'Open Source'}
            subtitle={currentLang === 'ru' ? 'Открытые материалы для DIY-сборки и экспериментов' : currentLang === 'uz' ? 'DIY yig\'ish va tajribalar uchun ochiq materiallar' : 'Open materials for DIY assembly and experiments'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <ScrollReveal>
              <Card className="h-full">
                <div className="flex items-start space-x-4 mb-4">
                  <Code className="text-primary-500 flex-shrink-0" size={32} />
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">
                      {currentLang === 'ru' ? 'Примеры G-code' : currentLang === 'uz' ? 'G-code namunalari' : 'G-code Examples'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {currentLang === 'ru' ? 'Минимальный пример для печати простых форм' : currentLang === 'uz' ? 'Oddiy shakllarni bosib chiqarish uchun minimal namuna' : 'Minimal example for printing simple shapes'}
                    </p>
                  </div>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                  <code>{education.labs.gcodeDemo}</code>
                </pre>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="h-full">
                <div className="flex items-start space-x-4">
                  <FileCode className="text-cyan-500 flex-shrink-0" size={32} />
                  <div>
                    <h3 className="text-xl font-display font-bold mb-3">
                      {currentLang === 'ru' ? 'DIY Концепция' : currentLang === 'uz' ? 'DIY Konsepsiyasi' : 'DIY Concept'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {currentLang === 'ru' ? 'Базовые узлы шприцевого экструдера:' : currentLang === 'uz' ? 'Shprits ekstruderining asosiy qismlari:' : 'Basic syringe extruder components:'}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• {currentLang === 'ru' ? 'Держатель шприца (10–20 мл)' : currentLang === 'uz' ? 'Shprits ushlagich (10–20 ml)' : 'Syringe holder (10–20 ml)'}</li>
                      <li>• {currentLang === 'ru' ? 'Привод поршня (степпер/серво)' : currentLang === 'uz' ? 'Porshen haydovchisi (stepper/servo)' : 'Plunger drive (stepper/servo)'}</li>
                      <li>• {currentLang === 'ru' ? 'Крепление на каретку X/Y' : currentLang === 'uz' ? 'X/Y aravachaga mahkamlash' : 'X/Y carriage mount'}</li>
                      <li>• {currentLang === 'ru' ? 'Сопла 18–21G (Luer-Lock)' : currentLang === 'uz' ? 'Nozullar 18–21G (Luer-Lock)' : 'Nozzles 18–21G (Luer-Lock)'}</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <Card className="mt-8 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="flex items-start space-x-4">
                <Github className="text-gray-700 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'Лицензия' : currentLang === 'uz' ? 'Litsenziya' : 'License'}
                  </h3>
                  <p className="text-gray-600">
                    {currentLang === 'ru' ? 'Открытый учебный контент. Код примеров может быть использован в образовательных целях.' : currentLang === 'uz' ? 'Ochiq o\'quv kontenti. Namuna kodi ta\'lim maqsadlarida ishlatilishi mumkin.' : 'Open educational content. Example code may be used for educational purposes.'}
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

