import React from "react";
import AnimatedCursor from "react-animated-cursor";
// import "./CustomCursor.css";

export const InvertedCursor: React.FC = () => {
  return (
    <AnimatedCursor
      innerStyle={{ backgroundColor: "var(--color-secondary)" }}
      outerSize={40} // Size of the inverted circle
      innerScale={1}
      outerScale={1.9} // How much it grows on hover
      // This prop applies the inverted color effect
      hasBlendMode={true}
      // We provide our own styling for the outer circle
      outerStyle={{
        mixBlendMode: "exclusion",
        backgroundColor: "var(--color-primary)",
      }}
      // Define which elements will trigger the grow effect
      clickables={[
        "a",
        "button",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
      ]}
    />
  );
};
