import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Copy, Menu, Star, X } from "lucide-react";
import BounceCards from "./components/BounceCards";
import TiltedCard from "./components/TiltedCard";
import { contacts, internships, navItems, profile, projects } from "./data/content";
import { dampedSpring, detailSwitchMotion, modalMotion, paperSpring, sectionReveal } from "./data/motion";
import "./styles.css";

const videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_153826_e9005cf7-a1c7-4c7d-886f-fea22d644a9c.mp4";
const projectTransforms = [
  "rotate(7deg) translate(-390px, 18px)",
  "rotate(-3deg) translate(-130px, -16px)",
  "rotate(4deg) translate(130px, -4px)",
  "rotate(-7deg) translate(390px, 18px)",
];
const compactProjectTransforms = [
  "rotate(6deg) translate(-126px, 12px)",
  "rotate(-3deg) translate(-42px, -10px)",
  "rotate(4deg) translate(42px, -4px)",
  "rotate(-6deg) translate(126px, 12px)",
];

let viewportScrollFrame = 0;

function getPageSections() {
  return [...document.querySelectorAll("main > section")];
}

function easeInOutQuart(progress) {
  return progress < 0.5
    ? 8 * progress * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 4) / 2;
}

function animateViewportTo(top, { duration = 760, onStart, onComplete } = {}) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  window.cancelAnimationFrame(viewportScrollFrame);
  root.classList.add("is-snapping");
  onStart?.();

  if (reduceMotion) {
    window.scrollTo(0, top);
    root.classList.remove("is-snapping");
    onComplete?.();
    return;
  }

  const start = window.scrollY;
  const distance = top - start;
  const startedAt = performance.now();

  const tick = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    window.scrollTo(0, start + distance * easeInOutQuart(progress));
    if (progress < 1) {
      viewportScrollFrame = window.requestAnimationFrame(tick);
      return;
    }
    root.classList.remove("is-snapping");
    onComplete?.();
  };

  viewportScrollFrame = window.requestAnimationFrame(tick);
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  animateViewportTo(target.offsetTop, {
    duration: 760,
    onStart: () => window.dispatchEvent(new CustomEvent("portfolio-section-enter", { detail: { id } })),
  });
}

function snapFromSection(id, direction) {
  const sections = getPageSections();
  const currentIndex = sections.findIndex((section) => section.id === id);
  if (currentIndex < 0) return false;
  const target = sections[Math.max(0, Math.min(sections.length - 1, currentIndex + direction))];
  if (!target || target.id === id) return false;
  animateViewportTo(target.offsetTop, {
    duration: 780,
    onStart: () => window.dispatchEvent(new CustomEvent("portfolio-section-enter", { detail: { id: target.id } })),
  });
  return true;
}

function canScrollInside(target, deltaY) {
  let node = target instanceof Element ? target : null;
  while (node && node !== document.body && node !== document.documentElement) {
    const style = window.getComputedStyle(node);
    const canScroll = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1;
    if (canScroll) {
      const atTop = node.scrollTop <= 0;
      const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
    }
    node = node.parentElement;
  }
  return false;
}

