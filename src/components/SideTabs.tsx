import type { AccentColor } from '../types'

export interface TabItem {
  label: string
  accent: AccentColor
}

interface SideTabsProps {
  tabs: TabItem[]
  activeIndex: number
  onSelect: (index: number) => void
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal'
}

const accentBg: Record<AccentColor, string> = {
  sky: 'bg-accent-sky',
  clay: 'bg-accent-clay',
  moss: 'bg-accent-moss',
  brass: 'bg-accent-brass',
}

export function SideTabs({ tabs, activeIndex, onSelect, disabled = false, orientation = 'vertical' }: SideTabsProps) {
  const isVertical = orientation === 'vertical'

  return (
    <div
      role="tablist"
      aria-label="作品集导航"
      className={isVertical ? 'flex flex-col gap-3' : 'flex flex-row gap-2 overflow-x-auto px-2'}
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={tab.label}
            role="tab"
            aria-disabled={disabled}
            aria-selected={isActive}
            type="button"
            onClick={() => onSelect(index)}
            className={[
              'relative font-serif text-sm sm:text-base whitespace-nowrap transition-all duration-300 ease-out',
              'rounded-sm border focus-visible:outline-2',
              isVertical ? 'py-3 pl-4 pr-5 text-left' : 'py-2 px-4',
              isActive
                ? 'bg-paper text-ink shadow-tab border-ink/10 translate-x-0 sm:-translate-x-1'
                : 'bg-paper/60 text-ink-faint border-ink/5 hover:bg-paper/80 hover:text-ink-soft',
            ].join(' ')}
          >
            <span
              aria-hidden="true"
              className={`absolute ${isVertical ? 'left-0 top-1/2 -translate-y-1/2 h-6 w-1.5' : 'left-1/2 -translate-x-1/2 bottom-0 h-1.5 w-6'} rounded-full ${accentBg[tab.accent]} ${isActive ? 'opacity-100' : 'opacity-40'}`}
            />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
