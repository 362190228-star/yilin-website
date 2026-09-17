import { featuredHonorIds, honors } from '../../data/honors'

export function HonorsPage({ compact = false }: { compact?: boolean }) {
  const visibleHonors = compact ? honors : honors.filter(honor => !featuredHonorIds.includes(honor.id))

  return (
    <div className="honors-page diary-scroll h-full overflow-y-auto">
      {compact && <header className="mb-5">
        <h1 className="bilingual-title font-serif text-2xl font-semibold text-ink">个人荣誉 <span>Honors & Awards</span></h1>
      </header>}
      <div className="honors-grid">
        {visibleHonors.map((honor, index) => (
          <figure key={honor.id} className={`honor-card honor-card--${index + 1}`}>
            <div className="honor-card__image"><img src={honor.image} alt={`荣誉证书 ${index + 1}`} loading="lazy" /></div>
          </figure>
        ))}
      </div>
    </div>
  )
}
