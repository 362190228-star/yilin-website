import { experiences } from '../../data/experiences'

export function ExperiencePage({ activeId, onSelect, compact = false }: { activeId: string; onSelect: (id: string) => void; compact?: boolean }) {
  const active = experiences.find(item => item.id === activeId)
  return (
    <div className="h-full flex flex-col">
      {compact && <div className="flex gap-2 overflow-x-auto pb-3 mb-3">
        {experiences.map(item => <button key={item.id} type="button" onClick={() => onSelect(item.id)} aria-pressed={activeId === item.id}
          className="px-3 py-2 bg-paper-soft text-xs whitespace-nowrap border border-ink/10 aria-pressed:bg-accent-sky">{item.company}</button>)}
      </div>}
      {!active ? <div className="flex-1" aria-label="请选择一段实习经历" /> :
      <div className="experience-detail diary-scroll overflow-y-auto pr-2">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div><p className="font-hand text-2xl text-accent-clayDeep">{active.company}</p><h2 className="font-serif text-xl font-semibold text-ink mt-1">{active.direction}</h2></div>
          <span className="text-xs text-ink-soft whitespace-nowrap mt-2">{active.period}</span>
        </div>
        <p className="text-sm leading-7 text-ink-soft mb-6">{active.description}</p>
        {active.projects.map(project => <section key={project.title} className="experience-project">
          <h3 className="font-serif text-base font-semibold leading-6 text-ink">{project.title}</h3>
          <p className="text-xs leading-6 text-ink-soft mt-2"><strong>项目背景：</strong>{project.background}</p>
          <ol className="mt-3 space-y-2 list-decimal pl-5 text-xs leading-6 text-ink-soft">
            {project.responsibilities.map(item => {
              const splitAt = item.indexOf('：')
              return <li key={item}>{splitAt > 0 ? <><strong className="text-ink">{item.slice(0, splitAt + 1)}</strong>{item.slice(splitAt + 1)}</> : item}</li>
            })}
          </ol>
        </section>)}
      </div>}
    </div>
  )
}
