import { SideTabs, type TabItem } from './SideTabs'

interface MobileTabBarProps {
  disabled?: boolean
  tabs: TabItem[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function MobileTabBar({ tabs, activeIndex, onSelect, disabled }: MobileTabBarProps) {
  return (
    <div className="w-full py-2">
      <SideTabs tabs={tabs} activeIndex={activeIndex} onSelect={onSelect} orientation="horizontal" disabled={disabled} />
    </div>
  )
}
