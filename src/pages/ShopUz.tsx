import { useParams } from 'react-router-dom'
import { ShoppingBag, AlertCircle, DollarSign, CheckSquare, Wrench } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import ShopList from '../components/ShopList'
import Card from '../components/ui/Card'
import Notice from '../components/ui/Notice'
import ScrollReveal from '../components/ui/ScrollReveal'
import SEO from '../components/SEO'
import { shopUz, bioinks } from '../content/data'

export default function ShopUz() {
  const { lang } = useParams<{ lang: string }>()
  const currentLang = (lang || 'ru') as 'ru' | 'uz' | 'en'
  const printerAlt = currentLang === 'ru' ? 'Учебный биопринтер' : currentLang === 'uz' ? 'Ta’limiy bioprinter' : 'Educational bioprinter'

  const getMaterialsFromStores = () => {
    if (currentLang === 'uz') return bioinks.materials.fromStoresUz
    if (currentLang === 'en') return bioinks.materials.fromStoresEn
    return bioinks.materials.fromStores
  }

  const getTools = () => {
    if (currentLang === 'uz') return bioinks.materials.toolsUz
    if (currentLang === 'en') return bioinks.materials.toolsEn
    return bioinks.materials.tools
  }

  const categories = [
    {
      title: currentLang === 'ru' ? 'Альгинат натрия (E401)' : currentLang === 'uz' ? 'Natriy alginat (E401)' : 'Sodium Alginate (E401)',
      links: shopUz.links.alginate,
      filter: 'E401, 100-130г'
    },
    {
      title: currentLang === 'ru' ? 'Хлорид кальция (CaCl₂, E509)' : currentLang === 'uz' ? 'Kaltsiy xlorid (CaCl₂, E509)' : 'Calcium Chloride (CaCl₂, E509)',
      links: shopUz.links.cacl2,
      filter: 'E509, 200-500г'
    },
    {
      title: currentLang === 'ru' ? 'Глицерин пищевой (E422)' : currentLang === 'uz' ? 'Oziq-ovqat glitserini (E422)' : 'Food-grade Glycerin (E422)',
      links: shopUz.links.glycerin,
      filter: 'E422, 150-500мл'
    },
    {
      title: currentLang === 'ru' ? 'Шприцы Luer-Lock 50 мл' : currentLang === 'uz' ? 'Shpritslar Luer-Lock 50 ml' : 'Syringes Luer-Lock 50 ml',
      links: shopUz.links.syringes,
      filter: 'Luer-Lock, 50мл'
    },
    {
      title: currentLang === 'ru' ? 'Канюли / иглы 18G (Luer-Lock)' : currentLang === 'uz' ? 'Kanyullar / ignalar 18G (Luer-Lock)' : 'Cannulas / Needles 18G (Luer-Lock)',
      links: shopUz.links.needles,
      filter: '18G, 1.2мм, Luer-Lock'
    },
    {
      title: currentLang === 'ru' ? 'Желатин пищевой' : currentLang === 'uz' ? 'Oziq-ovqat jelatini' : 'Food-grade Gelatin',
      links: shopUz.links.gelatin,
      filter: '100-250г'
    },
    {
      title: currentLang === 'ru' ? 'Крахмал (картофельный/кукурузный)' : currentLang === 'uz' ? 'Kraxmal (kartoshka/makkajo\'xori)' : 'Starch (Potato/Corn)',
      links: shopUz.links.starch,
      filter: '500г-1кг'
    },
    {
      title: currentLang === 'ru' ? 'Пищевые красители' : currentLang === 'uz' ? 'Oziq-ovqat bo\'yog\'i' : 'Food Colorants',
      links: shopUz.links.colorants,
      filter: 'Набор, гель'
    },
    {
      title: currentLang === 'ru' ? 'ПЭТ-плёнка (подложка)' : currentLang === 'uz' ? 'PET plyonka (taglik)' : 'PET Film (Substrate)',
      links: shopUz.links.petFilm,
      filter: 'A4, прозрачная'
    },
    {
      title: currentLang === 'ru' ? 'Контейнеры/баночки для хранения' : currentLang === 'uz' ? 'Saqlash uchun idishlar' : 'Storage Containers/Jars',
      links: shopUz.links.containers,
      filter: '100-500мл'
    },
    {
      title: currentLang === 'ru' ? 'Мензурки/мерные стаканы' : currentLang === 'uz' ? 'O\'lchov stakanlari' : 'Beakers/Measuring Cups',
      links: shopUz.links.beakers,
      filter: '250-1000мл'
    },
    {
      title: currentLang === 'ru' ? 'Перчатки (нитриловые)' : currentLang === 'uz' ? 'Qo\'lqoplar (nitril)' : 'Gloves (Nitrile)',
      links: shopUz.links.gloves,
      filter: '100шт, M/L'
    },
    {
      title: currentLang === 'ru' ? 'Защитные очки' : currentLang === 'uz' ? 'Himoya ko\'zoynagi' : 'Safety Goggles',
      links: shopUz.links.goggles,
      filter: 'Прозрачные'
    },
  ]

  return (
    <>
      <SEO
        title={currentLang === 'ru' ? 'Где купить (UZ)' : currentLang === 'uz' ? 'Qayerdan sotib olish (UZ)' : 'Shop (UZ)'}
        description={currentLang === 'ru' ? 'Где купить реагенты и расходные материалы для биопринтера в Узбекистане' : currentLang === 'uz' ? 'O\'zbekistonda bioprinter uchun reagentlar va sarf materiallarini qayerdan sotib olish mumkin' : 'Where to buy reagents and consumables for bioprinter in Uzbekistan'}
        keywords="купить, альгинат, CaCl2, шприцы, иглы, Узбекистан, uz.ozon.com"
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            title={currentLang === 'ru' ? 'Где купить в Узбекистане' : currentLang === 'uz' ? 'O\'zbekistonda qayerdan sotib olish mumkin' : 'Where to Buy in Uzbekistan'}
            subtitle={currentLang === 'ru' ? 'Проверенные ссылки на реагенты и расходные материалы с доставкой по Узбекистану' : currentLang === 'uz' ? 'O\'zbekiston bo\'ylab yetkazib berish bilan reagentlar va sarf materiallari uchun tekshirilgan havolalar' : 'Verified links to reagents and consumables with delivery throughout Uzbekistan'}
          />

          <ScrollReveal>
            <div className="max-w-4xl mx-auto mt-6">
              <img src="/printer.jpg" alt={printerAlt} className="w-full h-auto rounded-xl shadow-md object-contain bg-white" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <Notice type="info">
              <strong>{shopUz.note}</strong>
            </Notice>
          </ScrollReveal>

          {/* What You Need */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Что нужно для работы' : currentLang === 'uz' ? 'Ish uchun kerak bo\'lgan narsalar' : 'What You Need'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <Card>
                  <div className="flex items-start space-x-4 mb-4">
                    <ShoppingBag className="text-primary-500 flex-shrink-0" size={32} />
                    <h3 className="text-lg font-display font-bold">
                      {currentLang === 'ru' ? 'Из аптек/магазинов' : currentLang === 'uz' ? 'Dorixona/do\'konlardan' : 'From Stores'}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {getMaterialsFromStores().map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckSquare size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Card>
                  <div className="flex items-start space-x-4 mb-4">
                    <Wrench className="text-cyan-500 flex-shrink-0" size={32} />
                    <h3 className="text-lg font-display font-bold">
                      {currentLang === 'ru' ? 'Инструменты' : currentLang === 'uz' ? 'Asboblar' : 'Tools'}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {getTools().map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckSquare size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            </div>
          </div>

          {/* Material Usage Guide */}
          <div className="my-16">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Для чего нужны ингредиенты' : currentLang === 'uz' ? 'Ingredientlar nima uchun kerak' : 'What Ingredients Are Used For'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ScrollReveal>
                <Card className="border-l-4 border-primary-500">
                  <h3 className="font-display font-bold text-lg mb-2">
                    {currentLang === 'ru' ? '🧪 Альгинат натрия' : currentLang === 'uz' ? '🧪 Natriy alginat' : '🧪 Sodium Alginate'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentLang === 'ru' ? 'Основа для биогеля. Создаёт вязкую структуру, которая держит форму при печати.' : currentLang === 'uz' ? 'Biojelning asosi. Chop etishda shaklni saqlaydigan qovushqoq strukturani yaratadi.' : 'Base for biogel. Creates viscous structure that holds shape during printing.'}
                  </p>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal delay={0.05}>
                <Card className="border-l-4 border-cyan-500">
                  <h3 className="font-display font-bold text-lg mb-2">
                    {currentLang === 'ru' ? '💧 Хлорид кальция' : currentLang === 'uz' ? '💧 Kaltsiy xlorid' : '💧 Calcium Chloride'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentLang === 'ru' ? 'Отвердитель для альгината. Превращает жидкий гель в упругую форму за 5-10 минут.' : currentLang === 'uz' ? 'Alginat uchun qotiruvchi. Suyuq jelni 5-10 daqiqada elastik shaklga aylantiradi.' : 'Hardener for alginate. Turns liquid gel into elastic form in 5-10 minutes.'}
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Card className="border-l-4 border-green-500">
                  <h3 className="font-display font-bold text-lg mb-2">
                    {currentLang === 'ru' ? '💚 Глицерин' : currentLang === 'uz' ? '💚 Glitserin' : '💚 Glycerin'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentLang === 'ru' ? 'Пластификатор. Делает гель мягче и предотвращает растрескивание при высыхании.' : currentLang === 'uz' ? 'Plastifikator. Jelni yumshatadi va quritishda yorilishni oldini oladi.' : 'Plasticizer. Softens gel and prevents cracking when drying.'}
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <Card className="border-l-4 border-yellow-500">
                  <h3 className="font-display font-bold text-lg mb-2">
                    {currentLang === 'ru' ? '🍮 Желатин' : currentLang === 'uz' ? '🍮 Jelatin' : '🍮 Gelatin'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentLang === 'ru' ? 'Опциональный компонент. Увеличивает плотность и делает текстуру более мягкой.' : currentLang === 'uz' ? 'Ixtiyoriy komponent. Zichlikni oshiradi va teksturani yumshatadi.' : 'Optional component. Increases density and makes texture softer.'}
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Card className="border-l-4 border-purple-500">
                  <h3 className="font-display font-bold text-lg mb-2">
                    {currentLang === 'ru' ? '🌾 Крахмал' : currentLang === 'uz' ? '🌾 Kraxmal' : '🌾 Starch'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentLang === 'ru' ? 'Загуститель. Помогает подобрать нужную вязкость для печати через иглу 18G.' : currentLang === 'uz' ? 'Qalinlashtiruvchi. 18G igna orqali chop etish uchun kerakli qovushqoqlikni tanlashga yordam beradi.' : 'Thickener. Helps select right viscosity for printing through 18G needle.'}
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <Card className="border-l-4 border-pink-500">
                  <h3 className="font-display font-bold text-lg mb-2">
                    {currentLang === 'ru' ? '🎨 Красители' : currentLang === 'uz' ? '🎨 Bo\'yog\'lar' : '🎨 Colorants'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentLang === 'ru' ? 'Для визуализации печати. 1-2 капли делают структуру видимой и эффектной.' : currentLang === 'uz' ? 'Chop etishni ko\'rish uchun. 1-2 tomchi strukturani ko\'rinadigan va ta\'sirli qiladi.' : 'For print visualization. 1-2 drops make structure visible and impressive.'}
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </div>

          {/* Categories */}
          <div className="my-12">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              {currentLang === 'ru' ? 'Категории товаров' : currentLang === 'uz' ? 'Mahsulot toifalari' : 'Product Categories'}
            </h2>
            <ShopList categories={categories} />
          </div>

          {/* Bundle */}
          <ScrollReveal>
            <Card className="my-12 bg-gradient-to-br from-primary-50 to-cyan-50 border-primary-200">
              <div className="flex items-start space-x-4">
                <ShoppingBag className="text-primary-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'Набор под ключ' : currentLang === 'uz' ? 'Tayyor to\'plam' : 'Complete Set'}
                  </h3>
                  <p className="text-gray-700 mb-4">{shopUz.bundle}</p>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Tips */}
          <ScrollReveal>
            <Card className="my-12">
              <div className="flex items-start space-x-4">
                <AlertCircle className="text-yellow-500 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {currentLang === 'ru' ? 'Советы при покупке' : currentLang === 'uz' ? 'Xarid qilishda maslahatlar' : 'Buying Tips'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {shopUz.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary-500 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* Budget */}
          <ScrollReveal>
            <Card>
              <div className="flex items-start space-x-4">
                <DollarSign className="text-green-500 flex-shrink-0" size={32} />
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold mb-3">
                    {currentLang === 'ru' ? 'Примерный бюджет' : currentLang === 'uz' ? 'Taxminiy byudjet' : 'Estimated Budget'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {shopUz.budget.map((item, index) => (
                      <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

