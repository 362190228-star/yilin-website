/*
THESIS: A private designer's diary, not a portfolio template — you meet Yilin by turning pages, not by scrolling.
OWN-WORLD: Warm off-white desk, baby-blue bound notebook, grey wire rings, taped polaroids, washi labels, lined notepaper, pencil annotations.
STORY: A closed diary you open by hand, then four bookmarked entries — About, Growth, Works, Life — each a full spread of pinned artifacts.
FIRST VIEWPORT: One shut notebook centred on the desk, name plate and stickers on its cover, waiting to be opened.
FORM: Tab-driven page-turn book. Leaves rotate a full 180° around the spine, front face carrying the page you leave, back face the page you arrive at.
*/
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Copy, Mail, MapPin, Phone, X } from "lucide-react";
import { contacts, internships, lifeMoments, profile, projects } from "./data/content";
import { modalMotion } from "./data/motion";
import "./styles.css";

const TABS = [
  { id: "about", label: "关于我", stamp: "01", en: "About" },
  { id: "growth", label: "成长经历", stamp: "02", en: "Growth" },
  { id: "works", label: "作品展示", stamp: "03", en: "Works" },
  { id: "life", label: "个人生活", stamp: "04", en: "Life" },
];

const FLIP_MS = 780;
const FLIP_EASE = [0.44, 0.02, 0.2, 1];
/* If the leaf never reports back — a backgrounded tab freezes rAF mid-turn —
   settle the book anyway rather than leaving it stuck on a half-spread. */
const FLIP_GUARD_MS = FLIP_MS + 260;
/* One trackpad flick fires wheel events for ~a second. A turn only starts
   once the wheel has been quiet for this long, so a gesture = a page. */
const WHEEL_GESTURE_MS = 220;
/* Opening the diary: the cover swings off the spine while the shut book
   slides half its width left, so the spine lands where the gutter will be. */
const OPEN_MS = 940;

/* ---------------------------------------------------------------- helpers */

function splitLead(text) {
  const at = text.indexOf("：");
  if (at < 0) return { lead: "", body: text };
  return { lead: text.slice(0, at), body: text.slice(at + 1) };
}

/* A page column. When its content runs past the paper it fades at the fold
   instead of being guillotined mid-sentence, so "there is more" reads as
   intent rather than as a layout bug. */
function Scroller({ className = "", children }) {
  const ref = useRef(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const read = () => {
      const room = node.scrollHeight - node.clientHeight;
      setMore(room > 8 && node.scrollTop < room - 8);
    };

    read();
    node.addEventListener("scroll", read, { passive: true });
    const observer = new ResizeObserver(read);
    observer.observe(node);
    return () => {
      node.removeEventListener("scroll", read);
      observer.disconnect();
    };
  }, [children]);

  return (
    <div ref={ref} className={`nb-scroll ${className} ${more ? "has-more" : ""}`}>
      {children}
    </div>
  );
}

function EntryHead({ stamp, en, title, children }) {
  return (
    <header className="nb-entry-head">
      <span className="nb-entry-stamp">
        <i>Entry</i>
        <b>{stamp}</b>
        <em>{en}</em>
      </span>
      <h1>{title}</h1>
      {children ? <p>{children}</p> : null}
    </header>
  );
}

/* ------------------------------------------------------------------ about */

function AboutLeft() {
  return (
    <Scroller className="nb-page nb-page--about-l">
      <EntryHead stamp="01" en="About" title={`你好，\n我是${profile.name}`}>
        交互设计方向设计学硕士，做 AI 产品的体验落地：把模型能力翻译成用户看得懂、敢用、愿意再用的界面。
      </EntryHead>

      <div className="nb-photo nb-photo--portrait" style={{ "--tilt": "-2.4deg" }}>
        <img src="/assets/yilin-portrait.jpg" alt={`${profile.name}个人照片`} />
        <figcaption>
          <b>{profile.name}</b>
          <span>AI Native UX Designer</span>
        </figcaption>
      </div>

      <p className="nb-pencil nb-pencil--center">{profile.school} · {profile.major}</p>
    </Scroller>
  );
}

