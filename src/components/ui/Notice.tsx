import { ReactNode } from 'react'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'
import clsx from 'clsx'

interface NoticeProps {
  type?: 'warning' | 'info' | 'success'
  children: ReactNode
  className?: string
}

export default function Notice({ type = 'info', children, className }: NoticeProps) {
  const icons = {
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
    success: <CheckCircle size={20} />,
  }

  return (
    <div className={clsx('notice', `notice-${type}`, className)}>
      <div className="flex">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 text-sm">{children}</div>
      </div>
    </div>
  )
}

