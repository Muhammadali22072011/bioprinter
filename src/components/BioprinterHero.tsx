import { motion } from 'framer-motion'

interface BioprinterHeroProps {
  lang: 'ru' | 'uz' | 'en'
}

export default function BioprinterHero({ lang: _lang }: BioprinterHeroProps) {
  return (
    <section className="w-full overflow-hidden">
      <motion.div
        className="relative w-full h-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Full Width Image */}
        <img
          src="/working-with-bioprinter.jpg"
          alt="Working with bioprinter"
          className="w-full h-auto object-cover block"
          style={{ maxHeight: '600px', minHeight: '400px' }}
        />
      </motion.div>
    </section>
  )
}
