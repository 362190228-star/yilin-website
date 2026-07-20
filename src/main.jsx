import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, X } from "lucide-react";
import { contacts, internships, navItems, profile, projects } from "./data/content";
import { ease, modalMotion } from "./data/motion";
import "./styles.css";

const videoSrc =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260717_120352_eb988725-1351-43b3-8095-16e4a1005e3d.mp4";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function VortexLogo() {
  return (
    <svg viewBox="0 0 256 256" className="h-14 w-14 fill-white md:h-16 md:w-16" aria-hidden="true">
      <path d="M128 28a72 72 0 0 0-72 72h72V28Z" />
      <path d="M228 128a72 72 0 0 0-72-72v72h72Z" />
      <path d="M128 228a72 72 0 0 0 72-72h-72v72Z" />
      <path d="M28 128a72 72 0 0 0 72 72v-72H28Z" />
      <circle cx="128" cy="128" r="28" />
    </svg>
  );
}

function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
      <button
        type="button"
        onClick={() => scrollToSection("hero")}
        className="anim-stagger flex flex-col items-center text-left"
        style={{ animationDelay: "0.1s" }}
        aria-label="返回首页"
      >
        <VortexLogo />
        <span className="mt-1 text-[10px] font-light tracking-[0.4em] text-white md:text-xs">Y I L I N</span>
      </button>
      <div className="anim-stagger flex items-center gap-3" style={{ animationDelay: "0.2s" }}>
        {navItems.slice(1, 4).map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={index === 2 ? "hidden px-5 py-2.5 text-sm text-black transition-colors hover:bg-white/90 md:block btn-cut bg-white" : "hidden px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10 md:block btn-cut-border"}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="h-screen w-full bg-black p-3 font-inter md:p-4">
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-black">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="anim-fade absolute inset-0 h-full w-full object-cover"
          style={{ animationDelay: "0.2s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.18),transparent_22rem),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.70))]" />
        <Navbar />
        <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pb-8 md:px-10 md:pb-10">
          <div className="relative flex flex-1 items-center">
            <div className="anim-stagger absolute left-0 top-[18%] hidden flex-col gap-6 lg:flex" style={{ animationDelay: "0.4s" }}>
              <p className="max-w-[240px] text-base leading-relaxed text-white/80">
                交互设计研究生<br />AI 产品体验<br />智能体交互探索
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <span className="h-4 w-4 rounded-full border border-white/40" />
                  <span className="h-4 w-4 rounded-full border border-white/40" />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-white/70">AI Native<br />UX Designer</span>
                  <span className="text-xs text-white/50">01</span>
                </div>
              </div>
            </div>
            <div className="anim-stagger w-full text-center" style={{ animationDelay: "0.5s" }}>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.5em] text-white/70">{profile.school}</p>
              <h1
                className="text-3xl font-normal leading-[1.1] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
              >
                AI Native<br />UX Designer<br />{profile.name}
              </h1>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            <div className="anim-stagger flex items-center justify-center md:justify-end" style={{ animationDelay: "0.7s" }}>
              <p className="max-w-[280px] text-center text-sm leading-relaxed text-white md:ml-auto md:text-left">
                {profile.advantages[0]}
              </p>
            </div>
            <div className="anim-stagger flex flex-col items-center gap-8 md:gap-24" style={{ animationDelay: "0.85s" }}>
              <span className="text-2xl font-medium text-white md:text-3xl">Human x AI</span>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="group flex w-full max-w-[280px] items-center justify-center gap-2 bg-white py-3.5 text-black transition-colors hover:bg-white/90 btn-cut"
              >
                <span className="text-sm font-medium">查看作品</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="anim-stagger flex items-center justify-center gap-3 md:justify-end" style={{ animationDelay: "1s" }}>
              {contacts.slice(0, 3).map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(item.value)}
                  className="flex h-10 w-10 items-center justify-center bg-white text-xs font-semibold text-black transition-colors hover:bg-white/90 btn-cut-sm"
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.label.slice(0, 1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="immersive-section">
      <div className="mx-auto w-full max-w-[1520px]">
        <div className="anim-stagger mb-10" style={{ animationDelay: "0.15s" }}>
          <p className="cut-eyebrow">{eyebrow}</p>
          <h2 className="section-title-dark">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About Me" title={`你好，我是${profile.name}`}>
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <article className="glass-panel overflow-hidden p-0">
          <img src="/assets/yilin-portrait.jpg" alt="蔡艺琳个人照片" className="h-full min-h-[520px] w-full object-cover object-[50%_36%]" />
        </article>
        <div className="grid content-center gap-5">
          <p className="max-w-4xl text-lg leading-9 text-white/78">
            一名交互设计方向的研究生，关注 AI 产品体验、智能体交互、复杂任务流程优化与视觉表达，目前正在探索如何让 AI 产品更自然、可信。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["学校", profile.school],
              ["专业", profile.major],
              ["邮箱", profile.email],
              ["电话", profile.phone],
            ].map(([label, value]) => (
              <div key={label} className="glass-panel p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-white/42">{label}</p>
                <p className="mt-3 break-words text-lg font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="glass-panel p-6">
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-white/42">个人优势</p>
            <ul className="grid gap-4 text-sm leading-7 text-white/74 md:text-base">
              {profile.advantages.map((item) => (
                <li key={item} className="grid grid-cols-[10px_1fr] gap-3">
                  <span className="mt-3 h-2 w-2 rounded-full bg-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Internship() {
  const [active, setActive] = useState(internships[0].id);
  const activeItem = internships.find((item) => item.id === active) ?? internships[0];

  return (
    <Section id="internship" eyebrow="Internship Map" title="实习成长地图">
      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="glass-panel grid gap-3 p-5">
          {internships.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActive(item.id)}
              onMouseEnter={() => setActive(item.id)}
              className={`group flex items-center justify-between gap-5 p-5 text-left transition-colors btn-cut ${active === item.id ? "bg-white text-black" : "bg-white/0 text-white hover:bg-white/10"}`}
            >
              <span>
                <span className="block text-xs tracking-[0.28em] opacity-60">0{index + 1}</span>
                <span className="mt-3 block text-2xl font-medium tracking-[-0.04em]">{item.company}</span>
                <span className="mt-2 block text-sm opacity-70">{item.date} / {item.location}</span>
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
        <article className="glass-panel p-6 md:p-8">
          <p className="text-sm font-medium text-white/58">{activeItem.role}</p>
          <h3 className="mt-3 text-4xl font-medium leading-none tracking-[-0.04em] text-white md:text-6xl">{activeItem.company}</h3>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72">{activeItem.detail}</p>
          <div className="mt-8 grid gap-5">
            {(activeItem.detailSections ?? []).map((section) => (
              <div key={section.title} className="border-t border-white/14 pt-5">
                <h4 className="text-xl font-medium leading-snug text-white">{section.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/62">{section.background}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}

function Projects({ onOpenProject }) {
  return (
    <Section id="projects" eyebrow="Selected Works" title="实习与项目">
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <button
            type="button"
            key={project.id}
            onClick={() => onOpenProject(project)}
            className="anim-stagger group glass-panel overflow-hidden p-0 text-left transition-transform hover:-translate-y-2"
            style={{ animationDelay: `${0.2 + index * 0.12}s` }}
          >
            <div className="aspect-video overflow-hidden bg-white/5">
              <img src={project.image} alt={`${project.title}项目封面`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-white/52">{project.category}</p>
              <h3 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.04em] text-white">{project.title}</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-white/16 px-3 py-1 text-xs text-white/64 btn-cut-sm">{tag}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}

function Contact({ onCopy }) {
  return (
    <Section id="contact" eyebrow="Contact" title="Beyond Design">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass-panel flex flex-col justify-between p-8 md:p-10">
          <p className="text-balance text-2xl font-medium leading-snug tracking-[-0.04em] text-white md:text-4xl">
            希望创造自然、可信、富有温度的产品体验，让复杂的技术变得简单，让智能真正服务于人。
          </p>
          <a href={`mailto:${profile.email}`} className="mt-10 inline-flex w-full max-w-[280px] items-center justify-center gap-2 bg-white py-3.5 text-black btn-cut">
            <span className="text-sm font-medium">聊一聊</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {contacts.map((item) => (
            <button type="button" key={item.label} onClick={() => onCopy(item.value)} className="glass-panel p-6 text-left transition-colors hover:bg-white hover:text-black">
              <span className="flex items-center justify-between text-sm text-current opacity-60">
                {item.label}
                <Copy size={15} />
              </span>
              <strong className="mt-6 block break-words text-xl font-medium tracking-[-0.03em] text-current">{item.value}</strong>
            </button>
          ))}
        </div>
      </div>
      <footer className="mt-20 flex flex-col justify-between gap-2 border-t border-white/12 pt-6 text-sm text-white/48 sm:flex-row">
        <p>© 2026 Yilin Cai.</p>
        <p>Designed with care.</p>
      </footer>
    </Section>
  );
}

function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
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
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        aria-label={`${project.title}项目详情`}
        className="relative h-[85vh] w-[min(80vw,1280px)] overflow-hidden rounded-2xl bg-black shadow-[0_28px_72px_rgba(0,0,0,0.42)] max-lg:w-[92vw]"
      >
        <button type="button" aria-label="关闭项目详情" onClick={onClose} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center bg-white text-black transition hover:bg-white/90 btn-cut-sm">
          <X size={20} />
        </button>
        <div className="h-full overflow-y-auto p-1">
          <div className="grid gap-1">
            {project.detailImages?.map((image, index) => (
              <figure key={image} className="overflow-hidden rounded-xl bg-white/5">
                <img src={image} alt={`${project.title}详情图 ${String(index + 1).padStart(2, "0")}`} className="block h-auto w-full" loading="lazy" />
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
          transition={{ duration: 0.22, ease }}
          className="fixed bottom-7 right-7 z-[60] flex items-center gap-2 bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_18px_44px_rgba(0,0,0,0.22)] btn-cut"
          role="status"
          aria-live="polite"
        >
          <Check size={16} />
          已复制
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

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

  return (
    <>
      <main>
        <Hero />
        <About />
        <Internship />
        <Projects onOpenProject={setActiveProject} />
        <Contact onCopy={handleCopy} />
      </main>
      <AnimatePresence>{activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence>
      <Toast visible={toastVisible} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
