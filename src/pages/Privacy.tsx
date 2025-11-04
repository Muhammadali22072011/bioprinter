import { useParams } from 'react-router-dom'
import { Shield } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import SEO from '../components/SEO'
import { disclaimers } from '../content/data'

export default function Privacy() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Политика конфиденциальности' : currentLang === 'uz' ? 'Maxfiylik siyosati' : 'Privacy Policy'}
        description={disclaimers[currentLang]}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <SectionHeader
            title={currentLang === 'ru' ? 'Политика конфиденциальности' : currentLang === 'uz' ? 'Maxfiylik siyosati' : 'Privacy Policy'}
            subtitle={currentLang === 'ru' ? 'Информация о защите данных' : currentLang === 'uz' ? 'Ma\'lumotlarni himoya qilish haqida ma\'lumot' : 'Information about data protection'}
          />

          <Card className="mt-12">
            <div className="flex items-start space-x-4 mb-6">
              <Shield className="text-primary-500 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-display font-bold mb-2">
                  {currentLang === 'ru' ? 'Образовательный проект' : currentLang === 'uz' ? 'Ta\'lim loyihasi' : 'Educational Project'}
                </h3>
                <p className="text-gray-700">
                  {disclaimers[currentLang]}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                {currentLang === 'ru' 
                  ? 'Данный сайт представляет образовательный проект и не собирает персональные данные пользователей.'
                  : currentLang === 'uz'
                  ? 'Ushbu sayt ta\'lim loyihasini taqdim etadi va foydalanuvchilarning shaxsiy ma\'lumotlarini to\'plamaydi.'
                  : 'This website represents an educational project and does not collect personal data from users.'}
              </p>
              <p>
                {currentLang === 'ru'
                  ? 'Все материалы и рецепты предназначены исключительно для образовательных целей.'
                  : currentLang === 'uz'
                  ? 'Barcha materiallar va retseptlar faqat ta\'lim maqsadlari uchun mo\'ljallangan.'
                  : 'All materials and recipes are intended solely for educational purposes.'}
              </p>
              <p>
                {currentLang === 'ru'
                  ? 'Внешние ссылки на магазины приведены для удобства и не являются рекламой.'
                  : currentLang === 'uz'
                  ? 'Do\'konlarga tashqi havolalar qulaylik uchun berilgan va reklama emas.'
                  : 'External links to stores are provided for convenience and are not advertisements.'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

