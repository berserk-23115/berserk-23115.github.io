"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface DitherShaderProps {
  src: string;
  gridSize?: number;
  primaryColor?: string;
  secondaryColor?: string;
  threshold?: number;
  animated?: boolean;
  animationSpeed?: number;
  className?: string;
}

const BAYER_4 = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];

function parseHex(color: string): [number, number, number] {
  const hex = color.replace("#", "");
  const value = hex.length === 3 ? hex.split("").map((part) => part + part).join("") : hex;
  return [Number.parseInt(value.slice(0, 2), 16), Number.parseInt(value.slice(2, 4), 16), Number.parseInt(value.slice(4, 6), 16)];
}

function luminance(r: number, g: number, b: number) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export function DitherShader({
  src,
  gridSize = 4,
  primaryColor = "#10141d",
  secondaryColor = "#e2e8f0",
  threshold = 0.5,
  animated = true,
  animationSpeed = 0.018,
  className = "",
}: DitherShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new window.Image();
    image.src = src;
    let frame = 0;
    let cancelled = false;
    let time = 0;
    const dark = parseHex(primaryColor);
    const light = parseHex(secondaryColor);

    const render = () => {
      if (cancelled || !image.complete || !image.naturalWidth) return;
      const width = Math.max(1, Math.floor(container.clientWidth));
      const height = Math.max(1, Math.floor(container.clientHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const source = document.createElement("canvas");
      source.width = width;
      source.height = height;
      const sourceContext = source.getContext("2d");
      if (!sourceContext) return;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      sourceContext.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      const pixels = sourceContext.getImageData(0, 0, width, height).data;
      const size = Math.max(2, gridSize);

      for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
          const pixel = (y * width + x) * 4;
          const value = luminance(pixels[pixel], pixels[pixel + 1], pixels[pixel + 2]);
          const matrix = BAYER_4[Math.floor(y / size) % 4][Math.floor(x / size) % 4] / 16;
          const animatedBias = animated && !reducedMotion ? Math.sin(time + x * 0.015 + y * 0.01) * 0.035 : 0;
          const isLight = value + animatedBias > matrix * (1 - threshold) + threshold * 0.5;
          const color = isLight ? light : dark;
          context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          context.fillRect(x, y, size, size);
        }
      }
    };

    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(container);
    image.onload = render;

    const animateFrame = () => {
      if (cancelled) return;
      time += animationSpeed;
      render();
      if (animated && !reducedMotion) frame = requestAnimationFrame(animateFrame);
    };

    render();
    if (animated && !reducedMotion) frame = requestAnimationFrame(animateFrame);
    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [src, gridSize, primaryColor, secondaryColor, threshold, animated, animationSpeed, reducedMotion]);

  return <div ref={containerRef} className={`dither-shader ${className}`} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
