import { useState, useEffect } from "react";

// The useMousePosition hook remains the same
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};

export const InvertedCursor = () => {
  const { x, y } = useMousePosition();
  // New state to track hover status
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Select all target elements
    const hoverableElements = document.querySelectorAll(
      "a, button, h1, h2, h3, h4, h5, h6, img",
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners to all target elements
    hoverableElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup: remove event listeners when the component unmounts
    return () => {
      hoverableElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div
      className={`inverted-cursor ${isHovering ? "grow" : ""}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    />
  );
};
