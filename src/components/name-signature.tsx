"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

interface NameSignatureProps {
  className?: string;
  asHeading?: boolean;
}

export function NameSignature({
  className = "",
  asHeading = true,
}: NameSignatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const element = containerRef.current;
    if (!element) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      element.style.setProperty("--cursor-x", `${x}%`);
      element.style.setProperty("--cursor-y", `${y}%`);
    };

    element.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => element.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  const Tag = asHeading ? motion.h1 : motion.div;

  return (
    <div ref={containerRef} className={`name-signature-root ${className}`}>
      <Tag
        ref={textRef}
        className="name-signature-title"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="signature-first">Anushk</span>{" "}
        <span className="signature-last">Kumar</span>
      </Tag>

      {/* SVG-drawn precision accent path */}
      <svg
        className="name-signature-underline"
        viewBox="0 0 320 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.path
          d="M 2 8 Q 80 14, 160 8 T 318 10"
          stroke="url(#signature-glow-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={reducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx="318"
          cy="10"
          r="2.5"
          fill="#b8bec7"
          initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
          animate={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.35 }}
        />
        <defs>
          <linearGradient
            id="signature-glow-gradient"
            x1="0"
            y1="0"
            x2="320"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#b8bec7" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#e5e7eb" stopOpacity="0.45" />
            <stop offset="85%" stopColor="#9aa2ad" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#6b7280" stopOpacity="0.35" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
