export const fadeIn = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
  exit: { opacity: 0, y: 30 },
  icons: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const spin = {
  animate: { rotate: 360 },
  transition: { repeat: Infinity, duration: 10, ease: "linear" },
  reverse: {
    animate: { rotate: -360 },
    transition: { repeat: Infinity, duration: 10, ease: "linear" },
  },
};

export const translate = {
  initial: { x: "0%" },
  animate: { x: "-100%" },
  transition: (numerOfSkills) => ({
    repeat: Infinity,
    duration: (3 / 2) * numerOfSkills + 28,
    ease: "linear",
  }),
};
