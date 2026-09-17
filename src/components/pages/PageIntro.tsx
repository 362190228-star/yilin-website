import type { ReactNode } from 'react'
import { PageNumber } from '../PageNumber'

interface PageIntroProps {
  index: string
  title: string
  subtitle: string
  description?: string
  children?: ReactNode
  className?: string
}

/**
 * 左页的小结卡片：像日记本索引页，呼应右页的主内容。
 * index 为手写体页签编号，不代表真实排序，仅作装饰性索引。
 */
export function PageIntro({ index, title, subtitle, description, children, className = '' }: PageIntroProps) {
  return (
    <div className={`relative flex h-full flex-col ${className}`}>
      <PageNumber value={index} />

      <h1 className="bilingual-title font-serif text-2xl sm:text-3xl font-semibold text-ink mb-5">{title} <span>{subtitle}</span></h1>

      {description && <p className="text-sm leading-8 text-ink-soft texture-ruled pt-1 flex-1">{description}</p>}

      {children}
    </div>
  )
}
