export function Spine() {
  const ringCount = 8
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-6 -translate-x-1/2">
      {/* 折痕阴影 */}
      <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      {/* 装订环 */}
      <div className="absolute inset-y-4 left-1/2 flex -translate-x-1/2 flex-col justify-between">
        {Array.from({ length: ringCount }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="block h-3 w-3 rounded-full bg-gradient-to-br from-accent-brass to-[#7A6640] shadow-ring"
          />
        ))}
      </div>
    </div>
  )
}
