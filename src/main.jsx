/*
THESIS: This portfolio is a private designer's notebook, refusing the resume-scroll and SaaS landing page defaults.
OWN-WORLD: Soft gray desk, warm paper, tabbed date index, taped photos, lined notes, binder rings, quiet ink and tiny sky-blue pencil marks.
STORY: A hiring viewer flips through About, Growth, Works, and Life to understand Yilin's practice, evidence, and personal texture.
FIRST VIEWPORT: Left bookmark tabs sit beside one open notebook; each spread carries real portfolio material as scrapbook artifacts.
FORM: Brief-pinned diary/notebook world, built as a full-surface tabbed page-turn interaction with restrained paper motion.
*/
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Copy, Mail, MapPin, Phone, X } from "lucide-react";
import { contacts, internships, profile, projects } from "./data/content";
import { modalMotion } from "./data/motion";
import "./styles.css";

const notebookTabs = [
  { id: "about", label: "关于我", stamp: "01", date: "About" },
  { id: "growth", label: "成长经历", stamp: "02", date: "Growth" },
  { id: "works", label: "作品展示", stamp: "03", date: "Works" },
  { id: "life", label: "个人生活", stamp: "04", date: "Life" },
];

const pageTurn = {
  initial: (direction) => ({
    opacity: 0,
    rotateY: direction > 0 ? -10 : 10,
    x: direction > 0 ? 34 : -34,
    filter: "blur(3px)",
  }),
  animate: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 88, damping: 24, mass: 0.9 },
  },
  exit: (direction) => ({
    opacity: 0,
    rotateY: direction > 0 ? 8 : -8,
    x: direction > 0 ? -28 : 28,
    filter: "blur(2px)",
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  }),
};

function clampPage(index) {
  return Math.max(0, Math.min(notebookTabs.length - 1, index));
}

function NotebookTabs({ activeIndex, onSelect }) {
  return (
    <aside className="notebook-tabs" aria-label="作品集章节">
      <div className="notebook-brand">
        <span className="notebook-brand-mark">Y</span>
        <span>
          <strong>Yilin Cai</strong>
          <small>Portfolio diary</small>
        </span>
      </div>
      <div className="notebook-tab-list">
        {notebookTabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            className={"notebook-tab " + (activeIndex === index ? "is-active" : "")}
            onClick={() => onSelect(index)}
            aria-current={activeIndex === index ? "page" : undefined}
          >
            <span className="notebook-tab-date">{tab.stamp}</span>
            <span className="notebook-tab-label">{tab.label}</span>
            <span className="notebook-tab-note">{tab.date}</span>
          </button>
        ))}
      </div>
      <p className="notebook-tab-hint">滚轮 / 方向键翻页</p>
    </aside>
  );
}

function NotebookShell({ children, activeIndex, direction, onPrev, onNext }) {
  return (
    <section className="notebook-shell" aria-label={notebookTabs[activeIndex].label}>
      <div className="notebook-cover-glow" aria-hidden="true" />
      <div className="notebook-spine" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <span key={item} className="notebook-ring">
            <i />
          </span>
        ))}
      </div>
      <div className="notebook-paper left-page" />
      <div className="notebook-paper right-page" />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={notebookTabs[activeIndex].id}
          className="notebook-spread"
          custom={direction}
          variants={pageTurn}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <div className="notebook-page-controls" aria-label="翻页">
        <button type="button" onClick={onPrev} disabled={activeIndex === 0} aria-label="上一页">
          <ArrowLeft size={18} />
        </button>
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(notebookTabs.length).padStart(2, "0")}</span>
        <button type="button" onClick={onNext} disabled={activeIndex === notebookTabs.length - 1} aria-label="下一页">
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

function PaperTitle({ kicker, title, children }) {
  return (
    <header className="paper-title">
      <span>{kicker}</span>
      <h1>{title}</h1>
      {children ? <p>{children}</p> : null}
    </header>
  );
}

