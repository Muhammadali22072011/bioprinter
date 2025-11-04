import { useState } from 'react'
import { Play, X } from 'lucide-react'
import Card from './ui/Card'
import ScrollReveal from './ui/ScrollReveal'

interface VideoItem {
  id: number
  src: string
  thumbnail: string
  title: string
  description: string
}

interface VideoGalleryProps {
  lang: 'ru' | 'uz' | 'en'
}

export default function VideoGallery({ lang }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const content = {
    ru: {
      title: 'Наш биопринтер в действии',
      subtitle: 'Смотрите, как работает образовательный биопринтер',
      videos: [
        {
          id: 1,
          src: '/videos/video_2025-11-04_13-07-40.mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 1',
          description: 'Демонстрация работы образовательного биопринтера'
        },
        {
          id: 2,
          src: '/videos/video_2025-11-04_13-07-40 (2).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 2',
          description: 'Работа с биопринтером в лаборатории'
        },
        {
          id: 3,
          src: '/videos/video_2025-11-04_13-07-40 (3).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 3',
          description: 'Процесс работы с учебным биопринтером'
        },
        {
          id: 4,
          src: '/videos/video_2025-11-04_13-07-40 (4).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 4',
          description: 'Биопринтер в действии'
        },
        {
          id: 5,
          src: '/videos/video_2025-11-04_13-07-40 (5).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 5',
          description: 'Обзор функций биопринтера'
        },
        {
          id: 6,
          src: '/videos/video_2025-11-04_13-07-40 (6).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 6',
          description: 'Работа биопринтера для образовательных целей'
        },
        {
          id: 7,
          src: '/videos/video_2025-11-04_13-07-40 (7).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 7',
          description: 'Демонстрация возможностей биопринтера'
        },
        {
          id: 8,
          src: '/videos/video_2025-11-04_13-07-40 (8).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 8',
          description: 'Биопринтер в образовательном процессе'
        },
        {
          id: 9,
          src: '/videos/video_2025-11-04_13-07-40 (9).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 9',
          description: 'Обучающее видео о биопринтере'
        },
        {
          id: 10,
          src: '/videos/video_2025-11-04_13-07-40 (10).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 10',
          description: 'Работа с образовательным биопринтером'
        },
        {
          id: 11,
          src: '/videos/video_2025-11-04_13-19-56.mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 11',
          description: 'Демонстрация работы образовательного биопринтера'
        },
        {
          id: 12,
          src: '/videos/video_2025-11-04_13-19-56 (2).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 12',
          description: 'Работа с биопринтером в лаборатории'
        },
        {
          id: 13,
          src: '/videos/video_2025-11-04_13-19-56 (3).mp4',
          thumbnail: '/printer.jpg',
          title: 'Биопринтер - Видео 13',
          description: 'Процесс работы с учебным биопринтером'
        }
      ]
    },
    uz: {
      title: 'Bizning bioprinter ishda',
      subtitle: 'O\'quv bioprinteri qanday ishlashini tomosha qiling',
      videos: [
        {
          id: 1,
          src: '/videos/video_2025-11-04_13-07-40.mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 1',
          description: 'O\'quv bioprinterining ishlash namoyishi'
        },
        {
          id: 2,
          src: '/videos/video_2025-11-04_13-07-40 (2).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 2',
          description: 'Laboratoriyada bioprinter bilan ishlash'
        },
        {
          id: 3,
          src: '/videos/video_2025-11-04_13-07-40 (3).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 3',
          description: 'O\'quv bioprinter bilan ishlash jarayoni'
        },
        {
          id: 4,
          src: '/videos/video_2025-11-04_13-07-40 (4).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 4',
          description: 'Bioprinter ishda'
        },
        {
          id: 5,
          src: '/videos/video_2025-11-04_13-07-40 (5).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 5',
          description: 'Bioprinter funksiyalariga umumiy ko\'rish'
        },
        {
          id: 6,
          src: '/videos/video_2025-11-04_13-07-40 (6).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 6',
          description: 'Ta\'lim maqsadlari uchun bioprinter ishlashi'
        },
        {
          id: 7,
          src: '/videos/video_2025-11-04_13-07-40 (7).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 7',
          description: 'Bioprinter imkoniyatlarini namoyish qilish'
        },
        {
          id: 8,
          src: '/videos/video_2025-11-04_13-07-40 (8).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 8',
          description: 'Ta\'lim jarayonida bioprinter'
        },
        {
          id: 9,
          src: '/videos/video_2025-11-04_13-07-40 (9).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 9',
          description: 'Bioprinter haqida o\'quv videosi'
        },
        {
          id: 10,
          src: '/videos/video_2025-11-04_13-07-40 (10).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 10',
          description: 'O\'quv bioprinter bilan ishlash'
        },
        {
          id: 11,
          src: '/videos/video_2025-11-04_13-19-56.mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 11',
          description: 'O\'quv bioprinterining ishlash namoyishi'
        },
        {
          id: 12,
          src: '/videos/video_2025-11-04_13-19-56 (2).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 12',
          description: 'Laboratoriyada bioprinter bilan ishlash'
        },
        {
          id: 13,
          src: '/videos/video_2025-11-04_13-19-56 (3).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 13',
          description: 'O\'quv bioprinter bilan ishlash jarayoni'
        }
      ]
    },
    en: {
      title: 'Our Bioprinter in Action',
      subtitle: 'Watch how the educational bioprinter works',
      videos: [
        {
          id: 1,
          src: '/videos/video_2025-11-04_13-07-40.mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 1',
          description: 'Educational bioprinter operation demonstration'
        },
        {
          id: 2,
          src: '/videos/video_2025-11-04_13-07-40 (2).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 2',
          description: 'Working with bioprinter in laboratory'
        },
        {
          id: 3,
          src: '/videos/video_2025-11-04_13-07-40 (3).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 3',
          description: 'Process of working with educational bioprinter'
        },
        {
          id: 4,
          src: '/videos/video_2025-11-04_13-07-40 (4).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 4',
          description: 'Bioprinter in action'
        },
        {
          id: 5,
          src: '/videos/video_2025-11-04_13-07-40 (5).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 5',
          description: 'Overview of bioprinter functions'
        },
        {
          id: 6,
          src: '/videos/video_2025-11-04_13-07-40 (6).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 6',
          description: 'Bioprinter operation for educational purposes'
        },
        {
          id: 7,
          src: '/videos/video_2025-11-04_13-07-40 (7).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 7',
          description: 'Demonstration of bioprinter capabilities'
        },
        {
          id: 8,
          src: '/videos/video_2025-11-04_13-07-40 (8).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 8',
          description: 'Bioprinter in educational process'
        },
        {
          id: 9,
          src: '/videos/video_2025-11-04_13-07-40 (9).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 9',
          description: 'Educational video about bioprinter'
        },
        {
          id: 10,
          src: '/videos/video_2025-11-04_13-07-40 (10).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 10',
          description: 'Working with educational bioprinter'
        },
        {
          id: 11,
          src: '/videos/video_2025-11-04_13-19-56.mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 11',
          description: 'Educational bioprinter operation demonstration'
        },
        {
          id: 12,
          src: '/videos/video_2025-11-04_13-19-56 (2).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 12',
          description: 'Working with bioprinter in laboratory'
        },
        {
          id: 13,
          src: '/videos/video_2025-11-04_13-19-56 (3).mp4',
          thumbnail: '/printer.jpg',
          title: 'Bioprinter - Video 13',
          description: 'Process of working with educational bioprinter'
        }
      ]
    }
  }

  const t = content[lang]

  return (
    <>
      <section className="section bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.videos.map((video, index) => (
              <ScrollReveal key={video.id} delay={index * 0.05}>
                <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  <div
                    onClick={() => setSelectedVideo(video)}
                    className="flex flex-col h-full"
                  >
                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                      <video
                        src={video.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        onMouseEnter={(e) => {
                          const target = e.target as HTMLVideoElement
                          target.play()
                        }}
                        onMouseLeave={(e) => {
                          const target = e.target as HTMLVideoElement
                          target.pause()
                          target.currentTime = 0
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <Play className="text-blue-600 ml-1" size={28} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 flex-grow">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                src={selectedVideo.src}
                controls
                autoPlay
                className="w-full"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="bg-gray-900 p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-300">
                  {selectedVideo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

