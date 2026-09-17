import { useState } from 'react'
import { NotebookCover } from './components/NotebookCover'
import { NotebookLayout } from './components/NotebookLayout'
import { DiaryPage } from './components/DiaryPage'
import { SideTabs, type TabItem } from './components/SideTabs'
import { MobileTabBar } from './components/MobileTabBar'
import { PageNavigation } from './components/PageNavigation'
import { PageIntro } from './components/pages/PageIntro'
import { AboutPage } from './components/pages/AboutPage'
import { ExperiencePage } from './components/pages/ExperiencePage'
import { WorksPage } from './components/pages/WorksPage'
import { HobbyPage } from './components/pages/HobbyPage'
import { ContactPage } from './components/pages/ContactPage'
import { AboutIntroPage } from './components/pages/AboutIntroPage'
import { ExperienceIndexPage } from './components/pages/ExperienceIndexPage'
import { HobbyIndexPage } from './components/pages/HobbyIndexPage'
import { HonorsPage } from './components/pages/HonorsPage'
import { HonorsIntroPage } from './components/pages/HonorsIntroPage'
import { ContactIntroPage } from './components/pages/ContactIntroPage'
import { usePageFlip } from './hooks/usePageFlip'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useBookSwipe } from './hooks/useBookSwipe'

const tabs: TabItem[] = [
  { label: '关于我', accent: 'sky' },
  { label: '实习经历', accent: 'clay' },
  { label: '个人作品', accent: 'moss' },
  { label: '个人荣誉', accent: 'clay' },
  { label: '我的生活', accent: 'brass' },
  { label: '联系我', accent: 'sky' },
]

const introContent = [
  {
    index: '01',
    title: '关于我',
    subtitle: 'About Me',
    description:
      '这一页写着我是谁、在做什么方向的设计，以及我看待复杂产品体验的方式。右边贴着几张随手拍的照片。',
  },
  {
    index: '02',
    title: '实习经历',
    subtitle: 'Experience',
    description:
      '一份按时间顺序贴起来的经历便签，记录了我在不同公司里参与过的方向和项目类型。',
  },
  {
    index: '03',
    title: '个人作品',
    subtitle: 'Selected Works',
    description:
      '六个项目贴在这一页里，点击任意一张可以打开详情，看看具体做了什么、解决了什么问题。',
  },
  {
    index: '04',
    title: '个人荣誉',
    subtitle: 'Honors & Awards',
    description:
      '曾获得南京林业大学优秀毕业生、优秀班干，连续四年获得优秀学生奖学金，获得武汉理工大学二等奖学金。',
  },
  {
    index: '05',
    title: '我的生活',
    subtitle: 'Life & Interests',
    description:
      '设计之外的我：喜欢拍照、旅行、做手帐，也喜欢在生活里观察各种产品的小细节。',
  },
  {
    index: '06',
    title: '联系我',
    subtitle: 'Get in Touch',
    description: '如果看到这里想聊聊，翻到右边可以找到联系方式，也欢迎下载简历和作品集。',
  },
]

function getRightPage(index: number, options: {
  onWorksModalChange?: (isOpen: boolean) => void
  activeExperience: string
  setActiveExperience: (id: string) => void
  activeHobby: string
  setActiveHobby: (id: string) => void
  desktop: boolean
}) {
  switch (index) {
    case 0:
      return <AboutPage key="about" />
    case 1:
      return <ExperiencePage key="experience" activeId={options.activeExperience} onSelect={options.setActiveExperience} compact={!options.desktop} />
    case 2:
      return <WorksPage key="works" section={options.desktop ? 'right' : 'all'} onModalStateChange={options.onWorksModalChange} />
    case 3:
      return <HonorsPage key="honors" compact={!options.desktop} />
    case 4:
      return <HobbyPage key={`hobby-${options.activeHobby || 'empty'}`} activeId={options.activeHobby} onSelect={options.setActiveHobby} compact={!options.desktop} />
    case 5:
    default:
      return <ContactPage key="contact" />
  }
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeExperience, setActiveExperience] = useState('')
  const [stampedExperiences, setStampedExperiences] = useState<string[]>([])
  const [stampingExperience, setStampingExperience] = useState('')
  const [activeHobby, setActiveHobby] = useState('')
  const isDesktop = useMediaQuery('(min-width: 900px)')
  const { currentPage, turn, completeTurn, goTo, next, prev, canGoNext, isAnimating } = usePageFlip({
    pageCount: tabs.length,
    enabled: isOpen && !isModalOpen,
    onBeforeFirst: () => setIsOpen(false),
    onAfterLast: () => setIsOpen(false),
  })
  const swipe = useBookSwipe({ enabled: isOpen && !isDesktop && !isModalOpen && !isAnimating, next, prev })
  const selectedPage = turn?.to ?? currentPage
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-desk-gradient">
      <div className="pointer-events-none absolute inset-0 texture-paper opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/5" />
      {!isOpen ? <NotebookCover onOpen={() => setIsOpen(true)} /> : (
        <div className="notebook-workspace">
          {!isDesktop && <MobileTabBar tabs={tabs} activeIndex={selectedPage} onSelect={goTo} disabled={isAnimating || isModalOpen} />}
          <div className="notebook-desk">
            {isDesktop && <div className="notebook-index"><SideTabs tabs={tabs} activeIndex={selectedPage} onSelect={goTo} disabled={isAnimating || isModalOpen} /></div>}
            <div className="notebook-paper shadow-notebook" {...swipe}>
              <NotebookLayout desktop={isDesktop} turn={turn} currentPage={currentPage} onComplete={completeTurn} blocked={isModalOpen}
                renderLeft={index => <DiaryPage side="left">{
                  index === 0 ? <AboutIntroPage />
                    : index === 1 ? <ExperienceIndexPage activeId={activeExperience} stampedIds={stampedExperiences} stampingId={stampingExperience} onSelect={id => {
                      setActiveExperience(id)
                      if (!stampedExperiences.includes(id)) {
                        setStampingExperience(id)
                        window.setTimeout(() => setStampingExperience(value => value === id ? '' : value), 420)
                        setStampedExperiences(current => [...current, id])
                      }
                    }} />
                    : index === 2 ? <WorksPage section="left" onModalStateChange={setIsModalOpen} />
                    : index === 3 ? <HonorsIntroPage />
                    : index === 4 ? <HobbyIndexPage activeId={activeHobby} onSelect={setActiveHobby} />
                    : index === 5 ? <ContactIntroPage />
                    : <PageIntro {...introContent[index]} />
                }</DiaryPage>}
                renderRight={(index, visual) => <DiaryPage side={isDesktop ? 'right' : 'single'}>{getRightPage(index, {
                  onWorksModalChange: visual ? undefined : setIsModalOpen,
                  activeExperience,
                  setActiveExperience,
                  activeHobby,
                  setActiveHobby,
                  desktop: isDesktop,
                })}</DiaryPage>} />
              <PageNavigation canNext={canGoNext} disabled={isAnimating || isModalOpen} onPrev={prev} onNext={next} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
