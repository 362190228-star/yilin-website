import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Check, Copy, X } from "lucide-react";
import { contacts, internships, navItems, profile, projects } from "./data/content";
import { ease, fadeUp, modalMotion, stagger } from "./data/motion";
import "./styles.css";

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.35, 0.55, 0.72], rootMargin: "-16% 0px -20% 0px" },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NavBar() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="fixed left-1/2 top-5 z-40 w-[min(760px,calc(100vw-32px))] -translate-x-1/2">
      <nav className="glass-nav mx-auto flex h-14 items-center justify-between gap-2 rounded-nav px-3 shadow-nav backdrop-blur-2xl">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="hidden rounded-full px-4 py-2 text-sm font-semibold tracking-tight text-ink transition hover:bg-white/70 sm:block"
        >
          Yilin Cai
        </button>
        <div className="flex w-full items-center justify-between gap-1 sm:w-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`relative rounded-full px-3 py-2 text-sm transition duration-300 ease-smooth sm:px-4 ${
                activeSection === item.id ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_8px_26px_rgba(20,32,44,0.08)]"
                  transition={{ duration: 0.28, ease }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`section-shell ${className}`}>
      {children}
    </section>
  );
}

function Hero() {
  return (
    <Section id="hero" className="flex items-center justify-center bg-canvas p-2 text-center">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="hero-sky relative isolate flex min-h-[calc(100vh-1rem)] w-full max-w-[1840px] items-center justify-center overflow-hidden rounded-[28px] shadow-[0_18px_48px_rgba(20,32,44,0.10)] sm:rounded-[38px]"
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(6rem,14vw,9rem)] font-semibold leading-[0.86] tracking-[-0.04em] text-ink/82 drop-shadow-[0_12px_28px_rgba(255,255,255,0.45)]"
          >
            Hello!
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-7 text-[clamp(1.65rem,2.5vw,2.8rem)] font-medium tracking-[-0.03em] text-ink/72 drop-shadow-[0_10px_22px_rgba(255,255,255,0.42)]"
          >
            I'm Yilin
          </motion.p>
          <motion.button
            variants={fadeUp}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { duration: 2.3, repeat: Infinity, ease: "easeInOut" } }}
            type="button"
            aria-label="滚动到关于"
            onClick={() => scrollToSection("about")}
            className="mt-16 grid size-14 place-items-center rounded-full bg-ink/72 text-white shadow-[0_12px_28px_rgba(7,85,139,0.18)] backdrop-blur-xl transition hover:scale-105 hover:bg-white hover:text-ink"
          >
            <ArrowDown size={22} />
          </motion.button>
        </div>
      </motion.div>
    </Section>
  );
}

