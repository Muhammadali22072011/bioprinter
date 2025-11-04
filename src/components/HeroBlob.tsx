import { motion } from 'framer-motion'

export default function HeroBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-primary-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-200 to-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 20, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

