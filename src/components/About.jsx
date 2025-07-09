import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(textRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className=" text-white py-20 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="flex-shrink-0 w-30 h-30 rounded-full overflow-hidden border-4 border-gray-300" ref={imageRef}>
          <img
            src="src/img/israel1.png"
            alt="Israel Timothy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-gray-300 leading-relaxed text-md">
           I'm <span className="text-white font-mono">Israel Timothy</span>, a frontend developer and creative technologist who brings ideas to life through clean code and immersive design. With a sharp eye for detail and a passion for modern web tools. I craft sleek and interactive interfaces that feel as good as they look. I thrive on turning complex problems into elegant user experiences - seamless, performant, and unforgettable.
          </p>
        </div>
      </div>
    </section>
  );
}
