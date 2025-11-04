import { useParams } from 'react-router-dom'
import { Mail, MessageCircle, Phone, Send, User, MapPin } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import ScrollReveal from '../components/ui/ScrollReveal'
import SEO from '../components/SEO'
import { contacts } from '../content/data'

export default function Contact() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  const getName = (person: typeof contacts.team[0]) => {
    if (currentLang === 'uz') return person.nameUz
    if (currentLang === 'en') return person.nameEn
    return person.name
  }

  const getRole = (person: typeof contacts.team[0]) => {
    if (currentLang === 'uz') return person.roleUz
    if (currentLang === 'en') return person.roleEn
    return person.role
  }

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Контакты' : currentLang === 'uz' ? 'Aloqa' : 'Contact'}
        description={currentLang === 'ru' ? 'Свяжитесь с командой edubioprinter.uz' : currentLang === 'uz' ? 'edubioprinter.uz jamoasi bilan bog\'laning' : 'Contact edubioprinter.uz team'}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container max-w-6xl">
          <SectionHeader
            title={currentLang === 'ru' ? 'Свяжитесь с нами' : currentLang === 'uz' ? 'Biz bilan bog\'laning' : 'Contact Us'}
            subtitle={currentLang === 'ru' ? 'Команда edubioprinter.uz готова ответить на ваши вопросы' : currentLang === 'uz' ? 'edubioprinter.uz jamoasi sizning savollaringizga javob berishga tayyor' : 'edubioprinter.uz team is ready to answer your questions'}
          />

          {/* Team Members */}
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Наша команда' : currentLang === 'uz' ? 'Bizning jamoa' : 'Our Team'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contacts.team.map((person, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-200">
                    <div className="flex items-start space-x-4">
                      <div className="p-4 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex-shrink-0">
                        <User className="text-white" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                          {getName(person)}
                        </h3>
                        <p className="text-sm text-primary-600 font-medium mb-4">
                          {getRole(person)}
                        </p>
                        
                        <div className="space-y-3">
                          <a 
                            href={`tel:${person.phone}`}
                            className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors group"
                          >
                            <Phone size={18} className="text-gray-400 group-hover:text-primary-500" />
                            <span className="font-medium">{person.phoneDisplay}</span>
                          </a>
                          
                          {person.telegram && (
                            <a 
                              href={`https://t.me/${person.telegram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-3 text-gray-700 hover:text-cyan-600 transition-colors group"
                            >
                              <Send size={18} className="text-gray-400 group-hover:text-cyan-500" />
                              <span className="font-medium">{person.telegram}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal>
              <Card className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary-50 to-cyan-50 rounded-full">
                    <Mail className="text-primary-500" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Email</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {currentLang === 'ru' ? 'Напишите нам на' : currentLang === 'uz' ? 'Bizga yozing' : 'Write to us at'}
                </p>
                <a href={`mailto:${contacts.email}`} className="text-primary-600 hover:text-primary-700 font-medium block mb-2">
                  {contacts.email}
                </a>
                <a href={`mailto:${contacts.support}`} className="text-primary-600 hover:text-primary-700 font-medium block text-sm">
                  {contacts.support}
                </a>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-primary-50 rounded-full">
                    <MapPin className="text-cyan-500" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">
                  {currentLang === 'ru' ? 'Адрес' : currentLang === 'uz' ? 'Manzil' : 'Address'}
                </h3>
                <p className="text-gray-700 font-medium">
                  {currentLang === 'ru' ? contacts.address.ru : currentLang === 'uz' ? contacts.address.uz : contacts.address.en}
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-cyan-50 rounded-full">
                    <MessageCircle className="text-green-500" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">
                  {currentLang === 'ru' ? 'Обратная связь' : currentLang === 'uz' ? 'Fikr-mulohaza' : 'Feedback'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {currentLang === 'ru' ? 'Ваши вопросы и предложения помогают нам улучшаться' : currentLang === 'uz' ? 'Sizning savollaringiz va takliflaringiz bizga yaxshilanishga yordam beradi' : 'Your questions and suggestions help us improve'}
                </p>
              </Card>
            </ScrollReveal>
          </div>

          {/* Website Info */}
          <ScrollReveal>
            <Card className="mt-12 bg-gradient-to-br from-primary-50 to-cyan-50 border-primary-200 text-center">
              <h3 className="text-2xl font-display font-bold mb-2 text-gray-900">
                {contacts.website.name}
              </h3>
              <p className="text-primary-600 font-medium text-lg">
                {contacts.website.domain}
              </p>
              <p className="text-gray-600 mt-4 text-sm">
                {currentLang === 'ru' ? 'Учебный биопринтер для безопасной печати гидрогелями' : currentLang === 'uz' ? 'Gidrojellar bilan xavfsiz bosib chiqarish uchun o\'quv bioprinter' : 'Educational bioprinter for safe hydrogel printing'}
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

