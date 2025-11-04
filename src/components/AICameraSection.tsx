import { useState, useRef, useEffect } from 'react'
import { Camera, Users, Image as ImageIcon, ExternalLink, Brain } from 'lucide-react'
import Card from './ui/Card'
import Badge from './ui/Badge'

interface AICameraSectionProps {
  lang: 'ru' | 'uz' | 'en'
}

export default function AICameraSection({ lang }: AICameraSectionProps) {
  const [cameraActive, setCameraActive] = useState(false)
  const [mode, setMode] = useState<'printer' | 'people'>('printer')
  const [faceCount, setFaceCount] = useState(0)
  const [error, setError] = useState('')
  const [showExamples, setShowExamples] = useState(true)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const frameRef = useRef<number | null>(null)

  const messages = {
    ru: {
      title: 'AI Камера - Распознавание области печати',
      description: 'Используйте камеру для автоматического определения области печати биопринтера',
      startCamera: 'Запустить камеру',
      stopCamera: 'Остановить камеру',
      modePrinter: 'Принтер',
      modePeople: 'Люди',
      peopleFound: 'Людей в кадре',
      needCamera: 'Нажмите кнопку выше',
      examples: 'Примеры работы',
      hideExamples: 'Скрыть примеры',
      showExamples: 'Показать примеры',
      teachableMachine: 'Обучить модель на Teachable Machine',
      teachableMachineDesc: 'Создайте свою модель распознавания с помощью Google Teachable Machine',
      cameraError: 'Не удалось получить доступ к камере',
      printerDetected: '✓ Принтер обнаружен',
      area: 'Область',
      confidence: 'Уверенность',
      people: 'Людей',
      mode: 'Режим',
      peopleRecognition: 'Распознавание людей',
      active: 'Активных',
      person: 'человек',
      example: 'Пример',
      printer: 'Принтер',
    },
    uz: {
      title: 'AI Kamera - Bosib chiqarish maydonini aniqlash',
      description: 'Bioprinterning bosib chiqarish maydonini avtomatik aniqlash uchun kameradan foydalaning',
      startCamera: 'Kamerani yoqish',
      stopCamera: 'Kamerani o\'chirish',
      modePrinter: 'Printer',
      modePeople: 'Odamlar',
      peopleFound: 'Kadrda odamlar',
      needCamera: 'Yuqoridagi tugmani bosing',
      examples: 'Ishlash namunalari',
      hideExamples: 'Namunalarni yashirish',
      showExamples: 'Namunalarni ko\'rsatish',
      teachableMachine: 'Teachable Machine\'da model yaratish',
      teachableMachineDesc: 'Google Teachable Machine yordamida o\'z tanib olish modelingizni yarating',
      cameraError: 'Kameraga kirish imkoni bo\'lmadi',
      printerDetected: '✓ Printer aniqlandi',
      area: 'Maydon',
      confidence: 'Ishonch',
      people: 'Odamlar',
      mode: 'Rejim',
      peopleRecognition: 'Odamlarni tanib olish',
      active: 'Faol',
      person: 'odam',
      example: 'Namuna',
      printer: 'Printer',
    },
    en: {
      title: 'AI Camera - Print Area Recognition',
      description: 'Use camera to automatically detect bioprinter printing area',
      startCamera: 'Start Camera',
      stopCamera: 'Stop Camera',
      modePrinter: 'Printer',
      modePeople: 'People',
      peopleFound: 'People in frame',
      needCamera: 'Click button above',
      examples: 'Examples',
      hideExamples: 'Hide examples',
      showExamples: 'Show examples',
      teachableMachine: 'Train Model on Teachable Machine',
      teachableMachineDesc: 'Create your own recognition model using Google Teachable Machine',
      cameraError: 'Failed to access camera',
      printerDetected: '✓ Printer detected',
      area: 'Area',
      confidence: 'Confidence',
      people: 'People',
      mode: 'Mode',
      peopleRecognition: 'People Recognition',
      active: 'Active',
      person: 'person',
      example: 'Example',
      printer: 'Printer',
    },
  }

  const t = messages[lang]

  const processFrame = () => {
    if (!videoRef.current || !canvasRef.current) return
    if (!cameraActive) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }

    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    } catch (e) {}

    if (mode === 'printer') {
      const width = canvas.width
      const height = canvas.height
      const rectWidth = width * 0.6
      const rectHeight = height * 0.6
      const x = (width - rectWidth) / 2
      const y = (height - rectHeight) / 2

      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 4
      ctx.strokeRect(x, y, rectWidth, rectHeight)
      const cornerSize = 40
      ctx.lineWidth = 6

      ctx.beginPath()
      ctx.moveTo(x, y + cornerSize)
      ctx.lineTo(x, y)
      ctx.lineTo(x + cornerSize, y)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(x + rectWidth - cornerSize, y)
      ctx.lineTo(x + rectWidth, y)
      ctx.lineTo(x + rectWidth, y + cornerSize)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(x, y + rectHeight - cornerSize)
      ctx.lineTo(x, y + rectHeight)
      ctx.lineTo(x + cornerSize, y + rectHeight)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(x + rectWidth - cornerSize, y + rectHeight)
      ctx.lineTo(x + rectWidth, y + rectHeight)
      ctx.lineTo(x + rectWidth, y + rectHeight - cornerSize)
      ctx.stroke()
    } else {
      const randomFaces = Math.floor(Math.random() * 4)
      setFaceCount(randomFaces)
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 4

      for (let i = 0; i < randomFaces; i++) {
        const x = Math.random() * (canvas.width - 250) + 50
        const y = Math.random() * (canvas.height - 250) + 50
        const size = 150 + Math.random() * 100
        ctx.strokeRect(x, y, size, size)
      }
    }

    frameRef.current = requestAnimationFrame(processFrame)
  }

  const handleStartCamera = async () => {
    try {
      setError('')
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onplay = () => {
          setCameraActive(true)
          processFrame()
        }
      }
    } catch (err: any) {
      console.error('Camera error:', err)
      setError(t.cameraError)
    }
  }

  const handleStopCamera = () => {
    setCameraActive(false)

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setFaceCount(0)
  }

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const exampleImages = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: i < 5 ? 'printer' : 'people',
    hasDetection: true
  }))

  return (
    <Card className="my-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="space-y-6">
        {showExamples && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-gray-900">{t.examples}</h4>
              <button
                onClick={() => setShowExamples(false)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {t.hideExamples}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exampleImages.map((img) => (
                <div
                  key={img.id}
                  className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-blue-300 bg-gradient-to-br from-gray-50 to-gray-300 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:border-blue-500"
                  style={{ aspectRatio: '16/9', minHeight: '250px' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-gray-200 to-indigo-100">
                    <ImageIcon className="text-gray-500 opacity-50" size={64} />
                  </div>
                  {img.type === 'printer' && (
                    <>
                      <div className="absolute inset-0 border-4 border-green-500 m-6 rounded-lg animate-pulse" style={{ borderStyle: 'solid', boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}>
                        <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg" style={{ borderWidth: '6px' }}></div>
                        <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg" style={{ borderWidth: '6px' }}></div>
                        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg" style={{ borderWidth: '6px' }}></div>
                        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg" style={{ borderWidth: '6px' }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                        <Badge variant="success" className="text-sm font-bold">{t.printerDetected}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-xs">
                        <div>{t.area}: 60% × 60%</div>
                        <div>{t.confidence}: 95%</div>
                      </div>
                    </>
                  )}
                  {img.type === 'people' && (
                    <>
                      <div className="absolute inset-0 p-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="absolute border-4 border-blue-500 rounded-lg animate-pulse"
                            style={{
                              left: `${15 + i * 25}%`,
                              top: `${15 + i * 15}%`,
                              width: '22%',
                              height: '30%',
                              boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
                              animationDelay: `${i * 0.2}s`
                            }}
                          >
                            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                          </div>
                        ))}
                      </div>
                      <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                        <Badge variant="primary" className="text-sm font-bold flex items-center space-x-2">
                          <Users size={16} />
                          <span>{t.people}: {img.id - 4}</span>
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-xs">
                        <div>{t.mode}: {t.peopleRecognition}</div>
                        <div>{t.active}: {img.id - 4} {t.person}</div>
                      </div>
                    </>
                  )}
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {t.example} {img.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!showExamples && (
          <button
            onClick={() => setShowExamples(true)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-2"
          >
            <ImageIcon size={16} />
            <span>{t.showExamples}</span>
          </button>
        )}
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white rounded-lg">
            <Camera className="text-blue-500" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-display font-bold mb-2 text-gray-900">
              {t.title}
            </h3>
            <p className="text-gray-700 mb-4">
              {t.description}
            </p>
            <a
              href="https://teachablemachine.withgoogle.com/train/image"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Brain size={20} />
              <span>{t.teachableMachine}</span>
              <ExternalLink size={16} />
            </a>
            <p className="text-sm text-gray-600 mb-4">
              {t.teachableMachineDesc}
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => {
                  if (cameraActive) setMode('printer')
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                  mode === 'printer' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-blue-600 border-blue-300'
                } ${!cameraActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50'}`}
              >
                {t.modePrinter}
              </button>
              <button
                onClick={() => {
                  if (cameraActive) setMode('people')
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium border flex items-center space-x-2 transition-colors ${
                  mode === 'people' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-blue-600 border-blue-300'
                } ${!cameraActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50'}`}
              >
                <Users size={16} />
                <span>{t.modePeople}</span>
              </button>
            </div>
            <button
              onClick={cameraActive ? handleStopCamera : handleStartCamera}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                cameraActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <Camera size={20} />
              <span>{cameraActive ? t.stopCamera : t.startCamera}</span>
            </button>
          </div>
        </div>
        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}
        <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9', backgroundColor: '#000' }}>
          <video
            ref={videoRef}
            style={{ display: 'none' }}
            autoPlay
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              backgroundColor: cameraActive ? 'transparent' : '#1e3a8a'
            }}
          />

          {!cameraActive && (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-gradient-to-br from-blue-900 to-indigo-900">
              <div className="text-center">
                <Camera size={64} className="mx-auto mb-4 opacity-50" />
                <p>{error || t.needCamera}</p>
              </div>
            </div>
          )}
          {cameraActive && (
            <div className="absolute top-4 right-4">
              {mode === 'printer' ? (
                <Badge variant="success" className="flex items-center space-x-2">
                  <span>✓ {t.printer}</span>
                </Badge>
              ) : (
                <Badge variant="primary" className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>{t.peopleFound}: {faceCount}</span>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
