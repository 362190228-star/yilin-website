import { useState } from 'react'
import { featuredHonorIds, honors } from '../../data/honors'
import { PageNumber } from '../PageNumber'

export function HonorsIntroPage() {
  const [photosSpread, setPhotosSpread] = useState(false)
  const featuredHonors = featuredHonorIds
    .map(id => honors.find(honor => honor.id === id))
    .filter(honor => honor !== undefined)

  return (
    <div className="honors-intro h-full flex flex-col">
      <PageNumber value="04" />
      <h1 className="bilingual-title font-serif text-2xl sm:text-3xl font-semibold text-ink mb-5">
        个人荣誉 <span>Honors &amp; Awards</span>
      </h1>
      <p className="text-sm leading-8 text-ink-soft texture-ruled pt-1">
        曾获得南京林业大学优秀毕业生、优秀班干，连续四年获得优秀学生奖学金，获得武汉理工大学二等奖学金。
      </p>
      <div
        className={`honors-intro__photos${photosSpread ? ' is-spread' : ''}`}
        aria-label="荣誉活动照片"
        tabIndex={0}
        onPointerEnter={() => setPhotosSpread(true)}
        onPointerMove={() => setPhotosSpread(true)}
        onFocus={() => setPhotosSpread(true)}
      >
        {featuredHonors.map((honor, index) => (
          <figure key={honor.id} className="honor-card">
            <div className="honor-card__image">
              <img src={honor.image} alt={`荣誉活动照片 ${index + 1}`} loading="lazy" />
            </div>
          </figure>
        ))}
      </div>
    </div>
  )
}
