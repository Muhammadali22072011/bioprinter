import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string | ReactNode
  centered?: boolean
}

export default function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <motion.div
      className={centered ? 'section-header' : 'mb-12'}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={centered ? 'section-title' : 'section-title text-left'}>
        {title}
      </h2>
      {subtitle && (
        <p className={centered ? 'section-subtitle' : 'section-subtitle text-left mx-0 mt-4'}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

