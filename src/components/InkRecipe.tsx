import { motion } from 'framer-motion'
import { CheckCircle2, Beaker } from 'lucide-react'
import Card from './ui/Card'
import Badge from './ui/Badge'

interface InkRecipeProps {
  recipe: {
    id: string
    title: string
    composition: string[]
    hardener: string | null
  }
  index: number
}

export default function InkRecipe({ recipe, index }: InkRecipeProps) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge variant="primary" className="mb-2">
            Рецепт {recipe.id}
          </Badge>
          <h3 className="text-xl font-display font-bold text-gray-900">
            {recipe.title}
          </h3>
        </div>
        <Beaker className="text-primary-400" size={32} />
      </div>

      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Состав:
        </h4>
        <ul className="space-y-2">
          {recipe.composition.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start space-x-2 text-sm text-gray-600"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
            >
              <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {recipe.hardener && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-cyan-700 mb-2">
            Отвердитель:
          </h4>
          <p className="text-sm text-gray-600">{recipe.hardener}</p>
        </div>
      )}
    </Card>
  )
}

