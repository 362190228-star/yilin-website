export function PageNumber({ value }: { value: string }) {
  return (
    <div className="page-index" aria-label={`第 ${value} 页`}>
      <span className="font-hand text-3xl text-accent-clayDeep">{value}</span>
    </div>
  )
}
