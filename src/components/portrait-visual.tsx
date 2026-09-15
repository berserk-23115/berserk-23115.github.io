"use client";

import Image from "next/image";
import { DitherShader } from "@/components/dither-shader";

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
  return (
    <div className={`portrait-frame ${className}`} aria-label={alt}>
      <div className="portrait-luminous-glow" aria-hidden="true" />
      <Image src={src} alt={alt} width={340} height={420} priority className="portrait-img-fallback" />
      <DitherShader
        src={src}
        gridSize={0}
        primaryColor="#10141d"
        secondaryColor="#dbeafe"
        threshold={0.5}
        animated
        animationSpeed={0.0005}
        className="portrait-dither"
      />
    </div>
  );
}
