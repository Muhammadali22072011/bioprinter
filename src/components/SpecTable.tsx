import { motion } from 'framer-motion'
import Card from './ui/Card'

interface SpecItem {
  key: string
  value: string
}

interface SpecTableProps {
  specs: SpecItem[]
  title?: string
}

export default function SpecTable({ specs, title }: SpecTableProps) {
  return (
    <Card hover={false}>
      {title && <h3 className="text-xl font-display font-bold mb-4">{title}</h3>}
      <div className="divide-y divide-gray-200">
        {specs.map((spec, index) => (
          <motion.div
            key={index}
            className="py-3 flex justify-between items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <dt className="text-sm font-medium text-gray-600 flex-shrink-0 w-1/3">
              {spec.key}
            </dt>
            <dd className="text-sm text-gray-900 flex-1 text-right">
              {spec.value}
            </dd>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

