"use client";

import { useEffect, useRef } from "react";

export function RealisticFogBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadScripts = async () => {
      // 1. Load Three.js if not already loaded on window
      if (!(window as any).THREE) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Three.js"));
          document.body.appendChild(script);
        });
      }

      // 2. Load Vanta Fog if not already loaded
      if (!(window as any).VANTA || !(window as any).VANTA.FOG) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Vanta Fog"));
          document.body.appendChild(script);
        });
      }

      // 3. Initialize Vanta Fog
      if (isMounted && containerRef.current && !vantaEffectRef.current) {
        const VANTA = (window as any).VANTA;
        if (VANTA && VANTA.FOG) {
          vantaEffectRef.current = VANTA.FOG({
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0x0a0a0f, // very dark blue-gray
            midtoneColor: 0x1e3a8a,    // deep blue matching website color theme
            lowlightColor: 0x3b82f6,   // bright theme blue
            baseColor: 0x050508,       // matching background color of the hero section (#050508)
            blurFactor: 0.7,
            speed: 1.8,
            zoom: 0.9,
          });
        }
      }
    };

    loadScripts().catch((err) => console.error(err));

    return () => {
      isMounted = false;
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-20"
      style={{ minHeight: "100%", minWidth: "100%" }}
    />
  );
}

export default RealisticFogBackground;
