import { useState } from 'react'
import { contact } from '../../data/contact'
import { Tape } from '../decor/Tape'

export function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    window.setTimeout(() => setCopied(null), 1600)
  }
  return (
    <div className="contact-page h-full overflow-y-auto diary-scroll flex items-center justify-center">
      <div className="relative texture-paper max-w-md w-full rounded-sm border border-ink/10 shadow-paper-lg p-4 text-left">
        <Tape color="clay" rotate={-6} className="-top-3 left-8" />

        <p className="text-sm sm:text-[15px] leading-8 text-ink-soft mb-6 mt-3">
          {contact.closingLine}
        </p>

        <div className="contact-lines">
          <button type="button" onClick={() => copy('微信', contact.wechat)}><span>微信</span><strong>{contact.wechat}</strong><em>{copied === '微信' ? '已复制' : '复制'}</em></button>
          <button type="button" onClick={() => copy('电话', contact.phone)}><span>电话</span><strong>{contact.phone}</strong><em>{copied === '电话' ? '已复制' : '复制'}</em></button>
          <button type="button" onClick={() => copy('邮箱', contact.email)}><span>邮箱</span><strong>{contact.email}</strong><em>{copied === '邮箱' ? '已复制' : '复制'}</em></button>
        </div>
        <p className="contact-feedback" aria-live="polite">{copied ? `${copied}已复制` : '\u00a0'}</p>
      </div>
    </div>
  )
}
