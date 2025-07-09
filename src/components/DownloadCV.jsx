import React, { useEffect, useRef } from "react";
import { Download } from "lucide-react";
import gsap from "gsap";

export default function DownloadCV() {
  const containerRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-center py-10  text-white transition-colors duration-500"
    >
      <a
        href="/cv.pdf"
        download
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-700 animate-pulse"
        onMouseEnter={() => {
          gsap.to(iconRef.current, {
            rotate: 360,
            duration: 0.6,
            ease: "power2.inOut",
          });
        }}
      >
        <Download ref={iconRef} size={20} />
        Download My CV
      </a>
    </div>
  );
}