function usePageSnap() {
  useEffect(() => {
    let locked = false;
    let wheelDelta = 0;
    let wheelResetTimer = 0;
    let touchStartY = 0;

    const nearestSectionIndex = () => {
      const currentY = window.scrollY;
      return getPageSections().reduce((nearest, section, index, list) => {
        const distance = Math.abs(section.offsetTop - currentY);
        const nearestDistance = Math.abs(list[nearest].offsetTop - currentY);
        return distance < nearestDistance ? index : nearest;
      }, 0);
    };

    const snap = (direction) => {
      const list = getPageSections();
      if (!list.length || locked) return;
      const nextIndex = Math.max(0, Math.min(list.length - 1, nearestSectionIndex() + direction));
      const target = list[nextIndex];
      if (!target) return;
      if (Math.abs(target.offsetTop - window.scrollY) <= 3) return;
      locked = true;
      wheelDelta = 0;
      const targetTop = target.offsetTop;
      animateViewportTo(targetTop, {
        duration: 780,
        onStart: () => window.dispatchEvent(new CustomEvent("portfolio-section-enter", { detail: { id: target.id } })),
        onComplete: () => {
          window.setTimeout(() => {
            locked = false;
          }, 90);
        },
      });
    };

    const onWheel = (event) => {
      if (event.defaultPrevented) return;
      if (canScrollInside(event.target, event.deltaY)) return;
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      if (Math.abs(delta) < 2) return;
      event.preventDefault();
      if (locked) return;

      wheelDelta += delta;
      window.clearTimeout(wheelResetTimer);
      wheelResetTimer = window.setTimeout(() => {
        wheelDelta = 0;
      }, 140);

      if (Math.abs(wheelDelta) < 72) return;
      snap(wheelDelta > 0 ? 1 : -1);
    };

    const onTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY || 0;
    };

    const onTouchEnd = (event) => {
      const endY = event.changedTouches[0]?.clientY || touchStartY;
      const deltaY = touchStartY - endY;
      if (Math.abs(deltaY) < 42 || canScrollInside(event.target, deltaY)) return;
      snap(deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.clearTimeout(wheelResetTimer);
      window.cancelAnimationFrame(viewportScrollFrame);
      document.documentElement.classList.remove("is-snapping");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
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

function MotionSection({ id, className, children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionReveal}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </motion.section>
  );
}

function AnimatedStatValue({ value, active, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const textValue = String(value);
  const [, numberPart = "", suffix = ""] = textValue.match(/^(\d+)(.*)$/) || [];
  const target = Number(numberPart);
  const [display, setDisplay] = useState(Number.isFinite(target) ? `0${suffix}` : textValue);

  useEffect(() => {
    if (!Number.isFinite(target)) {
      setDisplay(textValue);
      return undefined;
    }
    if (!active || reduceMotion) {
      setDisplay(reduceMotion ? textValue : `0${suffix}`);
      return undefined;
    }

    let frame = 0;
    const duration = Math.min(1700, Math.max(640, 520 + String(target).length * 240 + Math.log10(target + 1) * 260));
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(`${Math.round(target * eased)}${suffix}`);
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [active, delay, reduceMotion, suffix, target, textValue]);

  return <>{display}</>;
}

function getStatAnimationDuration(value) {
  const [, numberPart = ""] = String(value).match(/^(\d+)/) || [];
  const target = Number(numberPart);
  if (!Number.isFinite(target)) return 640;
  return Math.min(1700, Math.max(640, 520 + String(target).length * 240 + Math.log10(target + 1) * 260));
}

function getStatAnimationDelay(stats, index) {
  return stats.slice(0, index).reduce((delay, stat) => delay + getStatAnimationDuration(stat.value) + 120, 0);
}

function About() {
  return (
    <MotionSection id="about" className="minimal-section">
      <div className="mx-auto w-full max-w-7xl">
        <div className="about-layout grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="about-portrait-card rounded-[32px] bg-gray-50">
            <TiltedCard
              imageSrc="/assets/yilin-portrait.jpg"
              altText="蔡艺琳个人照片"
              captionText="Yilin Cai"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={8}
              scaleOnHover={1.035}
              showTooltip
            />
          </article>
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
    </MotionSection>
  );
}

function Internship() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeDirection, setActiveDirection] = useState(1);
  const statsRef = useRef(null);
  const boardRef = useRef(null);
  const activeIndexRef = useRef(1);
  const boardWheelDeltaRef = useRef(0);
  const boardWheelLockRef = useRef(false);
  const boardWheelResetRef = useRef(0);
  const statsInView = useInView(statsRef, { once: false, amount: 0.65 });
  const activeItem = internships[activeIndex] || internships[0];
  const compactStackOffset = 64;
  const internshipStats = [
    { value: internships.length, label: "实习段数" },
    { value: "371", label: "实习天数" },
    { value: "3+", label: "AI 产品方向" },
  ];
  const selectExperience = (index) => {
    setActiveDirection(index >= activeIndex ? 1 : -1);
    activeIndexRef.current = index;
    setActiveIndex(index);
  };
  const detailMotion = detailSwitchMotion(activeDirection);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;

    const onBoardWheel = (event) => {
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      if (Math.abs(delta) < 2) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (boardWheelLockRef.current) return;

      boardWheelDeltaRef.current += delta;
      window.clearTimeout(boardWheelResetRef.current);
      boardWheelResetRef.current = window.setTimeout(() => {
        boardWheelDeltaRef.current = 0;
      }, 150);

      if (Math.abs(boardWheelDeltaRef.current) < 64) return;

      const direction = boardWheelDeltaRef.current > 0 ? 1 : -1;
      const nextIndex = activeIndexRef.current + direction;
      boardWheelDeltaRef.current = 0;
      boardWheelLockRef.current = true;

      if (nextIndex >= 0 && nextIndex < internships.length) {
        setActiveDirection(direction);
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      } else {
        snapFromSection("internship", direction);
      }

      window.setTimeout(() => {
        boardWheelLockRef.current = false;
      }, 640);
    };

    board.addEventListener("wheel", onBoardWheel, { passive: false, capture: true });
    return () => {
      window.clearTimeout(boardWheelResetRef.current);
      board.removeEventListener("wheel", onBoardWheel, { capture: true });
    };
  }, []);

  return (
    <MotionSection id="internship" className="internship-timeline-section internship-stack-section">
      <div className="internship-stack-shell">
        <aside className="internship-stack-intro">
          <p className="minimal-eyebrow">Experience Timeline</p>
          <h2>成长经历</h2>
          <p className="internship-stack-lead">
            从校园项目、黑客松到 AI 产品一线实习，持续把复杂产品问题拆成清晰的体验路径。
          </p>

          <div className="internship-stack-avatars" aria-label="经历公司">
            {internships.map((item) => (
              <span key={item.id} title={item.company} className={`internship-logo-mark internship-logo-mark-${item.id}`}>
                <img src={item.logo} alt={`${item.company} logo`} loading="lazy" />
              </span>
            ))}
          </div>

          <dl className="internship-stack-stats" ref={statsRef}>
            {internshipStats.map((stat, index) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd><AnimatedStatValue value={stat.value} active={statsInView} delay={getStatAnimationDelay(internshipStats, index)} /></dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="internship-stack-board" aria-label="实习经历堆叠卡片" ref={boardRef}>
          {internships.map((item, index) => {
            const isActive = index === activeIndex;
            const stackTop =
              index <= activeIndex
                ? `${index * compactStackOffset}px`
                : `calc(${activeIndex * compactStackOffset}px + var(--internship-active-card-height) + ${(index - activeIndex - 1) * compactStackOffset}px)`;
            const stackDistance = Math.abs(index - activeIndex);
            return (
              <motion.article
                key={item.id}
                layout
                className={"internship-stack-card " + (isActive ? "is-active" : "is-stacked")}
                style={{
                  "--stack-index": index,
                  "--stack-top": stackTop,
                  "--stack-layer": isActive ? 10 : 6 - stackDistance,
                }}
                initial={false}
                animate={{
                  y: 0,
                  scale: isActive ? 1 : Math.max(0.92, 1 - stackDistance * 0.025),
                  opacity: isActive ? 1 : Math.max(0.58, 0.86 - stackDistance * 0.08),
                }}
                transition={paperSpring}
                aria-current={isActive ? "true" : undefined}
              >
                <button
                  type="button"
                  className="internship-stack-card-trigger"
                  onClick={() => selectExperience(index)}
                  aria-label={`查看${item.company}经历`}
                >
                  <span className={`internship-stack-icon internship-logo-mark internship-logo-mark-${item.id}`} aria-hidden="true">
                    <img src={item.logo} alt="" loading="lazy" />
                  </span>
                  <span className="internship-stack-card-head">
                    <span>
                      <span className="internship-stack-role">{item.role}</span>
                      <span className="internship-stack-title-line">
                        <span className="internship-stack-company">{item.company}</span>
                        {isActive ? (
                          <span className="internship-stack-meta internship-stack-meta-inline">
                            <span>{item.date}</span>
                            <span>{item.location}</span>
                          </span>
                        ) : null}
                      </span>
                    </span>
                    {!isActive ? (
                      <span className="internship-stack-arrow" aria-hidden="true">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    ) : null}
                  </span>
                </button>

                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key={activeItem.id}
                      className="internship-stack-detail"
                      initial={detailMotion.initial}
                      animate={detailMotion.animate}
                      exit={detailMotion.exit}
                    >
                      <div className="internship-stack-detail-scroll">
                        <p>{activeItem.detail}</p>
                        <div className="internship-stack-detail-list">
                          {(activeItem.detailSections || []).map((section) => (
                            <section key={section.title}>
                              <h3>{section.title}</h3>
                              <p>{section.background}</p>
                              {section.responsibilities?.length ? (
                                <ol>
                                  {section.responsibilities.slice(0, 2).map((responsibility) => (
                                    <li key={responsibility}>{responsibility}</li>
                                  ))}
                                </ol>
                              ) : null}
                            </section>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function Projects({ onOpenProject }) {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <MotionSection id="projects" className="project-gallery-section">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="project-gallery-header flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="minimal-eyebrow text-white/50">Selected Works</p>
            <h2 className="mt-5 text-5xl font-normal leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-[86px]">
              作品展示
            </h2>
          </div>
        </div>

        <div className="project-gallery-stage project-gallery-bounce-stage">
          <BounceCards
            className="project-gallery-bounce-cards"
            cards={projects}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
            onCardClick={(project) => onOpenProject(project)}
            containerWidth={900}
            containerHeight={450}
            animationDelay={0.06}
            animationStagger={0.06}
            easeType="elastic.out(1, 0.5)"
            transformStyles={projectTransforms}
            compactTransformStyles={compactProjectTransforms}
            enableHover
          />
        </div>
      </div>
    </MotionSection>
  );
}

function Contact({ onCopy }) {
  return (
    <MotionSection id="contact" className="minimal-section flex min-h-screen items-center">
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
    </MotionSection>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    function closeOnEscape(event) { if (event.key === "Escape") onClose(); }
    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.body.classList.remove("overflow-hidden"); document.removeEventListener("keydown", closeOnEscape); };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/[0.38] p-4 backdrop-blur-[6px]" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.2 } }} exit={{ opacity: 0, transition: { duration: 0.18 } }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.section variants={modalMotion} initial="hidden" animate="visible" exit="exit" role="dialog" aria-modal="true" aria-label={project.title + "项目详情"} className="project-modal-panel relative h-[85vh] w-[min(80vw,1280px)] overflow-hidden rounded-[32px] bg-white shadow-[0_28px_72px_rgba(0,0,0,0.22)] max-lg:w-[92vw]">
        <button type="button" aria-label="关闭项目详情" onClick={onClose} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-sm transition hover:bg-gray-100"><X size={20} /></button>
        <div className="h-full overflow-y-auto p-1"><div className="grid gap-1">{(project.detailImages || []).map((image, index) => <figure key={image} className="project-modal-figure overflow-hidden rounded-3xl bg-gray-100"><img src={image} alt={project.title + "详情图 " + String(index + 1).padStart(2, "0")} className="block h-auto w-full" loading={index === 0 ? "eager" : "lazy"} decoding="async" /></figure>)}</div></div>
      </motion.section>
    </motion.div>
  );
}

function Toast({ visible }) {
  return <AnimatePresence>{visible && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={dampedSpring} className="fixed bottom-7 right-7 z-[60] flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg" role="status" aria-live="polite"><Check size={16} />已复制</motion.div>}</AnimatePresence>;
}

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  usePageSnap();
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

const rootElement = document.getElementById("root");
const root = rootElement._reactRoot || createRoot(rootElement);
rootElement._reactRoot = root;
root.render(<React.StrictMode><App /></React.StrictMode>);