function AboutSpread({ onCopy }) {
  return (
    <>
      <article className="notebook-page about-left">
        <PaperTitle kicker="Entry 01 / Who I am" title={`你好，我是${profile.name}`}>
          交互设计方向研究生，关注 AI 产品体验、智能体交互、复杂任务流程优化与视觉表达。
        </PaperTitle>
        <div className="polaroid portrait-polaroid">
          <img src="/assets/yilin-portrait.jpg" alt="蔡艺琳个人照片" />
          <span>UX Designer · AI Native</span>
        </div>
        <div className="washi-line">
          <span>AI 产品体验</span>
          <span>交互设计</span>
          <span>Vibe Coding</span>
        </div>
      </article>
      <article className="notebook-page about-right">
        <div className="sticky-note intro-note">
          <strong>Personal note</strong>
          <p>我希望把复杂技术拆成自然、可信、可被理解的产品体验，让智能真正服务于人。</p>
        </div>
        <section className="lined-paper">
          <h2>关键词</h2>
          <ul>
            {profile.advantages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <div className="contact-stamps">
          {contacts.slice(0, 3).map((item) => (
            <button type="button" key={item.label} onClick={() => onCopy(item.value)}>
              {item.label === "邮箱" ? <Mail size={15} /> : item.label === "电话" ? <Phone size={15} /> : <Copy size={15} />}
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </button>
          ))}
        </div>
      </article>
    </>
  );
}

function GrowthSpread() {
  const stats = [
    ["4", "段实习与项目历练"],
    ["371", "天一线产品现场"],
    ["3+", "AI 产品方向"],
  ];

  return (
    <>
      <article className="notebook-page growth-left">
        <PaperTitle kicker="Entry 02 / Timeline" title="成长经历">
          从校园项目、黑客松到 AI 产品一线实习，持续把复杂产品问题拆成清晰的体验路径。
        </PaperTitle>
        <div className="timeline-thread">
          {internships.map((item) => (
            <div key={item.id} className="thread-item">
              <span className="thread-logo"><img src={item.logo} alt="" /></span>
              <div>
                <b>{item.company}</b>
                <small>{item.date} · {item.role}</small>
              </div>
            </div>
          ))}
        </div>
        <dl className="notebook-stats">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </article>
      <article className="notebook-page growth-right">
        <div className="clip-note">能力成长札记</div>
        <div className="experience-stack">
          {internships.map((item, index) => (
            <section key={item.id} style={{ "--tilt": `${index % 2 ? 1.2 : -1.4}deg` }}>
              <span><img src={item.logo} alt="" /></span>
              <div>
                <p>{item.role}</p>
                <h2>{item.company}</h2>
                <small>{item.summary}</small>
              </div>
            </section>
          ))}
        </div>
        <div className="lined-paper compact">
          <h2>设计方法</h2>
          <p>用用户路径、场景拆解、组件沉淀和 AI Demo 快速验证，把设计判断落到可沟通、可测试、可迭代的材料里。</p>
        </div>
      </article>
    </>
  );
}

function WorksSpread({ onOpenProject }) {
  const featured = projects[0];

  return (
    <>
      <article className="notebook-page works-left">
        <PaperTitle kicker="Entry 03 / Selected works" title="作品展示">
          项目像夹在日记本里的研究页：封面、标签和一句判断，点击可以打开完整案例图。
        </PaperTitle>
        <button type="button" className="featured-project-polaroid" onClick={() => onOpenProject(featured)}>
          <img src={featured.image} alt={featured.title} />
          <span>{featured.category}</span>
          <strong>{featured.title}</strong>
        </button>
        <p className="pencil-caption">点击项目贴纸查看完整详情。</p>
      </article>
      <article className="notebook-page works-right">
        <div className="project-scrap-grid">
          {projects.slice(1).map((project, index) => (
            <button
              type="button"
              key={project.id}
              className="scrap-project"
              style={{ "--rotate": `${[-2, 1.5, -1][index % 3]}deg` }}
              onClick={() => onOpenProject(project)}
            >
              <img src={project.image} alt={project.title} />
              <span>{project.category}</span>
              <strong>{project.title}</strong>
              <em>{project.tags.filter((tag) => tag !== "占位").slice(0, 2).join(" / ")}</em>
            </button>
          ))}
        </div>
      </article>
    </>
  );
}

function LifeSpread({ onCopy }) {
  return (
    <>
      <article className="notebook-page life-left">
        <PaperTitle kicker="Entry 04 / Off work" title="个人生活">
          生活里保留观察、手感和一点松弛感，这些也会回到我的设计判断里。
        </PaperTitle>
        <div className="life-photo-board">
          <figure className="life-photo large">
            <img src="/assets/contact-background.png" alt="个人生活氛围照片" />
            <figcaption>collect quiet moments</figcaption>
          </figure>
          <figure className="life-photo">
            <img src="/assets/hero-background.png" alt="作品集视觉氛围照片" />
            <figcaption>sky, plants, camera</figcaption>
          </figure>
        </div>
      </article>
      <article className="notebook-page life-right">
        <div className="hobby-stickers">
          {profile.hobbies.map((hobby) => (
            <span key={hobby}>{hobby}</span>
          ))}
        </div>
        <section className="lined-paper life-note">
          <h2>最后一页</h2>
          <p>我喜欢拍照、做饭、养花和瑜伽，也喜欢把松弛、秩序和细节感放进界面里。作品集不是一份表格，而是一条能被翻阅的成长路径。</p>
        </section>
        <button type="button" className="mail-ticket" onClick={() => onCopy(profile.email)}>
          <Mail size={18} />
          <span>写信给我</span>
          <strong>{profile.email}</strong>
        </button>
        <p className="location-note"><MapPin size={15} />武汉理工大学 · 交互设计</p>
      </article>
    </>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }
    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-[#1f1b16]/45 p-4 backdrop-blur-[5px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        variants={modalMotion}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label={project.title + "项目详情"}
        className="project-modal-panel relative h-[85vh] w-[min(82vw,1280px)] overflow-hidden rounded-[24px] bg-[#fffdf7] shadow-[0_28px_72px_rgba(42,34,22,0.24)] max-lg:w-[92vw]"
      >
        <button type="button" aria-label="关闭项目详情" onClick={onClose} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-sm transition hover:bg-[#f3eee4]">
          <X size={20} />
        </button>
        <div className="h-full overflow-y-auto p-2">
          <div className="grid gap-2">
            {(project.detailImages || []).map((image, index) => (
              <figure key={image} className="project-modal-figure overflow-hidden rounded-[18px] bg-[#eee7da]">
                <img src={image} alt={project.title + "详情图 " + String(index + 1).padStart(2, "0")} className="block h-auto w-full" loading={index === 0 ? "eager" : "lazy"} decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

function Toast({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="notebook-toast"
          role="status"
          aria-live="polite"
        >
          已复制
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NotebookPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeProject, setActiveProject] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const wheelLockRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const currentTab = notebookTabs[activeIndex];
  const spreads = useMemo(() => ({
    about: <AboutSpread onCopy={handleCopy} />,
    growth: <GrowthSpread />,
    works: <WorksSpread onOpenProject={setActiveProject} />,
    life: <LifeSpread onCopy={handleCopy} />,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [activeIndex]);

  function goTo(index) {
    const next = clampPage(index);
    if (next === activeIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  }

  function nextPage() {
    goTo(activeIndex + 1);
  }

  function prevPage() {
    goTo(activeIndex - 1);
  }

  async function handleCopy(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1500);
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        nextPage();
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        prevPage();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 18 || wheelLockRef.current) return;
      event.preventDefault();
      wheelLockRef.current = true;
      if (event.deltaY > 0) nextPage();
      if (event.deltaY < 0) prevPage();
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, reduceMotion ? 180 : 760);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  });

  return (
    <main className="notebook-portfolio">
      <NotebookTabs activeIndex={activeIndex} onSelect={goTo} />
      <NotebookShell activeIndex={activeIndex} direction={direction} onPrev={prevPage} onNext={nextPage}>
        {spreads[currentTab.id]}
      </NotebookShell>
      <AnimatePresence>
        {activeProject ? <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}
      </AnimatePresence>
      <Toast visible={toastVisible} />
    </main>
  );
}

const rootElement = document.getElementById("root");
const root = rootElement._reactRoot || createRoot(rootElement);
rootElement._reactRoot = root;
root.render(<React.StrictMode><NotebookPortfolio /></React.StrictMode>);
