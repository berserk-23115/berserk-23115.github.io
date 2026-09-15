"use client";

import { useEffect, useRef } from "react";
import { CoreArt } from "./core-art";

export function ComputationalCore() {
  const host = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = host.current;
    const target = canvas.current;
    if (!element || !target) return;

    let disposed = false;
    let release: (() => void) | undefined;
    let generation = 0;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");

    const setup = async () => {
      const currentGeneration = ++generation;
      release?.();
      release = undefined;
      element.dataset.ready = "false";

      if (preference.matches || document.documentElement.dataset.motion === "paused") {
        return;
      }

      const THREE = await import("three");
      if (disposed || currentGeneration !== generation) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas: target,
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }

      const width = window.innerWidth;
      const quality = width < 600 ? "LOW" : devicePixelRatio > 2 ? "MEDIUM" : "HIGH";
      element.dataset.quality = quality;

      // Clamp DPR strictly per performance rules
      renderer.setPixelRatio(Math.min(devicePixelRatio, quality === "LOW" ? 1 : 1.5));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
      camera.position.z = 8;

      const uniforms = {
        uTime: { value: 0 },
        uSplit: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
      };

      // Computational matter plane representing CUDA execution grids & manifold
      const geometry = new THREE.PlaneGeometry(
        Math.PI * 2,
        1,
        quality === "LOW" ? 140 : 240,
        quality === "LOW" ? 70 : 130
      );

      const material = new THREE.ShaderMaterial({
        uniforms,
        side: THREE.DoubleSide,
        transparent: true,
        vertexShader: `
          uniform float uTime;
          uniform float uSplit;
          uniform vec2 uPointer;
          varying vec2 vUv;
          varying float vLight;

          void main() {
            vUv = uv;
            float u = uv.x * 6.283185;
            float v = uv.y;
            float r = 1.05 + v * 1.3;
            float breathe = sin(u * 3.0 + uTime * .32) * .035;
            vec3 p = vec3(
              cos(u) * r * (1.0 + .22 * sin(u * 3.0 + v * 2.0)),
              sin(u) * r * .72 + sin(u * 2.0 + v * 4.0) * .56,
              sin(u * 3.0 + v * 3.0) * .4 + cos(v * 5.0) * .25 + breathe
            );
            p.z += uSplit * sin(v * 32.0) * .42;
            p.xy += uSplit * vec2(cos(v * 20.0), sin(v * 14.0)) * v * .4;
            p.z += uPointer.x * sin(u) * .08;
            vLight = .25 + .75 * pow(abs(sin(u * 1.5 + v * 2.0 - .5)), 3.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          varying float vLight;

          void main() {
            // High precision execution lanes
            float bands = vUv.y * 128.0;
            float edge = abs(fract(bands) - .5);
            float line = 1.0 - smoothstep(.12, .12 + fwidth(bands) * .65, edge);
            
            // Luminous cool silver-blue gradient shading
            vec3 darkMetal = vec3(0.18, 0.22, 0.28);
            vec3 brightAccent = vec3(0.72, 0.84, 0.96);
            vec3 color = mix(darkMetal, brightAccent, vLight);
            
            float fade = smoothstep(0.0, .03, vUv.y) * smoothstep(1.0, .97, vUv.y);
            gl_FragColor = vec4(color, (.05 + line * .85) * fade);
          }
        `,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0.13, -0.4, -0.42);
      scene.add(mesh);

      const resize = new ResizeObserver(() => {
        const bounds = element.getBoundingClientRect();
        renderer.setSize(bounds.width, bounds.height, false);
        camera.aspect = bounds.width / Math.max(bounds.height, 1);
        camera.updateProjectionMatrix();
      });
      resize.observe(element);

      let visible = true;
      let frame = 0;
      let last = 0;
      let time = 0;
      let scroll = 0;
      const pointer = { x: 0, y: 0 };
      const targetPointer = new THREE.Vector2();

      const move = (event: PointerEvent) => {
        pointer.x = (event.clientX / innerWidth) * 2 - 1;
        pointer.y = (event.clientY / innerHeight) * 2 - 1;
      };

      const onScroll = () => {
        scroll = Math.min(1, window.scrollY / Math.max(innerHeight, 1));
      };

      const tick = (now: number) => {
        if (disposed) return;
        frame = requestAnimationFrame(tick);

        // Pause completely when tab hidden or offscreen
        if (!visible || document.hidden) {
          last = now;
          return;
        }

        // Throttle low quality devices to 30fps
        if (quality === "LOW" && now - last < 32) return;

        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        time += dt * (document.documentElement.dataset.palette === "open" ? 0.15 : 1);

        uniforms.uTime.value = time;
        uniforms.uSplit.value += (scroll - uniforms.uSplit.value) * 0.05;
        uniforms.uPointer.value.lerp(targetPointer.set(pointer.x, pointer.y), 0.025);

        mesh.rotation.y += (-0.4 + pointer.x * 0.12 - mesh.rotation.y) * 0.025;
        mesh.rotation.x += (0.13 + pointer.y * 0.08 - mesh.rotation.x) * 0.025;

        renderer.render(scene, camera);
        element.dataset.ready = "true";
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(element);

      const lost = (event: Event) => {
        event.preventDefault();
        element.dataset.ready = "false";
        cancelAnimationFrame(frame);
      };

      target.addEventListener("webglcontextlost", lost);
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      frame = requestAnimationFrame(tick);

      release = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resize.disconnect();
        window.removeEventListener("pointermove", move);
        window.removeEventListener("scroll", onScroll);
        target.removeEventListener("webglcontextlost", lost);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    void setup();
    preference.addEventListener("change", setup);
    window.addEventListener("matter-motion", setup);

    return () => {
      disposed = true;
      release?.();
      preference.removeEventListener("change", setup);
      window.removeEventListener("matter-motion", setup);
    };
  }, []);

  return (
    <figure
      className="computational-core"
      ref={host}
      aria-label="Computational core: folded parallel execution contour manifold"
    >
      <CoreArt />
      <canvas ref={canvas} aria-hidden="true" />
      <figcaption className="core-caption">
        <span>FIG. 01 // COMPUTATIONAL MANIFOLD</span>
        <span>PARALLEL EXECUTION & SIGNAL TOPOLOGY</span>
      </figcaption>
    </figure>
  );
}