function AboutRight({ onCopy }) {
  return (
    <Scroller className="nb-page nb-page--about-r">
      <div className="nb-sticky" style={{ "--tilt": "1.6deg" }}>
        <b>写在最前面</b>
        <p>我希望把复杂的技术拆成自然、可信、可被理解的产品体验，让智能真正落在人的手边。</p>
      </div>

      <section className="nb-lined">
        <h2>三件我确定自己能做好的事</h2>
        <ol className="nb-lead-list">
          {profile.advantages.map((item, index) => {
            const { lead, body } = splitLead(item);
            return (
              <li key={item}>
                <span className="nb-lead-num">{String(index + 1).padStart(2, "0")}</span>
                {lead ? <b>{lead}</b> : null}
                <p>{body}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="nb-washi">
        {["AI Native", "Agent 交互", "B 端 / C 端", "Vibe Coding", "设计规范"].map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="nb-slips">
        {contacts.slice(0, 3).map((item) => (
          <button type="button" key={item.label} onClick={() => onCopy(item.value)}>
            <i>
              {item.label === "邮箱" ? <Mail size={14} /> : item.label === "电话" ? <Phone size={14} /> : <Copy size={14} />}
            </i>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </button>
        ))}
      </div>
    </Scroller>
  );
}

/* ----------------------------------------------------------------- growth */

function GrowthLeft({ activeId, onSelect }) {
  return (
    <Scroller className="nb-page nb-page--growth-l">
      <EntryHead stamp="02" en="Growth" title={"成长\n经历"}>
        从企业知识库的图标标注，到手机 Agent 的信任表达，一年里我的问题越问越靠前。点左边任一条，右页会翻到那段的手记。
      </EntryHead>

      <ol className="nb-thread">
        {internships.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`nb-thread-item ${activeId === item.id ? "is-active" : ""}`}
              onClick={() => onSelect(item.id)}
              aria-pressed={activeId === item.id}
            >
              <span className="nb-thread-dot" aria-hidden="true" />
              <span className="nb-thread-logo">
                <img src={item.logo} alt="" />
              </span>
              <span className="nb-thread-body">
                <b>{item.company}</b>
                <em>{item.role}</em>
                <small>{item.date} · {item.location}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <dl className="nb-tally">
        <div>
          <dd>04</dd>
          <dt>段实习与共创</dt>
        </div>
        <div>
          <dd>07</dd>
          <dt>条产品线手记</dt>
        </div>
        <div>
          <dd>25→26</dd>
          <dt>持续在一线</dt>
        </div>
      </dl>
    </Scroller>
  );
}

function GrowthRight({ activeId, reduceMotion }) {
  const item = internships.find((entry) => entry.id === activeId) || internships[0];

  return (
    <Scroller className="nb-page nb-page--growth-r">
      <span className="nb-clip">手记 · {item.company}</span>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(3px)" }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(2px)" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="nb-exp-head">
            <span className="nb-exp-logo"><img src={item.logo} alt="" /></span>
            <div>
              <h2>{item.company}</h2>
              <p>{item.role} · {item.date}</p>
            </div>
          </header>

          <p className="nb-pencil">{item.detail}</p>

          <div className="nb-notes">
            {item.detailSections.map((section, index) => (
              <article key={section.title} className="nb-note" style={{ "--tilt": `${index % 2 ? 0.7 : -0.8}deg` }}>
                <h3>{section.title}</h3>
                <p className="nb-note-bg">{section.background}</p>
                <ul>
                  {section.responsibilities.map((line) => {
                    const { lead, body } = splitLead(line);
                    return (
                      <li key={line}>
                        {lead ? <b>{lead}</b> : null}
                        {body}
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </Scroller>
  );
}

/* ------------------------------------------------------------------ works */

function WorksLeft({ onOpen }) {
  const featured = projects[0];
  return (
    <Scroller className="nb-page nb-page--works-l">
      <EntryHead stamp="03" en="Works" title={"作品\n展示"}>
        项目像夹进日记本的研究页：一张封面、一句判断、一叠过程图。点开任意一张看完整案例。
      </EntryHead>

      <button type="button" className="nb-photo nb-photo--feature" style={{ "--tilt": "-1.9deg" }} onClick={() => onOpen(featured)}>
        <img src={featured.image} alt={featured.title} />
        <figcaption>
          <span className="nb-project-titleline">
            <b>{featured.title}</b>
            <em>{featured.category}</em>
          </span>
          {featured.tags.length ? (
            <span className="nb-project-tags">
              {featured.tags.map((tag) => <i key={tag}>{tag}</i>)}
            </span>
          ) : null}
          {featured.description ? <span>{featured.description}</span> : null}
        </figcaption>
        <span className="nb-photo-open">翻开 →</span>
      </button>
    </Scroller>
  );
}

function WorksRight({ onOpen }) {
  const rest = projects.slice(1);
  return (
    <Scroller className="nb-page nb-page--works-r">
      <span className="nb-clip nb-clip--alt">其余 {rest.length} 篇</span>
      <div className="nb-scraps">
        {rest.map((project, index) => (
          <button
            type="button"
            key={project.id}
            className="nb-scrap"
            style={{ "--tilt": `${[-2.1, 1.6, -1.1][index % 3]}deg` }}
            onClick={() => onOpen(project)}
            >
            <span className="nb-scrap-no">{String(index + 2).padStart(2, "0")}</span>
            <img src={project.image} alt={project.title} />
            <span className="nb-scrap-titleline">
              <b>{project.title}</b>
              <em>{project.category}</em>
            </span>
            {project.tags.length ? (
              <small>
                {project.tags.map((tag) => <i key={tag}>{tag}</i>)}
              </small>
            ) : null}
          </button>
        ))}
      </div>
      <p className="nb-pencil nb-pencil--center">点击贴纸展开完整项目图集</p>
    </Scroller>
  );
}

/* ------------------------------------------------------------------- life */

function LifeLeft() {
  return (
    <Scroller className="nb-page nb-page--life-l">
      <EntryHead stamp="04" en="Life" title={"个人\n生活"}>
        下班以后的观察、手感和一点松弛感，最后都会绕回到我的设计判断里。
      </EntryHead>

      <div className="nb-board">
        {lifeMoments.map((moment) => (
          <figure
            key={moment.id}
            className={`nb-photo nb-photo--life is-${moment.span} ${moment.src ? "" : "is-empty"}`}
            style={{ "--tilt": `${moment.tilt}deg` }}
          >
            {moment.src ? (
              <img src={moment.src} alt={moment.caption} />
            ) : (
              <span className="nb-photo-slot" aria-hidden="true">
                <b>{moment.caption}</b>
                <code>{moment.slot}</code>
              </span>
            )}
            <figcaption>
              <b>{moment.caption}</b>
              <span>{moment.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Scroller>
  );
}

function LifeRight({ onCopy }) {
  return (
    <Scroller className="nb-page nb-page--life-r">
      <div className="nb-washi nb-washi--big">
        {profile.hobbies.map((hobby) => (
          <span key={hobby}>{hobby}</span>
        ))}
      </div>

      <section className="nb-lined">
        <h2>最后一页</h2>
        <p>
          我喜欢拍照、做饭、养花和瑜伽 —— 都是需要等待和手感的事。它们教我的东西其实和做设计一样：先观察，再动手，允许过程慢一点，但对细节别将就。
        </p>
        <p>这本作品集不是一张能力表格，而是一条能被翻阅的成长路径。谢谢你翻到这里。</p>
      </section>

      <button type="button" className="nb-ticket" onClick={() => onCopy(profile.email)}>
        <i><Mail size={16} /></i>
        <span>写信给我</span>
        <strong>{profile.email}</strong>
        <em>点击复制</em>
      </button>

      <p className="nb-pencil">
        <MapPin size={13} /> {profile.school} · {profile.major}
      </p>
    </Scroller>
  );
}

/* ------------------------------------------------------------------ cover */

/* The diary as you first meet it: shut, centred on the desk. Opening swings
   the cover a full 180° off its spine — and slides the whole book half a
   width left, because a book that opens grows leftward from its hinge. */
function Cover({ opening, reduceMotion, onOpen }) {
  const turn = { duration: OPEN_MS / 1000, ease: FLIP_EASE };

  return (
    <motion.div
      className="nb-cover-scene"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.26, delay: OPEN_MS / 1000 - 0.3 } }}
    >
      <motion.div
        className="nb-cover-hinge"
        animate={{ x: opening ? "-50%" : "0%" }}
        transition={turn}
      >
        <span className="nb-cover-rings" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((ring) => (
            <span key={ring} className="nb-cover-ring" />
          ))}
        </span>

        <motion.button
          type="button"
          className="nb-cover"
          onClick={onOpen}
          aria-label="翻开这本日记本"
          animate={{ rotateY: opening ? -178 : 0 }}
          transition={turn}
          whileHover={opening ? undefined : { rotateY: -7 }}
        >
          <span className="nb-cover-face nb-cover-face--front">
            <span className="nb-cover-band" aria-hidden="true" />

            <span className="nb-cover-plate">
              <em>Design Notes</em>
              <b>Yilin&rsquo;s Diary</b>
              <i>蔡艺琳 · 设计手记</i>
            </span>

            <span className="nb-cover-stickers" aria-hidden="true">
              <span className="nb-cover-sticker is-a">2025 — 2026</span>
              <span className="nb-cover-sticker is-b">AI Native UX</span>
              <span className="nb-cover-sticker is-c">No. 04</span>
            </span>

            <span className="nb-cover-nameplate">
              <em>Name</em>
              <b>{profile.name} / Yilin Cai</b>
            </span>

            <span className="nb-cover-open">翻开这一本 →</span>
          </span>

          <span className="nb-cover-face nb-cover-face--back" aria-hidden="true">
            <span className="nb-cover-bookplate">
              <em>This notebook belongs to</em>
              <b>{profile.name}</b>
              <i>{profile.school}</i>
            </span>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ modal */

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.body.classList.add("is-locked");
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="nb-modal-veil"
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
        aria-label={`${project.title} 项目详情`}
        className="nb-modal"
      >
        <header className="nb-modal-head">
          <div>
            <em>{project.category}</em>
            <h2>{project.title}</h2>
          </div>
          <button type="button" aria-label="关闭项目详情" onClick={onClose}>
            <X size={18} />
          </button>
        </header>
        <div className="nb-modal-body">
          {(project.detailImages || []).map((image, index) => (
            <figure key={image}>
              <img
                src={image}
                alt={`${project.title} 详情图 ${String(index + 1).padStart(2, "0")}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

/* ------------------------------------------------------------------- shell */

function Bookmarks({ activeIndex, onSelect }) {
  return (
    <aside className="nb-tabs" aria-label="作品集章节">
      <div className="nb-brand">
        <span className="nb-brand-mark">蔡</span>
        <span>
          <strong>Yilin Cai</strong>
          <small>Portfolio diary</small>
        </span>
      </div>

      <nav className="nb-tab-list">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            className={`nb-tab ${activeIndex === index ? "is-active" : ""}`}
            onClick={() => onSelect(index)}
            aria-current={activeIndex === index ? "page" : undefined}
          >
            <span className="nb-tab-stamp">{tab.stamp}</span>
            <span className="nb-tab-text">
              <b>{tab.label}</b>
              <em>{tab.en}</em>
            </span>
          </button>
        ))}
      </nav>

      <p className="nb-tab-hint">滚轮 / ← → 翻页<br />每次只翻一页</p>
    </aside>
  );
}

function Leaf({ dir, front, back, onDone }) {
  const forward = dir > 0;
  return (
    <motion.div
      className={`nb-leaf ${forward ? "nb-leaf--fwd" : "nb-leaf--back"}`}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: forward ? -180 : 180 }}
      transition={{ duration: FLIP_MS / 1000, ease: FLIP_EASE }}
      onAnimationComplete={onDone}
    >
      <div className="nb-leaf-face nb-leaf-face--front">
        <div className="nb-sheet">{front}</div>
        <motion.span
          className="nb-leaf-shade"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0.34, 0.52] }}
          transition={{ duration: FLIP_MS / 1000, ease: FLIP_EASE }}
        />
      </div>
      <div className="nb-leaf-face nb-leaf-face--back">
        <div className="nb-sheet">{back}</div>
        <motion.span
          className="nb-leaf-shade"
          initial={{ opacity: 0.58 }}
          animate={{ opacity: [0.58, 0.38, 0.12, 0] }}
          transition={{ duration: FLIP_MS / 1000, ease: FLIP_EASE }}
        />
      </div>
    </motion.div>
  );
}

function Toast({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="nb-toast"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          已复制
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Notebook() {
  const [phase, setPhase] = useState("closed"); // closed → opening → open
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(null); // { from, dir, token }
  const [activeExp, setActiveExp] = useState(internships[0].id);
  const [project, setProject] = useState(null);
  const [toast, setToast] = useState(false);

  const reduceMotion = useReducedMotion();
  const busyRef = useRef(false);
  const bookRef = useRef(null);
  const guardRef = useRef(0);
  const queuedRef = useRef(null);
  const goToRef = useRef(null);
  const turnRef = useRef(0);
  const openRef = useRef(0);

  const handleCopy = useCallback(async (value) => {
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
    setToast(true);
    window.setTimeout(() => setToast(false), 1500);
  }, []);

  const spreads = useMemo(
    () => ({
      about: { left: <AboutLeft />, right: <AboutRight onCopy={handleCopy} /> },
      growth: {
        left: <GrowthLeft activeId={activeExp} onSelect={setActiveExp} />,
        right: <GrowthRight activeId={activeExp} reduceMotion={reduceMotion} />,
      },
      works: { left: <WorksLeft onOpen={setProject} />, right: <WorksRight onOpen={setProject} /> },
      life: { left: <LifeLeft />, right: <LifeRight onCopy={handleCopy} /> },
    }),
    [activeExp, handleCopy, reduceMotion],
  );

  const spreadAt = useCallback((i) => spreads[TABS[i].id], [spreads]);

  /* Land the book. Whatever page was queued up mid-turn is played next, so a
     hurried reader clicking 关于我 → 个人生活 still arrives, one leaf at a time.
     `token` identifies the turn: a leaf that reports in after its own turn was
     already settled by the guard must not cut the following turn short. */
  const endFlip = useCallback((token) => {
    if (token != null && token !== turnRef.current) return;
    window.clearTimeout(guardRef.current);
    guardRef.current = 0;
    setFlip(null);
    busyRef.current = false;

    const queued = queuedRef.current;
    queuedRef.current = null;
    if (queued != null) {
      window.requestAnimationFrame(() => goToRef.current?.(queued));
    }
  }, []);

  const goTo = useCallback(
    (next) => {
      const target = Math.max(0, Math.min(TABS.length - 1, next));
      if (busyRef.current) {
        queuedRef.current = target === index ? null : target;
        return;
      }
      if (target === index) return;
      const dir = target > index ? 1 : -1;
      if (reduceMotion) {
        setIndex(target);
        return;
      }
      const token = turnRef.current + 1;
      turnRef.current = token;
      busyRef.current = true;
      window.clearTimeout(guardRef.current);
      guardRef.current = window.setTimeout(() => endFlip(token), FLIP_GUARD_MS);
      setFlip({ from: index, dir, token });
      setIndex(target);
    },
    [endFlip, index, reduceMotion],
  );

  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);

  useEffect(() => () => window.clearTimeout(guardRef.current), []);

  const openBook = useCallback(() => {
    setPhase((current) => {
      if (current !== "closed") return current;
      if (reduceMotion) return "open";
      openRef.current = window.setTimeout(() => setPhase("open"), OPEN_MS);
      return "opening";
    });
  }, [reduceMotion]);

  useEffect(() => () => window.clearTimeout(openRef.current), []);

  /* Leaving the tab freezes the animation frame the turn rides on. Settle the
     book now so coming back never lands on a half-turned spread. */
  useEffect(() => {
    function onVisibility() {
      if (document.hidden && busyRef.current) endFlip();
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [endFlip]);

  /* keyboard */
  useEffect(() => {
    function onKey(event) {
      if (project) return;
      if (phase !== "open") {
        /* the diary is still shut — any of these opens it instead */
        if (["Enter", " ", "ArrowRight", "ArrowDown", "PageDown"].includes(event.key)) {
          event.preventDefault();
          openBook();
        }
        return;
      }
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(event.key)) {
        event.preventDefault();
        goTo(index + 1);
      }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(index - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, project]);

  /* wheel — one page per gesture, and never steal scroll from a column that can still move */
  useEffect(() => {
    const node = bookRef.current;
    if (!node) return undefined;
    let lastWheel = 0;

    function onWheel(event) {
      if (project) return;
      const delta = event.deltaY;
      if (Math.abs(delta) < 4) return;

      /* Every tick over the book counts as part of the current gesture —
         including the ones a column ate — so running a column to its end
         never spills into a page turn on the same flick. */
      const now = event.timeStamp;
      const fresh = now - lastWheel > WHEEL_GESTURE_MS;
      lastWheel = now;

      const column = event.target.closest?.(".nb-scroll");
      if (column) {
        const room = column.scrollHeight - column.clientHeight;
        const atTop = column.scrollTop <= 1;
        const atEnd = column.scrollTop >= room - 1;
        if (room > 4 && ((delta > 0 && !atEnd) || (delta < 0 && !atTop))) return;
      }

      event.preventDefault();
      if (!fresh || busyRef.current || Math.abs(delta) < 14) return;
      goTo(index + (delta > 0 ? 1 : -1));
    }

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [goTo, index, project]);

  /* Which halves sit flat on the desk right now. Mid-flip the book is split
     between the spread you are leaving and the one you are arriving at. */
  const from = flip ? spreadAt(flip.from) : null;
  const to = spreadAt(index);
  const base = flip
    ? {
        left: flip.dir > 0 ? from.left : to.left,
        right: flip.dir > 0 ? to.right : from.right,
      }
    : to;

  const leafFront = flip ? (flip.dir > 0 ? from.right : from.left) : null;
  const leafBack = flip ? (flip.dir > 0 ? to.left : to.right) : null;

  return (
    <main className="nb-root">
      <AnimatePresence mode="wait">
        {phase !== "open" ? (
          <Cover
            key="cover"
            opening={phase === "opening"}
            reduceMotion={reduceMotion}
            onOpen={openBook}
          />
        ) : (
          <motion.div
            key="book"
            className="nb-open-book"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <Bookmarks activeIndex={index} onSelect={goTo} />

            <section className="nb-book" ref={bookRef} aria-label={TABS[index].label}>
              <div className="nb-book-shadow" aria-hidden="true" />

              <div className="nb-base">
                <div className="nb-sheet nb-sheet--l">{base.left}</div>
                <div className="nb-sheet nb-sheet--r">{base.right}</div>
              </div>

              <div className="nb-gutter" aria-hidden="true">
                <span className="nb-gutter-crease" />
                {[0, 1, 2, 3, 4].map((ring) => (
                  <span key={ring} className="nb-ring"><i /></span>
                ))}
              </div>

              <AnimatePresence>
                {flip ? (
                  <Leaf
                    key={flip.token}
                    dir={flip.dir}
                    front={leafFront}
                    back={leafBack}
                    onDone={() => endFlip(flip.token)}
                  />
                ) : null}
              </AnimatePresence>

              <div className="nb-pager">
                <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="上一页">
                  <ArrowLeft size={16} />
                </button>
                <span>{String(index + 1).padStart(2, "0")} <i>/</i> {String(TABS.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => goTo(index + 1)} disabled={index === TABS.length - 1} aria-label="下一页">
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {project ? <ProjectModal project={project} onClose={() => setProject(null)} /> : null}
      </AnimatePresence>

      <Toast visible={toast} />
    </main>
  );
}

const rootElement = document.getElementById("root");
const root = rootElement._reactRoot || createRoot(rootElement);
rootElement._reactRoot = root;
root.render(
  <React.StrictMode>
    <Notebook />
  </React.StrictMode>,
);
