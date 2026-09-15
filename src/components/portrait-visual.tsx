"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface PortraitVisualProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function PortraitVisual({
  src = "/anushk_portrait.jpg",
  alt = "Anushk Kumar — Computer Science student at IIIT Delhi, working across AI, systems, and security",
  className = "",
}: PortraitVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let disposed = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    // Pointer coordinates normalized [-1, 1] and in canvas pixels
    let targetX = 0.5;
    let targetY = 0.4;
    let currentX = 0.5;
    let currentY = 0.4;
    let targetHoverFactor = 0.0;
    let currentHoverFactor = 0.0;

    img.onload = () => {
      if (disposed) return;
      setIsLoaded(true);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth || 320;
      const height = container.clientHeight || 400;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Offscreen canvas for original image downscaling
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      // Draw image cover-style onto offscreen
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      let drawW = canvas.width;
      let drawH = canvas.height;
      let drawX = 0;
      let drawY = 0;

      if (imgAspect > canvasAspect) {
        drawW = canvas.height * imgAspect;
        drawX = (canvas.width - drawW) / 2;
      } else {
        drawH = canvas.width / imgAspect;
        drawY = (canvas.height - drawH) / 2;
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);
      const originalData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
      const originalPixels = originalData.data;

      // Precompute monochrome / duotone representation with Floyd-Steinberg / Bayer dither
      const ditheredData = offCtx.createImageData(canvas.width, canvas.height);
      const ditheredPixels = ditheredData.data;

      // 4x4 Bayer threshold matrix
      const bayer4 = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5],
      ];

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const r = originalPixels[idx];
          const g = originalPixels[idx + 1];
          const b = originalPixels[idx + 2];
          const a = originalPixels[idx + 3];

          if (a === 0) continue;

          // Perceptual luminance
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const bayerVal = (bayer4[y % 4][x % 4] / 16 - 0.5) * 42;
          const thresholded = lum + bayerVal;

          // Stylized Duotone: Deep graphite (#0f172a) to crisp silver cyan (#cbd5e1 / #38bdf8)
          const norm = Math.max(0, Math.min(255, thresholded)) / 255;

          // Cool duotone tint
          ditheredPixels[idx] = Math.round(18 + norm * 205); // R
          ditheredPixels[idx + 1] = Math.round(24 + norm * 218); // G
          ditheredPixels[idx + 2] = Math.round(38 + norm * 230); // B
          ditheredPixels[idx + 3] = a;
        }
      }

      // Buffer for final rendered frame
      const frameData = offCtx.createImageData(canvas.width, canvas.height);
      const framePixels = frameData.data;

      const render = () => {
        if (disposed) return;

        // Smooth physics interpolation for pointer coordinates and hover factor
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        currentHoverFactor += (targetHoverFactor - currentHoverFactor) * 0.07;

        const pX = currentX * canvas.width;
        const pY = currentY * canvas.height;
        const maxRadius = canvas.width * 0.72;
        const radius = maxRadius * currentHoverFactor;
        const radiusSq = radius * radius;

        // Composite between dithered and original color photograph
        for (let y = 0; y < canvas.height; y++) {
          const dy = y - pY;
          const dySq = dy * dy;

          for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;
            const dx = x - pX;
            const distSq = dx * dx + dySq;

            let reveal = 0;
            if (radius > 0 && distSq < radiusSq) {
              const d = Math.sqrt(distSq);
              // Soft falloff edge
              reveal = Math.max(0, 1 - d / radius);
              reveal = reveal * reveal * (3 - 2 * reveal); // Smoothstep
            }

            // Blend dithered pixels with full-color original
            const invReveal = 1 - reveal;
            framePixels[idx] = Math.round(
              ditheredPixels[idx] * invReveal + originalPixels[idx] * reveal
            );
            framePixels[idx + 1] = Math.round(
              ditheredPixels[idx + 1] * invReveal + originalPixels[idx + 1] * reveal
            );
            framePixels[idx + 2] = Math.round(
              ditheredPixels[idx + 2] * invReveal + originalPixels[idx + 2] * reveal
            );
            framePixels[idx + 3] = originalPixels[idx + 3];
          }
        }

        ctx.putImageData(frameData, 0, 0);

        // Add subtle chromatic edge / luminous boundary on pointer reveal
        if (currentHoverFactor > 0.02) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(pX, pY, radius, 0, Math.PI * 2);
          ctx.lineWidth = 1.5 * dpr;
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * currentHoverFactor})`;
          ctx.stroke();
          ctx.restore();
        }

        animId = requestAnimationFrame(render);
      };

      render();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      targetY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      targetHoverFactor = 1.0;
    };

    const handlePointerEnter = () => {
      setIsHovered(true);
      targetHoverFactor = 1.0;
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      targetHoverFactor = 0.0;
      targetX = 0.5;
      targetY = 0.4;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [src, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`portrait-frame ${isHovered ? "is-active" : ""} ${className}`}
      aria-label={alt}
    >
      {/* Background Luminous Halftone Glow */}
      <div className="portrait-luminous-glow" aria-hidden="true" />

      {/* Semantic image for SEO / fallback */}
      <Image
        src={src}
        alt={alt}
        width={340}
        height={420}
        priority
        className={`portrait-img-fallback ${isLoaded && !reducedMotion ? "is-hidden" : ""}`}
      />

      {/* Interactive Dither / Chromatic Canvas */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="portrait-canvas"
          aria-hidden="true"
        />
      )}

      {/* Editorial Frame Overlays */}
      <div className="portrait-hud" aria-hidden="true">
        <div className="hud-corner top-left" />
        <div className="hud-corner top-right" />
        <div className="hud-corner bottom-left" />
        <div className="hud-corner bottom-right" />

        <div className="hud-meta">
          <span className="hud-tag">AK // 2026</span>
          <span className="hud-status">
            <i className="status-dot" /> LIVE
          </span>
        </div>
        <div className="hud-coords">28.5457° N · 77.2732° E · IIITD</div>
      </div>
    </div>
  );
}
