import { useParams } from 'react-router-dom'
import { GraduationCap, Code } from 'lucide-react'
import SectionHeader from '../../components/ui/SectionHeader'
import Card from '../../components/ui/Card'
import ScrollReveal from '../../components/ui/ScrollReveal'
import Badge from '../../components/ui/Badge'
import SEO from '../../components/SEO'
import { education, disclaimers } from '../../content/data'

export default function Labs() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Программа лабораторий' : currentLang === 'uz' ? 'Laboratoriya dasturi' : 'Lab Program'}
        description={disclaimers[currentLang]}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container max-w-5xl">
          <SectionHeader
            title={currentLang === 'ru' ? 'Программа лабораторий' : currentLang === 'uz' ? 'Laboratoriya dasturi' : 'Laboratory Program'}
            subtitle={education.labs.course}
          />

          {/* Sessions */}
          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.labs.sessions.map((session, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="primary">
                      {currentLang === 'ru' ? 'Занятие' : currentLang === 'uz' ? 'Dars' : 'Session'} {index + 1}
                    </Badge>
                    <GraduationCap className="text-primary-400" size={24} />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 text-gray-900">
                    {session.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>{currentLang === 'ru' ? 'Результат:' : currentLang === 'uz' ? 'Natija:' : 'Result:'}</strong> {session.result}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* G-code Demo */}
          <ScrollReveal delay={0.4}>
            <Card>
              <div className="flex items-start space-x-4 mb-4">
                <Code className="text-cyan-500 flex-shrink-0" size={32} />
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold mb-2">
                    {currentLang === 'ru' ? 'Пример G-code для демонстрации' : currentLang === 'uz' ? 'Namoyish uchun G-code namunasi' : 'G-code Example for Demonstration'}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {currentLang === 'ru' ? 'Минимальный пример для печати квадрата' : currentLang === 'uz' ? 'Kvadrat bosib chiqarish uchun minimal namuna' : 'Minimal example for printing a square'}
                  </p>
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{education.labs.gcodeDemo}</code>
              </pre>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

