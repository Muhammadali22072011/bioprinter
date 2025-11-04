import { Link, useParams } from 'react-router-dom'
import { BookOpen, FileText, GraduationCap, ArrowRight } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import ScrollReveal from '../components/ui/ScrollReveal'
import SEO from '../components/SEO'
import { disclaimers } from '../content/data'

export default function Education() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  const sections = [
    {
      icon: <BookOpen className="text-primary-500" size={40} />,
      title: currentLang === 'ru' ? 'Инструкция учителю' : currentLang === 'uz' ? 'O\'qituvchi uchun qo\'llanma' : 'Teacher\'s Guide',
      description: currentLang === 'ru' ? 'Цели, план занятия, ТБ, рецепты на урок' : currentLang === 'uz' ? 'Maqsadlar, dars rejasi, xavfsizlik, dars uchun retseptlar' : 'Goals, lesson plan, safety, recipes for lessons',
      link: 'teacher-guide'
    },
    {
      icon: <FileText className="text-cyan-500" size={40} />,
      title: currentLang === 'ru' ? 'Паспорт устройства' : currentLang === 'uz' ? 'Qurilma pasporti' : 'Device Passport',
      description: currentLang === 'ru' ? 'Технические характеристики, приёмка, обслуживание' : currentLang === 'uz' ? 'Texnik xususiyatlar, qabul qilish, xizmat ko\'rsatish' : 'Technical specs, acceptance, maintenance',
      link: 'passport'
    },
    {
      icon: <GraduationCap className="text-green-500" size={40} />,
      title: currentLang === 'ru' ? 'Программа лабораторий' : currentLang === 'uz' ? 'Laboratoriya dasturi' : 'Lab Program',
      description: currentLang === 'ru' ? '4 занятия × 45–60 мин, оценивание, проекты' : currentLang === 'uz' ? '4 ta dars × 45–60 daq, baholash, loyihalar' : '4 sessions × 45–60 min, assessment, projects',
      link: 'labs'
    }
  ]

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Образование' : currentLang === 'uz' ? 'Ta\'lim' : 'Education'}
        description={disclaimers[currentLang]}
        keywords="образование, учителям, биопринтинг, уроки, лаборатории"
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            title={currentLang === 'ru' ? 'Материалы для учителей' : currentLang === 'uz' ? 'O\'qituvchilar uchun materiallar' : 'Materials for Teachers'}
            subtitle={currentLang === 'ru' ? 'Всё необходимое для проведения занятий по биопринтингу' : currentLang === 'uz' ? 'Biosiyoh bosib chiqarish darslarini o\'tkazish uchun kerakli hamma narsa' : 'Everything you need to conduct bioprinting lessons'}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {sections.map((section, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link to={`/${lang}/education/${section.link}`}>
                  <Card className="h-full group">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <h3 className="text-xl font-display font-bold mb-3 text-gray-900">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1">
                        {section.description}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                        <span>{currentLang === 'ru' ? 'Открыть' : currentLang === 'uz' ? 'Ochish' : 'Open'}</span>
                        <ArrowRight size={20} className="ml-2" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

