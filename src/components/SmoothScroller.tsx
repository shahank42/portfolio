// src/components/SmoothScroller.tsx
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const SmoothScroller = () => {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1, // Controls the "smoothness." Lower is smoother.
      autoRaf: true,
    });

    // 2. Set up the animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrameId = requestAnimationFrame(raf);

    // 3. Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []); // The empty dependency array ensures this runs only once on mount

  // This component doesn't render anything itself
  return null;
};
