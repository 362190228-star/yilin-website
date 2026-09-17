import { motion } from 'framer-motion'
import { Tape } from './decor/Tape'

interface NotebookCoverProps {
  onOpen: () => void
}

export function NotebookCover({ onOpen }: NotebookCoverProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="打开日记本，进入个人作品集"
        className="group relative w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] md:w-[380px] md:h-[520px] cursor-pointer"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ y: -6 }}
        whileTap={{ y: -2, scale: 0.995 }}
      >
        {/* 桌面上的投影，hover 时增强，模拟“抬起”感 */}
        <motion.span
          aria-hidden="true"
          className="absolute -inset-x-4 -bottom-6 h-10 rounded-[100%] bg-ink/25 blur-xl"
          initial={{ opacity: 0.35 }}
          whileHover={{ opacity: 0.5, scale: 1.05 }}
        />

        {/* 封面本体 */}
        <div className="relative h-full w-full rounded-[2px] bg-gradient-to-br from-[#EADFC8] to-[#D8C8A3] shadow-notebook overflow-hidden border border-[#C9B182]/40">
          {/* 布纹质感 */}
          <div className="absolute inset-0 texture-paper opacity-60 mix-blend-multiply" />
          {/* 书脊阴影 */}
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/15 to-transparent" />

          <div className="relative h-full flex flex-col items-center justify-center px-8 gap-4">
            <span className="font-hand text-4xl sm:text-5xl text-ink-soft rotate-[-2deg]">
              Yilin&apos;s Diary
            </span>
            <span className="text-xs tracking-[0.2em] text-ink-faint">PORTFOLIO NOTEBOOK</span>
            <div className="mt-4 h-px w-16 bg-ink-faint/40" />
            <span className="font-serif text-lg text-ink-soft">蔡艺琳的个人日记本</span>
          </div>

          {/* 姓名标签 */}
          <div className="absolute bottom-8 right-8 -rotate-3 rounded-sm bg-paper/90 px-3 py-1.5 shadow-paper border border-ink/10">
            <span className="font-hand text-xl text-accent-clayDeep">Y. Cai</span>
          </div>

          <Tape color="sky" rotate={-8} className="top-4 left-8" />
          <Tape color="clay" rotate={6} className="top-6 right-10" />

          {/* hover 时轻微高光扫过 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>

      </motion.button>

      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-ink-faint font-serif animate-floatIn">
        点击封面，翻开我的日记本
      </p>
    </div>
  )
}