function About() {
  const hobbyEmojis = {
    摄影: "📷",
    做饭: "🍳",
    养花: "🌱",
    瑜伽: "🧘",
  };

  return (
    <Section id="about" className="bg-canvas">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
        className="grid min-h-[calc(100vh-10rem)] items-stretch gap-10 lg:grid-cols-[minmax(320px,0.34fr)_minmax(0,0.66fr)]"
      >
        <motion.div variants={fadeUp} className="relative lg:h-full">
          <div className="portrait-frame">
            <img src="/assets/yilin-portrait.jpg" alt="蔡艺琳个人照片" />
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="flex h-full min-w-0 flex-col justify-center">
          <p className="eyebrow">About Me</p>
          <h2 className="w-full text-balance text-[clamp(2.8rem,5.2vw,6rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
            你好，我是蔡艺琳 👋
          </h2>
          <p className="mt-6 w-full text-pretty text-base leading-8 text-muted lg:whitespace-nowrap lg:text-[clamp(0.86rem,1vw,1rem)]">
            一名交互设计方向的研究生，关注 AI 产品体验、智能体交互、复杂任务流程优化与视觉表达，目前正在探索如何让 AI 产品更自然、可信。
          </p>

          <div className="mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-[0.72fr_1.28fr]">
            <InfoBlock title="基本信息">
              <dl className="grid gap-3">
                {[
                  ["学校", profile.school],
                  ["专业", profile.major],
                  ["邮箱", profile.email],
                  ["电话", profile.phone],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 sm:grid-cols-[72px_1fr]">
                    <dt className="text-muted">{label}</dt>
                    <dd className="min-w-0 break-words font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </InfoBlock>
            <InfoBlock title="个人优势">
              <ul className="grid gap-3 text-sm leading-6 text-muted md:text-base md:leading-7">
                {profile.advantages.map((item) => (
                  <li key={item} className="grid grid-cols-[8px_1fr] gap-3">
                    <span className="mt-3 size-1.5 rounded-full bg-leaf" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>
            <InfoBlock title="兴趣爱好" className="lg:col-span-2">
              <div className="flex flex-wrap gap-3">
                {profile.hobbies.map((tag) => (
                  <motion.span
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ duration: 0.22, ease }}
                    key={tag}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-muted shadow-[0_10px_30px_rgba(20,32,44,0.04)] transition-colors duration-300 hover:border-transparent hover:bg-[rgba(205,252,86,1)] hover:text-ink"
                  >
                    <span className="mr-1.5" aria-hidden="true">
                      {hobbyEmojis[tag]}
                    </span>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </InfoBlock>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function InfoBlock({ title, children, className = "" }) {
  return (
    <article className={`border-t border-line pt-5 ${className}`}>
      <h3 className="mb-4 text-base font-semibold tracking-[-0.02em] md:text-lg">{title}</h3>
      {children}
    </article>
  );
}

function Internship() {
  const [active, setActive] = useState(internships[0].id);

  return (
    <Section id="internship" className="bg-gradient-to-b from-canvas to-white">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex min-h-[calc(100vh-10rem)] flex-col justify-center"
      >
        <motion.div variants={fadeUp} className="max-w-4xl">
          <p className="eyebrow">Internship Map</p>
          <h2 className="section-title">📍实习成长地图</h2>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative min-h-[560px] overflow-hidden rounded-[28px] bg-white shadow-card">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,23,25,.04)_1px,transparent_1px),linear-gradient(0deg,rgba(22,23,25,.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(19,137,216,.20),transparent_18vw),radial-gradient(circle_at_76%_68%,rgba(159,191,113,.22),transparent_17vw)]" />
            <div className="absolute left-10 top-9 text-[clamp(4rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink/[0.04]">
              BEIJING
              <br />
              AI UX
            </div>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 560" aria-hidden="true">
              <path
                d="M180 175 C320 88 430 265 565 210 S730 280 540 372 C420 438 270 382 350 300"
                fill="none"
                stroke="rgba(22,23,25,0.22)"
                strokeWidth="2"
                strokeDasharray="8 11"
                strokeLinecap="round"
              />
            </svg>
            {internships.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                onMouseEnter={() => setActive(item.id)}
                onFocus={() => setActive(item.id)}
                className={`map-pin ${item.position} ${active === item.id ? "is-active" : ""}`}
              >
                <span>{item.location}</span>
              </button>
            ))}

            {internships.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(item.id)}
                onMouseEnter={() => setActive(item.id)}
                onFocus={() => setActive(item.id)}
                className={`map-note ${item.notePosition} ${active === item.id ? "is-active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-[28px] bg-white shadow-card">
            {internships.map((item, index) => {
              const isActive = active === item.id;
              const offset = internships.findIndex((internship) => internship.id === active);
              return (
                <motion.article
                  key={item.id}
                  animate={{
                    y: isActive ? 0 : 34 + Math.abs(index - offset) * 24,
                    scale: isActive ? 1 : 0.94,
                    opacity: isActive ? 1 : 0.42,
                    zIndex: isActive ? 3 : 1,
                  }}
                  transition={{ duration: 0.34, ease }}
                  className="absolute inset-0 overflow-y-auto rounded-[28px] bg-white p-7 md:p-9"
                >
                  <p className="eyebrow">{item.label}</p>
                  <h3 className="max-w-2xl whitespace-nowrap text-[clamp(1.9rem,3.1vw,3.3rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
                    {item.company}
                    <span className="mx-3 text-muted">-</span>
                    {item.role}
                  </h3>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-muted">{item.role}</span>
                    <span className="rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-muted">{item.date}</span>
                    <span className="rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-muted">{item.location}</span>
                  </div>

                  <div className="mt-9 grid gap-7 pb-12">
                    {(item.detailSections ?? []).map((section) => (
                      <section key={section.title} className="border-t border-line pt-6">
                        <h4 className="text-xl font-semibold leading-snug tracking-[-0.03em]">{section.title}</h4>
                        <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted">
                          <p>
                            <span className="font-semibold text-ink">项目背景：</span>
                            {section.background}
                          </p>
                          <div>
                            <p className="font-semibold text-ink">工作职责：</p>
                            <ol className="mt-2 grid gap-2 pl-5">
                              {section.responsibilities.map((responsibility, responsibilityIndex) => (
                                <li key={responsibility} className="list-decimal">
                                  {responsibility}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </section>
                    ))}
                  </div>
                </motion.article>
              );
            })}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function Projects({ onOpenProject }) {
  return (
    <Section id="projects" className="bg-white">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="flex min-h-[calc(100vh-10rem)] flex-col justify-center"
      >
        <motion.div variants={fadeUp} className="max-w-4xl">
          <p className="eyebrow">Selected Works</p>
          <h2 className="section-title">实习与项目</h2>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenProject={onOpenProject} />
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}

function ProjectCard({ project, onOpenProject }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.28, ease }}
      onClick={() => onOpenProject(project)}
      className={`group overflow-hidden rounded-[24px] bg-white p-0 text-left shadow-card transition-shadow duration-300 hover:shadow-hover ${project.size}`}
    >
      <div className="flex h-full flex-col">
        <div className="grid aspect-video place-items-center overflow-hidden bg-[#f2f5f8]">
          <img
            src={project.image}
            alt={`${project.title}项目封面`}
            className="h-full w-full object-cover transition duration-500 ease-smooth group-hover:scale-[1.04]"
          />
        </div>
        <div className="bg-white p-6 text-ink md:p-7">
          <p className="mb-3 text-sm font-semibold text-muted">{project.category}</p>
          <h3 className="text-[clamp(1.55rem,2.2vw,2.55rem)] font-semibold leading-tight tracking-[-0.04em]">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}

function Ending({ onCopy }) {
  return (
    <Section id="contact" className="flex items-center justify-center bg-canvas p-2">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.24 }}
        className="contact-scene relative z-10 flex min-h-[calc(100vh-1rem)] w-full max-w-[1840px] flex-col justify-center overflow-hidden rounded-[28px] px-[max(24px,calc((100vw-1520px)/2))] py-[clamp(6rem,9vw,8.5rem)] shadow-[0_18px_48px_rgba(20,32,44,0.10)] sm:rounded-[38px]"
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-6xl text-center">
          <h2 className="text-balance text-[clamp(4rem,10vw,6rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
            Beyond Design
          </h2>
          <p className="mx-auto mt-10 max-w-4xl text-balance text-[clamp(1.45rem,2.3vw,3rem)] font-medium leading-[1.28] tracking-[-0.04em] text-ink/72">
            希望创造自然、可信、富有温度的产品体验，让复杂的技术变得简单，让智能真正服务于人。
          </p>
        </motion.div>

        <motion.a
          variants={fadeUp}
          href={`mailto:${profile.email}`}
          className="mx-auto mt-10 inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(20,32,44,0.14)]"
        >
          聊一聊
        </motion.a>

        <motion.div variants={fadeUp} className="mx-auto mt-12 grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => onCopy(item.value)}
              className="group rounded-card bg-white/68 p-5 text-left shadow-[0_10px_24px_rgba(20,32,44,0.08)] backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-[rgba(205,252,86,0.92)] hover:shadow-[0_18px_44px_rgba(20,32,44,0.18)] hover:ring-1 hover:ring-ink/10"
            >
              <span className="flex items-center justify-between text-sm text-muted">
                {item.label}
                <Copy size={15} className="opacity-0 transition group-hover:opacity-100" />
              </span>
              <strong className="mt-5 block break-words text-base font-semibold tracking-[-0.03em] text-ink">
                {item.value}
              </strong>
            </button>
          ))}
        </motion.div>

        <motion.footer variants={fadeUp} className="mt-24 flex flex-col justify-between gap-2 border-t border-ink/12 pt-6 text-sm text-ink/62 sm:flex-row">
          <p>© 2026 Yilin Cai.</p>
          <p>Designed with care.</p>
        </motion.footer>
      </motion.div>
    </Section>
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
      className="fixed inset-0 z-50 grid place-items-center bg-ink/24 p-4 backdrop-blur-xl"
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
        className="relative h-[85vh] w-[min(80vw,1280px)] overflow-hidden rounded-[28px] bg-white/95 shadow-[0_28px_72px_rgba(20,32,44,0.22)] backdrop-blur-2xl max-lg:w-[92vw]"
      >
        <button
          type="button"
          aria-label="关闭项目详情"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full bg-white/80 text-ink shadow-card transition hover:scale-105 hover:bg-white"
        >
          <X size={20} />
        </button>
        <div className="h-full overflow-y-auto">
          <div className="grid gap-1 px-1 pb-1">
            {project.detailImages?.length
              ? project.detailImages.map((image, index) => (
                  <figure key={image} className="overflow-hidden rounded-[24px] bg-[#f2f5f8]">
                    <img
                      src={image}
                      alt={`${project.title}详情图 ${String(index + 1).padStart(2, "0")}`}
                      className="block h-auto w-full"
                      loading="lazy"
                    />
                  </figure>
                ))
              : Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid aspect-video place-items-center rounded-[24px] bg-[linear-gradient(135deg,rgba(19,137,216,.10),rgba(159,191,113,.08)),#f2f5f8] text-[clamp(2rem,4vw,5rem)] font-semibold tracking-[-0.04em] text-ink/30"
                  >
                    Project Image {String(index + 1).padStart(2, "0")}
                  </div>
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
          className="fixed bottom-7 right-7 z-[60] flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-hover"
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
      <NavBar />
      <main>
        <Hero />
        <About />
        <Internship />
        <Projects onOpenProject={setActiveProject} />
        <Ending onCopy={handleCopy} />
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
