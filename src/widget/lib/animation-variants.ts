// Animation variants for consistent motion across the widget
export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0,
    scale: 0.98,
  }),
};

export const fadeVariants = {
  enter: {
    opacity: 0,
    y: 10,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

export const scaleVariants = {
  enter: {
    opacity: 0,
    scale: 0.9,
  },
  center: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1.1,
  },
};

// Transition presets
export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  duration: 0.3,
};

export const smoothTransition = {
  type: "tween" as const,
  ease: "easeInOut",
  duration: 0.25,
};

export const bouncyTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  duration: 0.4,
};

// Button interaction variants
export const buttonVariants = {
  idle: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -1,
    transition: springTransition,
  },
  tap: {
    scale: 0.98,
    y: 1,
    transition: { duration: 0.1 },
  },
};

// Input field variants
export const inputVariants = {
  idle: {
    scale: 1,
    borderWidth: "1px",
  },
  focus: {
    scale: 1.01,
    borderWidth: "2px",
    transition: springTransition,
  },
  error: {
    x: [0, -2, 2, -2, 2, 0],
    transition: { duration: 0.4 },
  },
};

// Card selection variants
export const cardVariants = {
  idle: {
    scale: 1,
    y: 0,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: "0px 8px 16px rgba(0,0,0,0.15)",
    transition: springTransition,
  },
  selected: {
    scale: 1.05,
    y: -3,
    boxShadow: "0px 12px 24px rgba(104,61,255,0.2)",
    transition: bouncyTransition,
  },
};

// Loading and success states
export const loadingVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export const successVariants = {
  initial: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 25,
      duration: 0.6,
    },
  },
};

// Stagger animations for lists
export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};