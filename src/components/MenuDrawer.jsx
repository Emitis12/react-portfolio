import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

export default function MenuDrawer({ isOpen, onClose }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power4.out",
      });
    } else {
      gsap.to(drawerRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "power4.in",
      });
    }
  }, [isOpen]);

  const links = ["Home", "About", "Projects", "Contact"];

  return (
    <div
      ref={drawerRef}
      className="fixed top-0 left-0 w-full h-screen bg-white dark:bg-black text-black dark:text-white z-50 transform -translate-x-full"
    >
      <div className="absolute top-6 right-6">
        <button onClick={onClose}>
          <X size={32} className="hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <nav className="h-full flex flex-col justify-center items-center gap-8 text-2xl font-medium">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={onClose}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            {link}
          </a>
        ))}
      </nav>
    </div>
  );
}
