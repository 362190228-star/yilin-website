export const ease = [0.22, 1, 0.36, 1];

export const dampedSpring = {
  type: "spring",
  stiffness: 86,
  damping: 24,
  mass: 0.9,
};

export const paperSpring = {
  type: "spring",
  stiffness: 74,
  damping: 26,
  mass: 1.05,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const sectionReveal = {
  hidden: { opacity: 0.72, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: paperSpring,
  },
};

export const detailSwitchMotion = (direction = 1) => ({
  initial: { opacity: 0, x: direction * 14, y: 6, filter: "blur(3px)" },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: dampedSpring,
  },
  exit: {
    opacity: 0,
    x: direction * -10,
    y: -4,
    filter: "blur(2px)",
    transition: { duration: 0.18, ease },
  },
});

export const modalMotion = {
  hidden: { opacity: 0, scale: 0.975, y: 34, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      opacity: { duration: 0.24, ease },
      scale: { type: "spring", stiffness: 92, damping: 28, mass: 1 },
      y: { type: "spring", stiffness: 92, damping: 28, mass: 1 },
      filter: { duration: 0.24, ease },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    y: 22,
    filter: "blur(2px)",
    transition: { duration: 0.22, ease },
  },
};
