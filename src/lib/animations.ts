export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
}

export const cardHover = {
  rest: { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  hover: { y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.12)", transition: { duration: 0.3 } },
}

export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
