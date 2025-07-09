import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const buttonElementRef = useRef(null);
  const scrollRef = useRef(null);

  const [typedText, setTypedText] = useState("");
  const words = ["Frontend Developer", "Creative Technologist", "UI/UX Enthusiast"];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typing animation
  useEffect(() => {
    const currentWord = words[wordIndex];
    if (charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + currentWord.charAt(charIndex));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const delay = setTimeout(() => {
        setTypedText("");
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 1500);
      return () => clearTimeout(delay);
    }
  }, [charIndex, wordIndex]);

  // GSAP initial animations
  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    );
    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6 }
    );
    gsap.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 1.5 }
    );
  }, []);

  // Button entrance animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        buttonContainerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: buttonContainerRef.current,
            start: "top 90%",
          },
        }
      );
    }, buttonContainerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-8 h-screen w-full flex flex-col justify-center items-center p-10 sm:p-12 md:p-16 text-white transition-colors duration-500 relative overflow-hidden"

    >
      {/* Heading */}
      <h1
        ref={headingRef}
        className="pt-20 text-4xl sm:text-6xl md:text-7xl font-extrabold text-center tracking-tight"
      >
        Shaping ideas into real world{" "}<br />
        <span className="animate-gradient font-extrabold">
  product
</span>
{" "}
          is the art I live for
      </h1>

      {/* Typing Subtitle */}
      <p
        ref={subtitleRef}
        className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4 text-center max-w-xl min-h-[2.5rem]"
      >
        {typedText}
        <span className="border-r-2 border-white animate-pulse ml-1"></span>
      </p>

      {/* CTA Button */}
<div
  ref={buttonContainerRef}
  className="mt-8 pt-8 flex flex-col items-start gap-4"
>
  <a
    ref={buttonElementRef}
    href="#contact"
    onMouseEnter={() =>
      gsap.to(buttonElementRef.current, {
        scale: 1.05,
        boxShadow: "0px 0px 15px rgba(255,255,255,0.25)",
        duration: 0.3,
        ease: "power2.out",
      })
    }
    onMouseLeave={() =>
      gsap.to(buttonElementRef.current, {
        scale: 1,
        boxShadow: "0px 0px 0px rgba(0,0,0,0)",
        duration: 0.3,
        ease: "power2.out",
      })
    }
    onMouseDown={() =>
      gsap.to(buttonElementRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power1.inOut",
      })
    }
    onMouseUp={() =>
      gsap.to(buttonElementRef.current, {
        scale: 1.05,
        duration: 0.1,
        ease: "power1.inOut",
      })
    }
    className="inline-flex items-center gap-2 px-6 py-3 text-base rounded-full bg-white text-black font-medium transform transition-all duration-300"
  >
    Let's Work Together
    <ArrowRight size={20} />
  </a>

</div>

      {/* Scroll Down Icon */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 text-gray-400 animate-bounce"
      >
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
