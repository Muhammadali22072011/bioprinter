import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import clsx from 'clsx'
import Card from './ui/Card'

interface HowToStepsProps {
  steps: string[]
  title?: string
}

export default function HowToSteps({ steps, title = "Пошаговая инструкция" }: HowToStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index))
    } else {
      setCompletedSteps([...completedSteps, index])
    }
  }

  const progress = (completedSteps.length / steps.length) * 100

  return (
    <Card hover={false}>
      <div className="mb-6">
        <h3 className="text-xl font-display font-bold mb-4">{title}</h3>
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Выполнено: {completedSteps.length} из {steps.length}
        </p>
      </div>

      <ol className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index)
          return (
            <motion.li
              key={index}
              className={clsx(
                'flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
                isCompleted ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
              )}
              onClick={() => toggleStep(index)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={clsx(
                'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              )}>
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span className={clsx(
                'text-sm flex-1',
                isCompleted ? 'text-green-900 line-through' : 'text-gray-700'
              )}>
                {step}
              </span>
            </motion.li>
          )
        })}
      </ol>
    </Card>
  )
}

