import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

export default function BounceCards({
  className = "",
  cards = [],
  containerWidth = 760,
  containerHeight = 360,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(7deg) translate(-220px, 14px)",
    "rotate(-2deg) translate(0, -10px)",
    "rotate(-7deg) translate(220px, 14px)",
  ],
  compactTransformStyles = [
    "rotate(6deg) translate(-96px, 12px)",
    "rotate(-2deg) translate(0, -10px)",
    "rotate(-6deg) translate(96px, 12px)",
  ],
  enableHover = true,
  activeIndex = 0,
  onActiveChange,
  onCardClick,
}) {
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [isCompact, setIsCompact] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const cardTransforms = isCompact ? compactTransformStyles : transformStyles;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const syncCompact = () => setIsCompact(media.matches);
    syncCompact();
    media.addEventListener("change", syncCompact);
    return () => media.removeEventListener("change", syncCompact);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(containerRef);
    let observer;
    let triggerTarget;
    let rafId = 0;
    let checkVisibility = () => {};
    let handleSectionEnter = () => {};

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        cards.forEach((_, index) => {
          gsap.set(q(`.bounce-card-${index}`), {
            opacity: 1,
            transform: cardTransforms[index] || "none",
          });
        });
        return;
      }

      if (hasAnimatedRef.current) {
        cards.forEach((_, index) => {
          gsap.set(q(`.bounce-card-${index}`), {
            opacity: 1,
            transform: cardTransforms[index] || "none",
          });
        });
        return;
      }

      cards.forEach((_, index) => {
        gsap.set(q(`.bounce-card-${index}`), {
          opacity: 0,
          transform: "rotate(0deg) translate(0px, 0px) scale(0.08)",
          zIndex: index,
        });
      });

      const playBounce = () => {
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        cards.forEach((_, index) => {
          gsap.to(q(`.bounce-card-${index}`), {
            opacity: 1,
            transform: cardTransforms[index] || "none",
            zIndex: index === activeIndex ? 6 : index,
            duration: 1.15,
            ease: easeType,
            delay: animationDelay + index * animationStagger,
            overwrite: "auto",
          });
        });
      };

      const isTriggerVisible = () => {
        if (!triggerTarget) return false;
        const rect = triggerTarget.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.18;
      };

      checkVisibility = () => {
        if (isTriggerVisible()) playBounce();
      };

      handleSectionEnter = (event) => {
        if (event.detail?.id && event.detail.id === triggerTarget?.id) playBounce();
      };

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) playBounce();
        },
        { threshold: 0.2 },
      );

      triggerTarget = containerRef.current?.closest("section") || containerRef.current;
      if (triggerTarget) observer.observe(triggerTarget);
      window.addEventListener("portfolio-section-enter", handleSectionEnter);
      window.addEventListener("scroll", checkVisibility, { passive: true });
      rafId = window.requestAnimationFrame(checkVisibility);
    }, containerRef);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("portfolio-section-enter", handleSectionEnter);
      window.removeEventListener("scroll", checkVisibility);
      observer?.disconnect();
      ctx.revert();
    };
  }, [animationDelay, animationStagger, cardTransforms, cards, easeType]);

  const getSettledTransform = (transformStr) => transformStr || "none";

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const currentY = parseFloat(match[2]);
      return baseTransform.replace(translateRegex, `translate(${currentX + offsetX}px, ${currentY}px)`);
    }
    return baseTransform === "none" ? `translate(${offsetX}px, 0)` : `${baseTransform} translate(${offsetX}px, 0)`;
  };

  const pushSiblings = (hoveredIndex) => {
    setHoveredIndex(hoveredIndex);
    onActiveChange?.(hoveredIndex);
    if (!enableHover || !containerRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const q = gsap.utils.selector(containerRef);

    cards.forEach((_, index) => {
      const target = q(`.bounce-card-${index}`);
      const baseTransform = cardTransforms[index] || "none";
      gsap.killTweensOf(target);

      if (index === hoveredIndex) {
        gsap.to(target, {
          transform: getSettledTransform(baseTransform),
          boxShadow: "0 16px 32px rgba(20, 40, 80, 0.13)",
          zIndex: 8,
          duration: 0.4,
          ease: "back.out(1.4)",
          delay: 0.04,
          overwrite: "auto",
        });
        return;
      }

      const distance = Math.abs(hoveredIndex - index);
      const offsetX = index < hoveredIndex ? -88 : 88;
      gsap.to(target, {
        transform: getPushedTransform(baseTransform, offsetX),
        boxShadow: "0 8px 18px rgba(20, 40, 80, 0.075)",
        zIndex: index,
        duration: 0.4,
        ease: "back.out(1.4)",
        delay: distance * 0.05,
        overwrite: "auto",
      });
    });
  };

  const resetSiblings = () => {
    setHoveredIndex(null);
    if (!enableHover || !containerRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const q = gsap.utils.selector(containerRef);

    cards.forEach((_, index) => {
      const target = q(`.bounce-card-${index}`);
      gsap.killTweensOf(target);
      gsap.to(target, {
        transform: cardTransforms[index] || "none",
        boxShadow: "0 8px 18px rgba(20, 40, 80, 0.075)",
        zIndex: index === activeIndex ? 6 : index,
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`bounce-cards-container ${className}`}
      ref={containerRef}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {cards.map((card, index) => (
        <button
          type="button"
          key={card.id}
          className={`bounce-card bounce-card-${index} ${activeIndex === index ? "is-active" : ""} ${hoveredIndex === index ? "is-hovered" : ""} ${hoveredIndex !== null && hoveredIndex !== index ? "is-muted" : ""}`}
          style={{
            transform: cardTransforms[index] || "none",
            zIndex: activeIndex === index ? 6 : index,
          }}
          onMouseEnter={() => pushSiblings(index)}
          onFocus={() => pushSiblings(index)}
          onMouseLeave={resetSiblings}
          onBlur={resetSiblings}
          onClick={() => onCardClick?.(card, index)}
          aria-label={`打开${card.title}项目详情`}
        >
          <span className="bounce-card-cover">
            <img className="bounce-card-image" src={card.image} alt={card.title + "项目封面"} />
          </span>
          <span className="bounce-card-body">
            <span className="bounce-card-title">{card.title}</span>
            <span className="bounce-card-tag">{card.badge || "个人"}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
