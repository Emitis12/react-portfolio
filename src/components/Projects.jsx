import React, { useEffect, useState, useRef } from "react";
import { FaGithub, FaBehance } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import img1 from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project A",
    description: "Cool project using React.",
    image: img1,
    altImage: img2,
    details: "Reusable components, routing, and state management with hooks.",
    liveLink: "https://example.com/project-a",
    github: "https://github.com/your-username/project-a",
    behance: "https://behance.net/your-username/project-a",
    frameworks: ["React", "TailwindCSS", "GSAP"]
  },
  {
    title: "Project B",
    description: "Awesome UI with Tailwind.",
    image: img2,
    altImage: img3,
    details: "Responsive layout, animations, and form validation.",
    liveLink: "https://example.com/project-b",
    github: "https://github.com/your-username/project-b",
    behance: "https://behance.net/your-username/project-b",
    frameworks: ["TailwindCSS", "JavaScript"]
  },
  {
    title: "Project C",
    description: "Another cool UI.",
    image: img3,
    altImage: img1,
    details: "Animations, dark mode, responsive design.",
    liveLink: "https://example.com/project-c",
    github: "https://github.com/your-username/project-c",
    behance: "https://behance.net/your-username/project-c",
    frameworks: ["HTML", "CSS", "Framer Motion"]
  }
];

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const modalRef = useRef();
  const cardsRef = useRef([]);

  const closeModal = () => setSelectedIndex(null);
  const handleNext = () => setSelectedIndex((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" });

      const handleEsc = (e) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [selectedIndex]);

  const selectedProject = projects[selectedIndex];

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-white">
      <h1 className="text-6xl font-extrabold mb-6 animate-gradient">Yea! I work hard</h1>
      <h3 className="mb-10 text-gray-300">Here are some of my unique works</h3>

      <div className="flex flex-col gap-20">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => setSelectedIndex(i)}
            className="group cursor-pointer border border-white rounded-4xl bg-[#111] hover:bg-[#1a1a1a] p-8 transition-all duration-300 hover:shadow-xl min-h-[28rem] relative"
          >
            {/* Project Number - Large, No Background, Faded Bottom */}
            <div className="absolute top-0 left-200 text-7xl tracking-tighter font-bold text-white/30 leading-none fade-bottom z-10 select-none">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="flex flex-col items-center text-center lg:text-left lg:items-start lg:flex-row gap-8 lg:gap-12">
              {/* Frameworks */}
              <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-start lg:items-center w-full lg:w-auto mb-4 lg:mb-0 lg:space-y-12 lg:pt-35">
                {project.frameworks.map((fw, idx) => (
                  <div
                    key={idx}
                    className="text-blue-400 text-sm font-mono whitespace-nowrap lg:-rotate-90"
                  >
                    {fw}
                  </div>
                ))}
              </div>

              {/* Image */}
              <div className="relative w-full lg:w-[60%] h-[16rem] lg:h-[30rem] overflow-hidden rounded-lg group/image">
                <img
                  src={project.image}
                  alt="project"
                  className="absolute w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-0"
                />
                <img
                  src={project.altImage}
                  alt="project alt"
                  className="absolute w-full h-full object-cover scale-0 transition-transform duration-500 group-hover/image:scale-100"
                />
              </div>

              {/* Info */}
              <div className="flex-1 mt-4 lg:mt-0 lg:pt-40">
                <h2 className="text-2xl lg:text-2xl font-bold mb-2">{project.title}</h2>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block relative text-blue-400 font-medium mb-4 group/link"
                >
                  View Page
                  <span className="block w-full h-[1px] bg-blue-400 scale-x-50 group-hover/link:scale-x-100 origin-left transition-transform duration-300"></span>
                </a>

                <div className="flex justify-center lg:justify-start items-center gap-4 mt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition text-2xl"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={project.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition text-2xl"
                  >
                    <FaBehance />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="relative bg-[#111] p-6 rounded-lg shadow-xl max-w-xl w-full mx-4 text-white border border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-400 hover:text-red-500"
            >
              &times;
            </button>

            <div className="flex justify-between items-center mb-4">
              <button onClick={handlePrev} className="text-white hover:text-blue-400">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-semibold text-white">
                {selectedProject.title}
              </h3>
              <button onClick={handleNext} className="text-white hover:text-blue-400">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="rounded mb-4 w-full h-48 object-cover"
            />
            <p className="mb-2 text-white">{selectedProject.description}</p>
            <p className="text-white mb-4">{selectedProject.details}</p>

            <div className="flex gap-4 mt-2 flex-wrap">
              {selectedProject.liveLink && (
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Visit Live Project
                </a>
              )}
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white text-white rounded hover:bg-gray-800 transition"
                >
                  <FaGithub className="text-xl" />
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
