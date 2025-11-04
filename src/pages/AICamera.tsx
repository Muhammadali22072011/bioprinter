import { useParams } from 'react-router-dom'
import { Camera, Zap, Target, Eye } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import SEO from '../components/SEO'
import AICameraSection from '../components/AICameraSection'

export default function AICamera() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'

  const content = {
    ru: {
      title: 'AI Камера',
      subtitle: 'Интеллектуальное распознавание области печати биопринтера',
      description: 'Используйте искусственный интеллект для автоматического определения рабочей области биопринтера в режиме реального времени.',
      seoDescription: 'AI камера для распознавания области печати биопринтера. Автоматическое определение рабочей зоны с помощью компьютерного зрения.',
      features: [
        {
          icon: Camera,
          title: 'Распознавание в реальном времени',
          description: 'Камера анализирует изображение в режиме реального времени и определяет положение биопринтера',
        },
        {
          icon: Target,
          title: 'Определение области печати',
          description: 'Автоматическое выделение рабочей области с точными координатами и размерами',
        },
        {
          icon: Eye,
          title: 'Анализ качества',
          description: 'Проверка освещения, четкости и правильности расположения оборудования',
        },
        {
          icon: Zap,
          title: 'Быстрая обработка',
          description: 'Мгновенный анализ кадров с использованием эффективных алгоритмов компьютерного зрения',
        },
      ],
      howItWorks: 'Как это работает',
      steps: [
        {
          number: '01',
          title: 'Запуск камеры',
          description: 'Нажмите кнопку "Запустить камеру" и предоставьте доступ к камере устройства',
        },
        {
          number: '02',
          title: 'Наведение на принтер',
          description: 'Направьте камеру на биопринтер так, чтобы рабочая область была в кадре',
        },
        {
          number: '03',
          title: 'Автоматическое распознавание',
          description: 'Алгоритм автоматически обнаружит принтер и выделит область печати зеленой рамкой',
        },
        {
          number: '04',
          title: 'Получение данных',
          description: 'Просмотрите координаты и размеры области печати для дальнейшего использования',
        },
      ],
    },
    uz: {
      title: 'AI Kamera',
      subtitle: 'Bioprinterning bosib chiqarish maydonini intellektual aniqlash',
      description: 'Real vaqt rejimida bioprinterning ish maydonini avtomatik aniqlash uchun sun\'iy intellektdan foydalaning.',
      seoDescription: 'Bioprinterning bosib chiqarish maydonini aniqlash uchun AI kamera. Kompyuter ko\'rish yordamida ish zonasini avtomatik aniqlash.',
      features: [
        {
          icon: Camera,
          title: 'Real vaqtda aniqlash',
          description: 'Kamera tasvirni real vaqt rejimida tahlil qiladi va bioprinter joylashuvini aniqlaydi',
        },
        {
          icon: Target,
          title: 'Bosib chiqarish maydonini aniqlash',
          description: 'Aniq koordinatalar va o\'lchamlar bilan ish maydonini avtomatik belgilash',
        },
        {
          icon: Eye,
          title: 'Sifat tahlili',
          description: 'Yoritilish, aniqlik va uskunaning to\'g\'ri joylashuvini tekshirish',
        },
        {
          icon: Zap,
          title: 'Tez ishlov berish',
          description: 'Samarali kompyuter ko\'rish algoritmlaridan foydalangan holda kadrlarni bir zumda tahlil qilish',
        },
      ],
      howItWorks: 'Bu qanday ishlaydi',
      steps: [
        {
          number: '01',
          title: 'Kamerani ishga tushirish',
          description: '"Kamerani yoqish" tugmasini bosing va qurilma kamerasiga ruxsat bering',
        },
        {
          number: '02',
          title: 'Printerga yo\'naltirish',
          description: 'Kamerani bioprinterga yo\'naltirib, ish maydoni kadrda bo\'lishiga ishonch hosil qiling',
        },
        {
          number: '03',
          title: 'Avtomatik aniqlash',
          description: 'Algoritm avtomatik ravishda printerni topadi va bosib chiqarish maydonini yashil ramka bilan belgilaydi',
        },
        {
          number: '04',
          title: 'Ma\'lumotlarni olish',
          description: 'Keyingi foydalanish uchun bosib chiqarish maydonining koordinatalari va o\'lchamlarini ko\'ring',
        },
      ],
    },
    en: {
      title: 'AI Camera',
      subtitle: 'Intelligent bioprinter print area recognition',
      description: 'Use artificial intelligence to automatically detect the bioprinter working area in real-time.',
      seoDescription: 'AI camera for bioprinter print area recognition. Automatic work zone detection using computer vision.',
      features: [
        {
          icon: Camera,
          title: 'Real-time Recognition',
          description: 'Camera analyzes images in real-time and detects bioprinter position',
        },
        {
          icon: Target,
          title: 'Print Area Detection',
          description: 'Automatic highlighting of working area with precise coordinates and dimensions',
        },
        {
          icon: Eye,
          title: 'Quality Analysis',
          description: 'Checking lighting, clarity and correct equipment placement',
        },
        {
          icon: Zap,
          title: 'Fast Processing',
          description: 'Instant frame analysis using efficient computer vision algorithms',
        },
      ],
      howItWorks: 'How it works',
      steps: [
        {
          number: '01',
          title: 'Start Camera',
          description: 'Click "Start Camera" button and grant access to device camera',
        },
        {
          number: '02',
          title: 'Point at Printer',
          description: 'Direct the camera at the bioprinter so that the work area is in frame',
        },
        {
          number: '03',
          title: 'Automatic Recognition',
          description: 'Algorithm automatically detects the printer and highlights the print area with a green frame',
        },
        {
          number: '04',
          title: 'Get Data',
          description: 'View coordinates and dimensions of the print area for further use',
        },
      ],
    },
  }

  const t = content[currentLang]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t.title,
    "description": t.seoDescription,
  }

  return (
    <>
      <SEO
        title={t.title}
        description={t.seoDescription}
        keywords="AI camera, компьютерное зрение, распознавание, bioprinter detection, computer vision"
        ogType="website"
        schemaData={schemaData}
      />

      <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 py-16 md:py-24">
        <div className="container">
          {/* Header */}
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge variant="primary" className="mb-4">
                <Camera className="inline mr-2" size={16} />
                {currentLang === 'ru' ? 'Технология' : currentLang === 'uz' ? 'Texnologiya' : 'Technology'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {t.subtitle}
              </p>
              <p className="text-lg text-gray-500">
                {t.description}
              </p>
            </div>
          </ScrollReveal>

          {/* Features Grid */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {t.features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full mb-4">
                      <feature.icon className="text-blue-600" size={32} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          {/* AI Camera Component */}
          <ScrollReveal delay={0.2}>
            <AICameraSection lang={currentLang} />
          </ScrollReveal>

          {/* How it works */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16">
              <h2 className="text-3xl font-display font-bold text-center mb-12 text-gray-900">
                {t.howItWorks}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                    {index < t.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 -z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Technical Info */}
          <ScrollReveal delay={0.4}>
            <Card className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 border-blue-200">
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">
                  {currentLang === 'ru' 
                    ? 'Технические особенности' 
                    : currentLang === 'uz' 
                    ? 'Texnik xususiyatlar' 
                    : 'Technical Features'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">WebRTC</div>
                    <p className="text-sm text-gray-600">
                      {currentLang === 'ru' 
                        ? 'Доступ к камере устройства' 
                        : currentLang === 'uz' 
                        ? 'Qurilma kamerasiga kirish' 
                        : 'Device camera access'}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">Canvas API</div>
                    <p className="text-sm text-gray-600">
                      {currentLang === 'ru' 
                        ? 'Обработка изображений' 
                        : currentLang === 'uz' 
                        ? 'Tasvirlarni qayta ishlash' 
                        : 'Image processing'}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">Edge Detection</div>
                    <p className="text-sm text-gray-600">
                      {currentLang === 'ru' 
                        ? 'Алгоритм распознавания' 
                        : currentLang === 'uz' 
                        ? 'Aniqlash algoritmi' 
                        : 'Recognition algorithm'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

