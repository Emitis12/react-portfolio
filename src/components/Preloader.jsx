import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import bg7 from "../img/bg6.jpg";

const techStack = [
  "HTML",
  "CSS & SCSS",
  "JavaScript",
  "TypeScript",
  "React.JS",
  "Next.JS",
  "Shadcn UI",
  "Tailwind CSS",
  "Bootstrap"
];

export default function Preloader({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentIndex < techStack.length - 1) {
      const timer = setTimeout(() => setCurrentIndex(currentIndex + 1), 800);
      return () => clearTimeout(timer);
    } else {
      const exitDelay = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onFinish(), 700);
      }, 1000);
      return () => clearTimeout(exitDelay);
    }
  }, [currentIndex, onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center text-white z-[9999] transition-all duration-700 ease-in-out ${
        isExiting ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{
        backgroundImage: `url(${bg7})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center gap-4 bg-black/40 px-6 py-4 rounded-xl backdrop-blur-sm">
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 object-contain animate-pulse drop-shadow-md"
        />
        <h1 className="text-2xl font-bold transition-opacity duration-500 ease-in-out">
          {techStack[currentIndex]}
        </h1>
      </div>
    </div>
  );
}
