import { useParams } from 'react-router-dom'
import { Target, Calendar, Shield, Package, Award } from 'lucide-react'
import SectionHeader from '../../components/ui/SectionHeader'
import Card from '../../components/ui/Card'
import ScrollReveal from '../../components/ui/ScrollReveal'
import Notice from '../../components/ui/Notice'
import SEO from '../../components/SEO'
import { education, disclaimers } from '../../content/data'

export default function TeacherGuide() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Инструкция учителю' : currentLang === 'uz' ? 'O\'qituvchi uchun qo\'llanma' : 'Teacher\'s Guide'}
        description={disclaimers[currentLang]}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container max-w-5xl">
          <SectionHeader
            title={currentLang === 'ru' ? 'Инструкция учителю' : currentLang === 'uz' ? 'O\'qituvchi uchun qo\'llanma' : 'Teacher\'s Guide'}
            subtitle={currentLang === 'ru' ? 'Полное руководство по проведению занятий' : currentLang === 'uz' ? 'Darslarni o\'tkazish bo\'yicha to\'liq qo\'llanma' : 'Complete guide for conducting lessons'}
          />

          {/* UZ Short Version */}
          {currentLang === 'uz' && (
            <ScrollReveal>
              <Notice type="info">
                {education.uz_short}
              </Notice>
            </ScrollReveal>
          )}

          {/* Goals */}
          <ScrollReveal>
            <Card className="my-8">
              <div className="flex items-start space-x-4">
                <Target className="text-primary-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'Цели занятия' : currentLang === 'uz' ? 'Dars maqsadlari' : 'Lesson Goals'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {education.teacherGuide.goals.map((goal, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary-500 font-bold">•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Plan */}
          <ScrollReveal delay={0.1}>
            <Card className="my-8">
              <div className="flex items-start space-x-4">
                <Calendar className="text-cyan-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'План занятия' : currentLang === 'uz' ? 'Dars rejasi' : 'Lesson Plan'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {education.teacherGuide.plan.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-cyan-500 font-bold">{index + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Safety */}
          <ScrollReveal delay={0.2}>
            <Card className="my-8 bg-yellow-50 border-yellow-200">
              <div className="flex items-start space-x-4">
                <Shield className="text-yellow-600 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-display font-bold mb-3 text-yellow-900">
                    {currentLang === 'ru' ? 'Техника безопасности' : currentLang === 'uz' ? 'Xavfsizlik texnikasi' : 'Safety Instructions'}
                  </h3>
                  <ul className="space-y-2 text-yellow-900">
                    {education.teacherGuide.safety.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-600 font-bold">⚠</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Materials */}
          <ScrollReveal delay={0.3}>
            <Card className="my-8">
              <div className="flex items-start space-x-4">
                <Package className="text-green-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'Необходимые материалы' : currentLang === 'uz' ? 'Kerakli materiallar' : 'Required Materials'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {education.teacherGuide.materials.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Rubric */}
          <ScrollReveal delay={0.4}>
            <Card className="my-8">
              <div className="flex items-start space-x-4">
                <Award className="text-purple-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'Критерии оценивания' : currentLang === 'uz' ? 'Baholash mezonlari' : 'Assessment Criteria'}
                  </h3>
                  <p className="text-gray-700">{education.teacherGuide.rubric}</p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

