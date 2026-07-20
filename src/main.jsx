import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy, Menu, Star, X } from "lucide-react";
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
    { label: "关于", id: "about", hasMenu: true },
    { label: "实习", id: "internship", hasMenu: true },
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
            {item.hasMenu && <ChevronDown className="h-4 w-4" />}
          </button>
        ))}
      </div>

      <div className="hidden items-center gap-4 sm:flex">
        <button type="button" onClick={() => scrollToSection("contact")} className="text-sm text-gray-700 transition-colors hover:text-black">邮箱</button>
        <button type="button" onClick={() => scrollToSection("projects")} className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">查看作品</button>
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
            <div className="grid gap-3 border-t border-gray-200 pt-4">
              <button type="button" onClick={() => { setOpen(false); scrollToSection("contact"); }} className="text-left text-sm text-gray-700">邮箱</button>
              <button type="button" onClick={() => { setOpen(false); scrollToSection("projects"); }} className="w-full rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">查看作品</button>
            </div>
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
          <span className="text-xs font-medium text-black sm:text-sm">AI Native UX Designer / {profile.school}</span>
        </div>

        <h1 className="mb-4 text-[38px] font-normal leading-[1.1] tracking-tight text-black sm:mb-5 sm:text-6xl md:text-7xl lg:text-[80px] animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <span className="sm:hidden">Work Smarter.<br />Design Warmer.<br /><span className="bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent">AI Powers UX.</span></span>
          <span className="hidden sm:inline">Work Smarter. Design Warmer.<br /><span className="bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent">AI Powers UX.</span></span>
        </h1>

        <p className="mx-auto mb-6 max-w-2xl px-2 text-base text-gray-600 sm:mb-8 sm:text-lg md:text-xl animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          交互设计研究生，关注 AI 产品体验、智能体交互、复杂任务流程优化与视觉表达。
        </p>

        <button type="button" onClick={() => scrollToSection("projects")} className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 sm:px-8 sm:text-base animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          查看作品集
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-3 px-4 pb-4 sm:gap-4 sm:pb-8 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
        <div className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-md sm:px-3.5 sm:text-xs">
          Experience across AI Agent, cloud products, AIGC creation, and knowledge systems
        </div>
        <div className="flex flex-wrap justify-center gap-5 sm:gap-12 md:gap-16">
          {internships.map((item) => (
            <span key={item.id} className="text-lg italic tracking-tight text-white sm:text-2xl md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>{item.company}</span>
          ))}
          <span className="text-lg italic tracking-tight text-white sm:text-2xl md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>AI UX</span>
          <span className="text-lg italic tracking-tight text-white sm:text-2xl md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>Design</span>
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
    <Section id="about" eyebrow="About Me" title={"你好，我是" + profile.name}>
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <article className="overflow-hidden rounded-[32px] border border-gray-200 bg-gray-50"><img src="/assets/yilin-portrait.jpg" alt="蔡艺琳个人照片" className="h-full min-h-[520px] w-full object-cover object-[50%_36%]" /></article>
        <div className="grid content-center gap-4">
          <div className="rounded-[32px] border border-gray-200 bg-white p-6 sm:p-8"><p className="text-lg leading-9 text-gray-600">一名交互设计方向的研究生，关注 AI 产品体验、智能体交互、复杂任务流程优化与视觉表达，目前正在探索如何让 AI 产品更自然、可信。</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{[["学校", profile.school], ["专业", profile.major], ["邮箱", profile.email], ["电话", profile.phone]].map(([label, value]) => <div key={label} className="rounded-3xl border border-gray-200 bg-white p-5"><p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{label}</p><p className="mt-3 break-words text-base font-semibold text-black">{value}</p></div>)}</div>
          <div className="rounded-[32px] border border-gray-200 bg-white p-6"><p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">个人优势</p><ul className="grid gap-4 text-sm leading-7 text-gray-600 md:text-base">{profile.advantages.map((item) => <li key={item} className="grid grid-cols-[10px_1fr] gap-3"><span className="mt-3 h-2 w-2 rounded-full bg-black" /><span>{item}</span></li>)}</ul></div>
        </div>
      </div>
    </Section>
  );
}

function Internship() {
  const [active, setActive] = useState(internships[0].id);
  const activeItem = internships.find((item) => item.id === active) || internships[0];
  return (
    <Section id="internship" eyebrow="Internship Map" title="实习成长地图">
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-3 rounded-[32px] border border-gray-200 bg-gray-50 p-4">{internships.map((item, index) => <button type="button" key={item.id} onClick={() => setActive(item.id)} onMouseEnter={() => setActive(item.id)} className={("flex items-center justify-between rounded-3xl p-5 text-left transition-colors " + (active === item.id ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"))}><span><span className="block text-xs opacity-50">0{index + 1}</span><span className="mt-2 block text-2xl font-semibold tracking-tight">{item.company}</span><span className="mt-2 block text-sm opacity-60">{item.date} / {item.location}</span></span><ChevronDown className="h-5 w-5 -rotate-90" /></button>)}</div>
        <article className="rounded-[32px] border border-gray-200 bg-white p-6 md:p-8"><p className="text-sm font-medium text-gray-500">{activeItem.role}</p><h3 className="mt-3 text-4xl font-semibold leading-none tracking-tight text-black md:text-6xl">{activeItem.company}</h3><p className="mt-6 max-w-3xl text-base leading-8 text-gray-600">{activeItem.detail}</p><div className="mt-8 grid gap-5">{(activeItem.detailSections || []).map((section) => <div key={section.title} className="border-t border-gray-200 pt-5"><h4 className="text-xl font-semibold leading-snug text-black">{section.title}</h4><p className="mt-3 text-sm leading-7 text-gray-600">{section.background}</p></div>)}</div></article>
      </div>
    </Section>
  );
}

