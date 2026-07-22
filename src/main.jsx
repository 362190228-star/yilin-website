import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, Menu, Star, X } from "lucide-react";
import { contacts, internships, navItems, profile, projects } from "./data/content";
import { modalMotion } from "./data/motion";
import "./styles.css";

const videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_153826_e9005cf7-a1c7-4c7d-886f-fea22d644a9c.mp4";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const desktopItems = [
    { label: "关于", id: "about" },
    { label: "实习", id: "internship" },
    { label: "项目", id: "projects" },
    { label: "联系", id: "contact" },
  ];

  return (
    <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
      <button type="button" onClick={() => scrollToSection("hero")} className="flex items-center gap-2" aria-label="返回首页">
        <Star className="h-5 w-5 fill-black text-black" />
        <span className="text-lg font-semibold text-black">Yilin.ai</span>
      </button>

      <div className="hidden items-center gap-8 md:flex">
        {desktopItems.map((item) => (
          <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="flex items-center gap-1 text-sm text-gray-700 transition-colors hover:text-black">
            {item.label}
          </button>
        ))}
      </div>

      <button type="button" onClick={() => setOpen(!open)} className="sm:hidden" aria-label="打开菜单">
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="animate-fade-in-overlay absolute left-0 right-0 top-[60px] z-30 border-b border-gray-200 bg-white/95 px-6 py-4 backdrop-blur-md sm:hidden">
          <div className="grid gap-4">
            {desktopItems.map((item) => (
              <button key={item.id} type="button" onClick={() => { setOpen(false); scrollToSection(item.id); }} className="text-left text-sm text-gray-700">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-white font-inter">
      <video src={videoSrc} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover pt-[120px] md:pt-[200px]" />
      <div className="pointer-events-none absolute left-0 right-0 top-[120px] z-10 h-[200px] bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute left-0 right-0 top-[200px] z-10 hidden h-[300px] bg-gradient-to-b from-white to-transparent md:block" />
      <div className="pointer-events-none absolute left-0 right-0 top-[120px] z-10 h-[200px] bg-gradient-to-b from-white to-transparent md:hidden" />
      <Navbar />

      <div className="relative z-20 mx-auto max-w-7xl px-4 pb-16 pt-6 text-center sm:px-6 sm:pb-32 sm:pt-12">
        <div className="mb-5 inline-flex items-center gap-2 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <span className="flex h-6 w-6 items-center justify-center rounded border border-gray-300"><Star className="h-4 w-4 fill-black text-black" /></span>
          <span className="text-xs font-medium text-black sm:text-sm">UX Designer / {profile.school}</span>
        </div>

        <h1 className="mb-4 text-[38px] font-normal leading-[1.1] tracking-tight text-black sm:mb-5 sm:text-6xl md:text-7xl lg:text-[80px] animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <span className="hero-title-kicker">Know About Me</span><br /><span className="hero-title-name">Yilin</span>
        </h1>


        <button type="button" onClick={() => scrollToSection("projects")} className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 sm:px-8 sm:text-base animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          查看作品集
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-3 px-4 pb-4 sm:gap-4 sm:pb-8 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
        <div className="flex flex-wrap justify-center gap-5 sm:gap-12 md:gap-16">
          {internships.map((item) => (
            <span key={item.id} className="text-lg italic tracking-tight text-white sm:text-2xl md:text-3xl">{item.company}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="minimal-section">
      <div className="mx-auto w-full max-w-7xl">
        <p className="minimal-eyebrow">{eyebrow}</p>
        <h2 className="minimal-heading">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="minimal-section">
      <div className="mx-auto w-full max-w-7xl">
        <div className="about-layout grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="overflow-hidden rounded-[32px] border border-gray-200 bg-gray-50"><img src="/assets/yilin-portrait.jpg" alt="蔡艺琳个人照片" className="h-full min-h-[520px] w-full object-cover object-[50%_36%]" /></article>
          <div className="grid content-center gap-4">
            <div className="about-copy-heading">
              <p className="minimal-eyebrow">About Me</p>
              <h2 className="minimal-heading">你好，我是{profile.name}</h2>
            </div>
            <div className="about-intro-copy"><p className="text-lg leading-9 text-gray-600">一名交互设计方向的研究生，关注 AI 产品体验、智能体交互、复杂任务流程优化与视觉表达，目前正在探索如何让 AI 产品更自然、可信。</p></div>
            <div className="grid gap-4 sm:grid-cols-2">{[["学校", profile.school], ["专业", profile.major], ["邮箱", profile.email], ["电话", profile.phone]].map(([label, value]) => <div key={label} className="rounded-3xl border border-gray-200 bg-white p-5"><p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{label}</p><p className="mt-3 break-words text-base font-semibold text-black">{value}</p></div>)}</div>
            <div className="rounded-[32px] border border-gray-200 bg-white p-6"><p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">个人优势</p><ul className="grid gap-4 text-sm leading-7 text-gray-600 md:text-base">{profile.advantages.map((item) => <li key={item} className="grid grid-cols-[10px_1fr] gap-3"><span className="mt-3 h-2 w-2 rounded-full bg-black" /><span>{item}</span></li>)}</ul></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Internship() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeItem = internships[activeIndex] || internships[0];

  return (
    <section id="internship" className="internship-timeline-section">
      <div className="internship-timeline-sticky">
        <div className="internship-timeline-shell">
          <div className="internship-timeline-heading">
            <p className="minimal-eyebrow">Experience Timeline</p>
            <h2>成长经历</h2>
          </div>

          <div className="internship-timeline-layout">
            <aside className="internship-timeline-list" aria-label="成长经历时间轴">
              <div className="internship-timeline-line" aria-hidden="true" />
              {internships.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={"internship-timeline-item " + (isActive ? "is-active" : "")}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className="internship-timeline-dot" aria-hidden="true" />
                    <span className="internship-timeline-content">
                      <span className="internship-timeline-date">{item.date}</span>
                      <span className="internship-timeline-company">{item.company}</span>
                      <span className="internship-timeline-role">{item.role}</span>
                    </span>
                  </button>
                );
              })}
            </aside>

            <article className="internship-detail-panel internship-timeline-detail">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="text-sm font-medium text-gray-500">{activeItem.role}</p>
                  <h3 className="mt-3 text-5xl font-semibold leading-none tracking-tight text-black md:text-6xl">
                    {activeItem.company}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2 text-sm font-medium text-gray-500">
                    <span className="rounded-full bg-gray-100 px-3 py-1">{activeItem.date}</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1">{activeItem.location}</span>
                  </div>
                  <p className="mt-7 max-w-3xl text-base leading-8 text-gray-600">{activeItem.detail}</p>
                  <div className="mt-8 grid gap-5">
                    {(activeItem.detailSections || []).map((section) => (
                      <section key={section.title} className="internship-detail-item">
                        <h4>{section.title}</h4>
                        <p>{section.background}</p>
                        {section.responsibilities?.length ? (
                          <div className="internship-responsibilities">
                            <p className="internship-responsibilities-label">工作职责</p>
                            <ol>
                              {section.responsibilities.map((responsibility) => (
                                <li key={responsibility}>{responsibility}</li>
                              ))}
                            </ol>
                          </div>
                        ) : null}
                      </section>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ onOpenProject }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const projectSlots = Array.from({ length: 5 }, (_, index) => {
    const project = projects[index];
    if (project) return { ...project, placeholder: false };
    const fallback = projects[index % Math.max(projects.length, 1)];
    return {
      id: "placeholder-" + index,
      title: "预留项目 " + String(index + 1).padStart(2, "0"),
      category: "Coming Soon",
      description: "为后续作品预留展示位置。",
      tags: ["Reserved"],
      image: fallback?.image || "/assets/project-01/project-01-01.png",
      detailImages: [],
      placeholder: true,
    };
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const syncActiveCard = () => {
      const cards = Array.from(track.querySelectorAll(".project-gallery-card"));
      const trackBox = track.getBoundingClientRect();
      const trackCenter = trackBox.left + trackBox.width / 2;
      let nextIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardBox = card.getBoundingClientRect();
        const cardCenter = cardBox.left + cardBox.width / 2;
        const distance = Math.abs(trackCenter - cardCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    };

    const requestSync = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(syncActiveCard);
    };

    const initialCard = track.querySelectorAll(".project-gallery-card")[1];
    if (initialCard) {
      track.scrollLeft = initialCard.offsetLeft - (track.clientWidth - initialCard.clientWidth) / 2;
    }
    requestSync();
    track.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      track.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  const focusProjectCard = (index) => {
    const nextIndex = Math.max(0, Math.min(projectSlots.length - 1, index));
    const card = trackRef.current?.querySelectorAll(".project-gallery-card")[nextIndex];
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const handleGalleryKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    focusProjectCard(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  };

  const goToPreviousProject = () => focusProjectCard(activeIndex - 1);
  const goToNextProject = () => focusProjectCard(activeIndex + 1);

  return (
    <section id="projects" className="project-gallery-section">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="project-gallery-header flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="minimal-eyebrow text-white/50">Selected Works</p>
            <h2 className="mt-5 text-5xl font-normal leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-[86px]">
              作品展示
            </h2>
          </div>
        </div>

        <div className="project-gallery-stage">
          <div ref={trackRef} className="project-gallery-track" tabIndex={0} onKeyDown={handleGalleryKeyDown} aria-label="作品横向画廊">
          {projectSlots.map((project, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                type="button"
                key={project.id}
                onClick={() => {
                  if (!isActive) {
                    focusProjectCard(index);
                    return;
                  }
                  if (!project.placeholder) onOpenProject(project);
                }}
                aria-current={isActive ? "true" : undefined}
                className={"project-gallery-card " + (project.placeholder ? "is-placeholder " : "") + (isActive ? "is-active" : "")}
              >
                <span className="project-gallery-cover">
                  <img src={project.image} alt={project.title + "项目封面"} />
                </span>
                <span className="project-gallery-card-body">
                  <span className="project-gallery-title-row">
                    <span className="project-gallery-card-title">{project.title}</span>
                    <span className="project-gallery-personal-tag">个人</span>
                  </span>
                </span>
              </button>
            );
          })}
          </div>
          <div className="project-gallery-controls" aria-label="作品切换">
            <button type="button" onClick={goToPreviousProject} disabled={activeIndex === 0} aria-label="上一个作品">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={goToNextProject} disabled={activeIndex === projectSlots.length - 1} aria-label="下一个作品">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ onCopy }) {
  return (
    <section id="contact" className="minimal-section flex min-h-screen items-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <p className="minimal-eyebrow">Contact</p>
        <h2 className="minimal-heading mx-auto mt-4 max-w-4xl text-center">Beyond Design</h2>
        <p className="mx-auto mt-8 max-w-3xl text-balance text-xl font-normal leading-9 text-gray-600 md:text-3xl md:leading-[1.35]">
          希望创造自然、可信、富有温度的产品体验，让复杂的技术变得简单，让智能真正服务于人。
        </p>
        <a
          href={"mailto:" + profile.email}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 md:text-base"
        >
          聊一聊
        </a>

        <div className="mt-14 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => onCopy(item.value)}
              className="rounded-3xl border border-gray-200 bg-white p-5 text-center transition-colors hover:bg-gray-50"
            >
              <span className="inline-flex items-center justify-center gap-2 text-sm text-gray-500">
                {item.label}
                <Copy size={15} />
              </span>
              <strong className="mt-5 block break-words text-base font-semibold tracking-tight text-black lg:text-lg">
                {item.value}
              </strong>
            </button>
          ))}
        </div>

        <footer className="mt-16 flex w-full flex-col items-center justify-center gap-2 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:gap-4">
          <p>© 2026 Yilin Cai.</p>
          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
          <p>Designed with care.</p>
        </footer>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    function closeOnEscape(event) { if (event.key === "Escape") onClose(); }
    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.body.classList.remove("overflow-hidden"); document.removeEventListener("keydown", closeOnEscape); };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.section variants={modalMotion} initial="hidden" animate="visible" exit="exit" role="dialog" aria-modal="true" aria-label={project.title + "项目详情"} className="relative h-[85vh] w-[min(80vw,1280px)] overflow-hidden rounded-[32px] bg-white shadow-[0_28px_72px_rgba(0,0,0,0.22)] max-lg:w-[92vw]">
        <button type="button" aria-label="关闭项目详情" onClick={onClose} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-sm transition hover:bg-gray-100"><X size={20} /></button>
        <div className="h-full overflow-y-auto p-1"><div className="grid gap-1">{(project.detailImages || []).map((image, index) => <figure key={image} className="overflow-hidden rounded-3xl bg-gray-100"><img src={image} alt={project.title + "详情图 " + String(index + 1).padStart(2, "0")} className="block h-auto w-full" loading="lazy" /></figure>)}</div></div>
      </motion.section>
    </motion.div>
  );
}

function Toast({ visible }) {
  return <AnimatePresence>{visible && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.22 }} className="fixed bottom-7 right-7 z-[60] flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg" role="status" aria-live="polite"><Check size={16} />已复制</motion.div>}</AnimatePresence>;
}

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  async function handleCopy(value) {
    try { await navigator.clipboard.writeText(value); } catch {
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
  return <><main><Hero /><About /><Internship /><Projects onOpenProject={setActiveProject} /><Contact onCopy={handleCopy} /></main><AnimatePresence>{activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence><Toast visible={toastVisible} /></>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
