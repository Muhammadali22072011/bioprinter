import { motion } from 'framer-motion'
import { Camera, Cpu, GitCompare, Bell } from 'lucide-react'
import Card from './ui/Card'
import Notice from './ui/Notice'

interface AIBlockProps {
  steps: string[]
  notes: string[]
}

export default function AIBlock({ steps, notes }: AIBlockProps) {
  const icons = [
    <Camera key="camera" size={32} className="text-primary-500" />,
    <Cpu key="cpu" size={32} className="text-cyan-500" />,
    <GitCompare key="compare" size={32} className="text-green-500" />,
    <Bell key="bell" size={32} className="text-yellow-500" />,
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {icons[index]}
                </motion.div>
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold mb-2">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {notes.map((note, index) => (
        <Notice key={index} type="warning">
          <strong>Важно:</strong> {note}
        </Notice>
      ))}
    </div>
  )
}

