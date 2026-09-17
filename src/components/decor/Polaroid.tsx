interface PolaroidProps {
  src: string
  alt: string
  caption?: string
  rotate?: number
  className?: string
  width?: number
}

export function Polaroid({ src, alt, caption, rotate = 0, className = '', width = 150 }: PolaroidProps) {
  return (
    <figure
      className={`polaroid inline-block ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, width }}
    >
      {/* 固定宽高比裁切：无论替换的真实照片比例如何，都保持拍立得的方形取景框 */}
      <div className="aspect-square w-full overflow-hidden bg-paper-line">
        <img src={src} alt={alt} className="block h-full w-full object-cover" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-hand text-lg text-ink-soft leading-none">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
