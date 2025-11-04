import { useParams } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import AIBlock from '../components/AIBlock'
import ScrollReveal from '../components/ui/ScrollReveal'
import SEO from '../components/SEO'
import { aiModule } from '../content/data'

export default function AiQa() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'AI-контроль' : currentLang === 'uz' ? 'AI-nazorat' : 'AI Control'}
        description={currentLang === 'ru' ? 'AI-модуль визуального контроля качества печати для учебного биопринтера' : currentLang === 'uz' ? 'O\'quv bioprinter uchun bosib chiqarish sifatini vizual nazorat qilish AI-moduli' : 'AI visual quality control module for educational bioprinter'}
        keywords="AI, компьютерное зрение, OpenCV, TensorFlow Lite, контроль качества"
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            title={currentLang === 'ru' ? 'AI-модуль контроля печати' : currentLang === 'uz' ? 'Bosib chiqarishni nazorat qilish AI-moduli' : 'AI Print Control Module'}
            subtitle={currentLang === 'ru' ? 'Экспериментальная система визуального наблюдения за процессом печати' : currentLang === 'uz' ? 'Bosib chiqarish jarayonini vizual kuzatish eksperimental tizimi' : 'Experimental visual monitoring system for the printing process'}
          />

          <ScrollReveal>
            <div className="my-12">
              <AIBlock steps={aiModule.idea} notes={aiModule.notes} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