function Projects({ onOpenProject }) {
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id);
  const [revealedProjects, setRevealedProjects] = useState(() => new Set([projects[0]?.id]));
  const cardRefs = useRef({});

  useEffect(() => {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.dataset.projectId) {
          setActiveProjectId(visible.target.dataset.projectId);
        }
      },
      { threshold: [0.45, 0.6, 0.75], rootMargin: "-18% 0px -22% 0px" },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.dataset.projectId) {
            setRevealedProjects((current) => new Set([...current, entry.target.dataset.projectId]));
          }
        });
      },
      { threshold: 0.15 },
    );

    Object.values(cardRefs.current).forEach((node) => {
      if (node) {
        activeObserver.observe(node);
        revealObserver.observe(node);
      }
    });

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  function scrollToProject(projectId) {
    cardRefs.current[projectId]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section id="projects" className="project-flow-section">
      <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-24 xl:grid-cols-[460px_1fr] xl:gap-40">
        <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-32">
          <div>
            <p className="minimal-eyebrow text-white/50">Selected Works</p>
            <h2 className="mt-5 max-w-md text-4xl font-normal leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              项目目录与滚动展示
            </h2>
            <p className="mt-6 max-w-sm text-sm font-medium leading-7 text-white/55">
              左侧目录跟随右侧项目卡片滚动高亮；点击目录项可以直接定位到对应项目。
            </p>

            <div className="mt-10 grid gap-3 lg:mt-14">
              {projects.map((project, index) => {
                const isActive = activeProjectId === project.id;
                return (
                  <button
                    type="button"
                    key={project.id}
                    onClick={() => scrollToProject(project.id)}
                    className={("rounded-3xl px-5 py-4 text-left transition-colors " + (isActive ? "bg-white text-black" : "bg-black/20 text-white/45 hover:bg-white/10 hover:text-white"))}
                  >
                    <span className="block text-xs opacity-50">0{index + 1}</span>
                    <span className="mt-2 block text-xl font-medium leading-tight tracking-tight">{project.title}</span>
                    <span className="mt-2 block text-sm opacity-60">{project.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 hidden rounded-3xl bg-black/20 p-5 text-sm font-medium leading-6 text-white/55 backdrop-blur-sm lg:block">
            AI Agent、AI 找房、音乐 App 视觉定义。每张卡片保留进入完整项目详情的入口。
          </div>
        </aside>

        <div className="grid gap-10 lg:gap-20">
          {projects.map((project) => {
            const isRevealed = revealedProjects.has(project.id);
            return (
              <article
                key={project.id}
                ref={(node) => {
                  cardRefs.current[project.id] = node;
                }}
                data-project-id={project.id}
                className={("project-flow-card " + (isRevealed ? "is-revealed" : ""))}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/50">{project.category}</p>
                    <h3 className="mt-3 text-3xl font-medium leading-tight tracking-tight text-white md:text-5xl">
                      {project.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    className="hidden shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:inline-flex"
                  >
                    查看详情
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenProject(project)}
                  className="mt-7 block w-full overflow-hidden rounded-[28px] bg-black/30 text-left"
                >
                  <img
                    src={project.image}
                    alt={project.title + "项目封面"}
                    className="aspect-video h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </button>

                <p className="mt-7 max-w-3xl text-sm font-medium leading-7 text-white/60 md:text-base md:leading-8">
                  {project.description && project.description !== "占位"
                    ? project.description
                    : "围绕真实任务场景梳理用户路径、交互结构与视觉表达，通过原型和设计方案推动产品体验更清晰、更自然。"}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/65">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenProject(project)}
                  className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:hidden"
                >
                  查看详情
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact({ onCopy }) {
  return (
    <Section id="contact" eyebrow="Contact" title="Beyond Design">
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]"><div className="flex flex-col justify-between rounded-[32px] bg-black p-8 text-white sm:p-10"><p className="text-balance text-2xl font-normal leading-snug tracking-tight md:text-4xl">希望创造自然、可信、富有温度的产品体验，让复杂的技术变得简单，让智能真正服务于人。</p><a href={"mailto:" + profile.email} className="mt-10 inline-flex w-full max-w-[220px] items-center justify-center rounded-full bg-white py-3 text-sm font-medium text-black">聊一聊</a></div><div className="grid gap-3 sm:grid-cols-2">{contacts.map((item) => <button type="button" key={item.label} onClick={() => onCopy(item.value)} className="rounded-3xl border border-gray-200 bg-white p-6 text-left transition-colors hover:bg-gray-50"><span className="flex items-center justify-between text-sm text-gray-500">{item.label}<Copy size={15} /></span><strong className="mt-6 block break-words text-xl font-semibold tracking-tight text-black">{item.value}</strong></button>)}</div></div>
      <footer className="mt-20 flex flex-col justify-between gap-2 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row"><p>© 2026 Yilin Cai.</p><p>Designed with care.</p></footer>
    </Section>
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
