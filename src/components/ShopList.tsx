import { ExternalLink, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from './ui/Card'
import Badge from './ui/Badge'

interface ShopCategory {
  title: string
  links: string[]
  filter?: string
}

interface ShopListProps {
  categories: ShopCategory[]
}

export default function ShopList({ categories }: ShopListProps) {
  const extractDomain = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  const isCategory = (url: string) => url.includes('/category/')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="h-full">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                {category.filter && (
                  <Badge variant="secondary" className="text-xs">
                    Фильтр: {category.filter}
                  </Badge>
                )}
              </div>
              <Package className="text-primary-400" size={24} />
            </div>

            <ul className="space-y-3">
              {category.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-primary-50 hover:text-primary-700 transition-colors group"
                  >
                    <span className="text-sm font-medium flex items-center space-x-2">
                      {isCategory(link) ? (
                        <Badge variant="warning" className="text-xs">
                          Категория
                        </Badge>
                      ) : (
                        <Package size={16} className="text-gray-400 group-hover:text-primary-500" />
                      )}
                      <span className="truncate">{extractDomain(link)}</span>
                    </span>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-primary-500 flex-shrink-0 ml-2" />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

