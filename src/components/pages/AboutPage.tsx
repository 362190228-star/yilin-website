import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import type { AccentColor } from '../../types'

function CoveredKeyword({ label, accent, index }: { label: string; accent: AccentColor; index: number }) {
  const [open, setOpen] = useState(false)
  const tilts = [-1.4, 1.1, -.8, 1.6]
  return <span className={`covered-keyword covered-keyword--${accent} covered-keyword--${index + 1}`}>
    <span className="covered-keyword__answer">{label}</span>
    <motion.button
      type="button"
      className="covered-keyword__sticker"
      aria-expanded={open}
      aria-label={`揭开${label}贴纸`}
      onClick={() => setOpen(true)}
      animate={open
        ? {
            x: [0, 8, 27],
            y: [0, -5, -14],
            rotateZ: [tilts[index], tilts[index] + .6, tilts[index] + 2.5],
            skewY: [0, -1, -2.5],
            clipPath: [
              'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              'polygon(0 0, 100% 0, 74% 62%, 0 100%)',
              'polygon(0 0, 24% 0, 0 24%)',
            ],
            opacity: [1, 1, 0],
            boxShadow: [
              '2px 3px 6px rgba(51,44,34,.13)',
              '7px 10px 16px rgba(51,44,34,.22)',
              '10px 14px 20px rgba(51,44,34,.16)',
            ],
          }
        : {
            x: 0,
            y: 0,
            rotateZ: tilts[index],
            skewY: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            boxShadow: '2px 3px 6px rgba(51,44,34,.13)',
          }}
      whileHover={open ? undefined : { y: -2, boxShadow: '4px 7px 11px rgba(51,44,34,.19)' }}
      transition={open
        ? { duration: .48, times: [0, .7, 1], ease: [0.22, 0.8, 0.3, 1] }
        : { duration: .26, ease: [0.22, 0.8, 0.3, 1] }}
      style={{ pointerEvents: open ? 'none' : 'auto' }}
    />
  </span>
}

export function AboutPage() {
  const facts = [
    ['姓名', '蔡艺琳'],
    ['学校', '武汉理工大学（硕士）'],
    ['专业方向', '交互设计'],
    ['家乡', '贵州贵阳'],
    ['职业定位', '产品体验设计师'],
    ['生日', '2002.04'],
  ]

  return (
    <div className="about-details h-full overflow-hidden min-w-0">
      <div className="about-details__content texture-ruled">
        <dl className="about-facts" aria-label="个人基本信息">
          {facts.map(([label, value]) => <div key={label} className="about-facts__item">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>)}
        </dl>

        <div className="ability-peel-hint" aria-hidden="true">
          <span>揭开看看我擅长什么吧</span>
          <svg viewBox="0 0 62 24"><path d="M2 5c17-5 30 0 42 7 5 3 9 4 14 2M51 8l7 6-8 4" /></svg>
        </div>
        <div className="about-keywords mb-5">
          {profile.keywords.map((k, index) => <CoveredKeyword key={k.label} label={k.label} accent={k.accent} index={index} />)}
        </div>
      </div>

    </div>
  )
}
