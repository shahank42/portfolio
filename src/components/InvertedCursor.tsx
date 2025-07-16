import React, { useState, useEffect, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

export const InvertedCursor: React.FC = () => {
  // This state is the ONLY thing that will cause a re-render.
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // We use refs for all position data to avoid re-rendering on every animation frame.
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef<Position>({ x: 0, y: 0 }); // The real mouse position
  const animatedPos = useRef<Position>({ x: 0, y: 0 }); // The animated cursor position

  useEffect(() => {
    // Selectors for elements that will cause the cursor to grow.
    const hoverableSelectors = "a, button, h1, h2, h3, h4, h5, h6";

    // === EVENT LISTENERS ===
    // This effect runs only once to set up all event listeners.

    const handleMouseMove = (e: MouseEvent) => {
      // Update the ref without causing a re-render.
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Use event delegation for hover effects.
    const handleMouseOver = (e: MouseEvent) => {
      // Check if the target or its parent matches our selectors.
      if ((e.target as Element).closest(hoverableSelectors)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(hoverableSelectors)) {
        setIsHovering(false);
      }
    };

    // Add all listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // === ANIMATION LOOP ===
    const DAMPING_FACTOR = 0.1;
    let animationFrameId: number;

    const animate = () => {
      // Dampen the movement
      animatedPos.current.x +=
        (mousePos.current.x - animatedPos.current.x) * DAMPING_FACTOR;
      animatedPos.current.y +=
        (mousePos.current.y - animatedPos.current.y) * DAMPING_FACTOR;

      // Apply the animated position to the cursor's style
      if (cursorRef.current) {
        cursorRef.current.style.left = `${animatedPos.current.x}px`;
        cursorRef.current.style.top = `${animatedPos.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(animate);

    // === CLEANUP ===
    return () => {
      // Clean up all listeners and the animation frame on unmount
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // The empty dependency array is crucial: this effect runs only ONCE.

  return (
    <div
      ref={cursorRef}
      className={`inverted-cursor ${isHovering ? "grow" : ""}`}
    />
  );
};
