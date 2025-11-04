import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, BookOpen, Globe, Zap, Microscope } from 'lucide-react'
import HeroBlob from '../components/HeroBlob'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import ScrollReveal from '../components/ui/ScrollReveal'
import SEO from '../components/SEO'
import VideoGallery from '../components/VideoGallery'
import { home, disclaimers } from '../content/data'
import BioprinterHero from '../components/BioprinterHero'

export default function Home() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'
  const content = home[currentLang]

  const features = [
    {
      icon: <Shield className="text-primary-500" size={32} />,
      title: currentLang === 'ru' ? 'Безопасно для школы' : currentLang === 'uz' ? 'Maktab uchun xavfsiz' : 'Safe for Schools',
      description: currentLang === 'ru' ? 'Только пищевые реагенты без живых клеток' : currentLang === 'uz' ? 'Faqat oziq-ovqat reagentlari, tirik hujayralar yo\'q' : 'Only food-grade reagents, no live cells',
    },
    {
      icon: <BookOpen className="text-cyan-500" size={32} />,
      title: currentLang === 'ru' ? 'Готовые материалы' : currentLang === 'uz' ? 'Tayyor materiallar' : 'Ready Materials',
      description: currentLang === 'ru' ? 'Рецепты, инструкции, программы занятий' : currentLang === 'uz' ? 'Retseptlar, qo\'llanmalar, dars dasturlari' : 'Recipes, guides, lesson programs',
    },
    {
      icon: <Globe className="text-green-500" size={32} />,
      title: 'RU • UZ • EN',
      description: currentLang === 'ru' ? 'Полная локализация контента' : currentLang === 'uz' ? 'Kontent to\'liq lokalizatsiyalangan' : 'Fully localized content',
    },
  ]

  const howItWorks = [
    {
      step: 1,
      title: currentLang === 'ru' ? 'Подготовка геля' : currentLang === 'uz' ? 'Jelni tayyorlash' : 'Gel Preparation',
      description: currentLang === 'ru' ? 'Смешайте альгинат/желатин с водой и глицерином' : currentLang === 'uz' ? 'Alginat/jelatin, suv va glitserin aralashtiriladi' : 'Mix alginate/gelatin with water and glycerin',
    },
    {
      step: 2,
      title: currentLang === 'ru' ? 'Печать' : currentLang === 'uz' ? 'Bosib chiqarish' : 'Printing',
      description: currentLang === 'ru' ? 'Загрузите гель в шприц и печатайте на принтере' : currentLang === 'uz' ? 'Jelni shpritsga yuklang va bosib chiqaring' : 'Load gel into syringe and print',
    },
    {
      step: 3,
      title: currentLang === 'ru' ? 'Отверждение' : currentLang === 'uz' ? 'Qattiqlash' : 'Curing',
      description: currentLang === 'ru' ? 'Погрузите в CaCl₂ для закрепления формы' : currentLang === 'uz' ? 'Shaklni mustahkamlash uchun CaCl₂ ga botiriladi' : 'Immerse in CaCl₂ to set the shape',
    },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BIOPRINTER",
    "description": disclaimers[currentLang],
    "url": typeof window !== 'undefined' ? window.location.origin : '',
  }

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Главная' : currentLang === 'uz' ? 'Bosh sahifa' : 'Home'}
        description={disclaimers[currentLang]}
        keywords="биопринтер, bioprinter, учебный биопринтер, образование, гидрогель, hydrogel, биопечать"
        schemaData={schemaData}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20">
        <HeroBlob />
        
        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="success">{t('common.educationOnly')}</Badge>
              <Badge variant="warning">{t('common.noLiveCells')}</Badge>
              <Badge variant="primary">{t('common.safeReagents')}</Badge>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary-600 via-cyan-500 to-primary-600 bg-clip-text text-transparent">
              {content.heroTitle}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {content.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`/${lang}/product`}
                className="btn-primary group"
              >
                {content.ctaPrimary}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to={`/${lang}/bioinks`}
                className="btn-outline"
              >
                {content.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-gray-50">
        <div className="container">
          <SectionHeader
            title={currentLang === 'ru' ? 'Почему BIOPRINTER?' : currentLang === 'uz' ? 'Nega BIOPRINTER?' : 'Why BIOPRINTER?'}
            subtitle={currentLang === 'ru' ? 'Идеальное решение для образовательных учреждений' : currentLang === 'uz' ? 'Ta\'lim muassasalari uchun ideal yechim' : 'Perfect solution for educational institutions'}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bioprinter Hero Section */}
      <BioprinterHero lang={currentLang} />

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title={currentLang === 'ru' ? 'Как это работает' : currentLang === 'uz' ? 'Bu qanday ishlaydi' : 'How It Works'}
            subtitle={currentLang === 'ru' ? '3 простых шага к биопечати' : currentLang === 'uz' ? 'Biosiyoh bosib chiqarishning 3 ta oddiy qadami' : '3 simple steps to bioprinting'}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <Card className="relative h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-display font-bold mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <VideoGallery lang={currentLang} />

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-50 to-cyan-50">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Microscope className="mx-auto mb-6 text-primary-500" size={48} />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-900">
              {currentLang === 'ru' ? 'Готовы начать?' : currentLang === 'uz' ? 'Boshlashga tayyormisiz?' : 'Ready to Start?'}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {currentLang === 'ru' 
                ? 'Изучите материалы для учителей и начните биопринтинг в вашей школе'
                : currentLang === 'uz'
                ? 'O\'qituvchilar uchun materiallarni o\'rganing va maktabingizda biosiyoh bosib chiqarishni boshlang'
                : 'Explore teacher materials and start bioprinting in your school'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/${lang}/education`} className="btn-primary">
                <BookOpen size={20} />
                <span className="ml-2">{t('cta.teacherGuide')}</span>
              </Link>
              <Link to={`/${lang}/shop-uz`} className="btn-secondary">
                <Zap size={20} />
                <span className="ml-2">{t('nav.shopUz')}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

