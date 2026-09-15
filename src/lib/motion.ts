export const motionTokens = {
  soft: { type: "spring", stiffness: 70, damping: 24, mass: 1.3 },
  interface: { type: "spring", stiffness: 240, damping: 28 },
  reveal: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
} as const;
