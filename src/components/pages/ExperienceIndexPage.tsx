import type { Experience } from '../../types'
import { experiences } from '../../data/experiences'
import { PageNumber } from '../PageNumber'
import { asset } from '../../utils/asset'

const stampImages: Record<string, { empty: string; stamped: string; seal: string }> = {
  jd: { empty: asset('assets/experience-stamps/jd-empty.png'), stamped: asset('assets/experience-stamps/jd-stamped.png'), seal: asset('assets/experience-stamps/jd-seal.png') },
  zhipu: { empty: asset('assets/experience-stamps/zhipu-empty.png'), stamped: asset('assets/experience-stamps/zhipu-stamped.png'), seal: asset('assets/experience-stamps/zhipu-seal.png') },
  iflytek: { empty: asset('assets/experience-stamps/iflytek-empty.png'), stamped: asset('assets/experience-stamps/iflytek-stamped.png'), seal: asset('assets/experience-stamps/iflytek-seal.png') },
}

export function ExperienceIndexPage({ activeId, stampedIds, stampingId, onSelect }: { activeId: string; stampedIds: string[]; stampingId: string; onSelect: (id: string) => void }) {
  return (
    <div className="h-full flex flex-col">
      <PageNumber value="02" />
      <h1 className="bilingual-title font-serif text-3xl sm:text-4xl font-semibold text-ink mb-8">实习经历 <span>Experience</span></h1>
      <div className="experience-stamps">
        {experiences.map((experience, index) => (
          <ExperienceNote key={experience.id} experience={experience} index={index} active={activeId === experience.id} stamped={stampedIds.includes(experience.id)} stamping={stampingId === experience.id} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

function ExperienceNote({ experience, index, active, stamped, stamping, onSelect }: {
  experience: Experience; index: number; active: boolean; stamped: boolean; stamping: boolean; onSelect: (id: string) => void
}) {
  const images = stampImages[experience.id]
  return (
    <button type="button" onClick={() => onSelect(experience.id)} aria-pressed={active}
      className={`experience-stamp experience-stamp--${index + 1}${active ? ' is-active' : ''}${stamped ? ' is-stamped' : ''}${stamping ? ' is-stamping' : ''}`}>
      <img className="experience-stamp__base" src={images.empty} alt={`${experience.company}，${experience.period}，${experience.direction}`} />
      <img className="experience-stamp__seal" src={images.seal} alt="" aria-hidden="true" />
      <img className="experience-stamp__post-lines" src={images.stamped} alt="" aria-hidden="true" />
    </button>
  )
}
