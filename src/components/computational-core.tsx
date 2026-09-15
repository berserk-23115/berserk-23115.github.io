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
      if (
        preference.matches ||
        document.documentElement.dataset.motion === "paused"
      )
        return;
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
      const quality =
        width < 600 ? "LOW" : devicePixelRatio > 2 ? "MEDIUM" : "HIGH";
      element.dataset.quality = quality;
      renderer.setPixelRatio(
        Math.min(devicePixelRatio, quality === "LOW" ? 1 : 1.5),
      );
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
      camera.position.z = 8;
      const uniforms = {
        uTime: { value: 0 },
        uSplit: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
      };
      const geometry = new THREE.PlaneGeometry(
        Math.PI * 2,
        1,
        quality === "LOW" ? 150 : 260,
        quality === "LOW" ? 80 : 140,
      );
      const material = new THREE.ShaderMaterial({
        uniforms,
        side: THREE.DoubleSide,
        transparent: true,
        vertexShader: `
          uniform float uTime; uniform float uSplit; uniform vec2 uPointer;
          varying vec2 vUv; varying float vLight;
          void main() {
            vUv = uv;
            float u = uv.x * 6.283185; float v = uv.y;
            float r = 1.05 + v * 1.3;
            float breathe = sin(u * 3.0 + uTime * .35) * .035;
            vec3 p = vec3(cos(u) * r * (1.0 + .22 * sin(u * 3.0 + v * 2.0)),
              sin(u) * r * .72 + sin(u * 2.0 + v * 4.0) * .56,
              sin(u * 3.0 + v * 3.0) * .4 + cos(v * 5.0) * .25 + breathe);
            p.z += uSplit * sin(v * 32.0) * .42;
            p.xy += uSplit * vec2(cos(v * 20.0),sin(v * 14.0)) * v * .4;
            p.z += uPointer.x * sin(u) * .08;
            vLight = .25 + .75 * pow(abs(sin(u * 1.5 + v * 2.0 - .5)), 3.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }`,
        fragmentShader: `
          varying vec2 vUv; varying float vLight;
          void main() {
            float bands = vUv.y * 120.0;
            float edge = abs(fract(bands) - .5);
            float line = 1.0 - smoothstep(.12, .12 + fwidth(bands) * .65, edge);
            vec3 silver = mix(vec3(.32,.36,.43), vec3(.91,.92,.91), vLight);
            float fade = smoothstep(0.0,.025,vUv.y) * smoothstep(1.0,.975,vUv.y);
            gl_FragColor = vec4(silver, (.06 + line * .88) * fade);
          }`,
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
        scroll = Math.min(1, window.scrollY / innerHeight);
      };
      const tick = (now: number) => {
        if (disposed) return;
        frame = requestAnimationFrame(tick);
        if (!visible || document.hidden) {
          last = now;
          return;
        }
        if (quality === "LOW" && now - last < 32) return;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        time +=
          dt * (document.documentElement.dataset.palette === "open" ? 0.12 : 1);
        uniforms.uTime.value = time;
        uniforms.uSplit.value += (scroll - uniforms.uSplit.value) * 0.05;
        uniforms.uPointer.value.lerp(
          targetPointer.set(pointer.x, pointer.y),
          0.025,
        );
        mesh.rotation.y += (-0.4 + pointer.x * 0.15 - mesh.rotation.y) * 0.025;
        mesh.rotation.x += (0.13 + pointer.y * 0.1 - mesh.rotation.x) * 0.025;
        renderer.render(scene, camera);
        element.dataset.ready = "true";
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
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
    const start = () => {
      void setup();
    };
    start();
    preference.addEventListener("change", start);
    window.addEventListener("matter-motion", start);
    return () => {
      disposed = true;
      release?.();
      preference.removeEventListener("change", start);
      window.removeEventListener("matter-motion", start);
    };
  }, []);
  return (
    <figure
      className="computational-core"
      ref={host}
      aria-label="Computational core: a folded metallic contour surface"
    >
      <CoreArt />
      <canvas ref={canvas} aria-hidden="true" />
      <figcaption>
        <b>FIG. 01</b> COMPUTATIONAL MATTER
        <br />A STUDY IN SIGNAL & STRUCTURE
      </figcaption>
    </figure>
  );
}
