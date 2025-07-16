import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <motion.button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-16 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300"
      aria-label="Scroll to top"
    >
      <motion.div
        animate={{ y: hovered ? 0 : [0, -5, 0] }}
        transition={hovered ? { duration: 0 } : { repeat: Infinity, duration: 1.5 }}
      >
        <ArrowUp size={20} />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, width: 0 }}
        animate={hovered ? { opacity: 1, width: "auto" } : { opacity: 0, width: 0 }}
        transition={{ duration: 0.3 }}
        className="whitespace-nowrap overflow-hidden text-sm"
      >
        Back to Top
      </motion.span>
    </motion.button>
  ) : null;
}
