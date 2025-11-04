import { ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  className?: string
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: 'bg-primary-100 text-primary-700 border border-primary-200',
    secondary: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  }

  return (
    <span className={clsx('badge', variants[variant], className)}>
      {children}
    </span>
  )
}

