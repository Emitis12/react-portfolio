import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";

// Full name split into characters
const name = "ISRAEL TIMOTHY - ISRAEL TIMOTHY".split("");

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  const angle = useRef(0);
  const lettersRef = useRef([]);

  const radius = 40;
  const speed = 30;
  const delayBetweenLetters = 11;

  useAnimationFrame((t, delta) => {
    angle.current += (delta / 1000) * speed;

    name.forEach((_, i) => {
      const offsetAngle = angle.current - i * delayBetweenLetters;
      const rad = (offsetAngle * Math.PI) / 180;
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;

      const el = lettersRef.current[i];
      if (el) {
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  });

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: useTransform(mouseX, (x) => x + 10), // small offset to move animation bottom-right
        y: useTransform(mouseY, (y) => y + 10),
        width: 120,
        height: 120,
      }}
    >
      <div className="relative w-full h-full">
        {name.map((char, i) => (
          <div
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="absolute left-1/2 top-1/2 text-blue-400 text-[10px] font-bold"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {char}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
