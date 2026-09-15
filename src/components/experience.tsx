"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { motionTokens } from "@/lib/motion";

const subscribe = (callback: () => void) => {
  window.addEventListener("matter-motion", callback);
  return () => window.removeEventListener("matter-motion", callback);
};
const pausedSnapshot = () =>
  document.documentElement.dataset.motion === "paused";

export function HeroType() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const paused = useSyncExternalStore(subscribe, pausedSnapshot, () => false);
  const { scrollY } = useScroll();
  const shift = useSpring(
    useTransform(scrollY, [0, 800], [0, -55]),
    motionTokens.soft,
  );
  return (
    <motion.h1
      ref={ref}
      id="page-title"
      className="hero-title"
      style={{ y: reduced || paused ? 0 : shift }}
      initial={false}
    >
      Engineering
      <br />
      where <em>the details</em>
      <br />
      are the product<i>.</i>
    </motion.h1>
  );
}

export function Experience() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            document.querySelectorAll("nav a[data-target]").forEach((link) => {
              const active =
                (link as HTMLElement).dataset.target === entry.target.id;
              if (active) link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
          }
        }
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    const rail = document.querySelector(".navigation");
    const hero = document.querySelector(".hero");
    const railObserver = new IntersectionObserver(
      ([entry]) => {
        rail?.classList.toggle("is-condensed", !entry.isIntersecting);
      },
      { rootMargin: "-100px 0px 0px 0px" },
    );
    if (hero) railObserver.observe(hero);
    return () => {
      observer.disconnect();
      railObserver.disconnect();
    };
  }, []);
  return null;
}
