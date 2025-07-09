import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3, FaJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiSass } from "react-icons/si";
import { BsUiRadios } from "react-icons/bs";

const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3 /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "SCSS", icon: <SiSass /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "ShadCN UI", icon: <BsUiRadios /> },
];

export default function Skills() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {skills.map(({ name, icon }, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4 border p-4 rounded shadow-md bg-white/5 backdrop-blur"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-2xl text-blue-400">{icon}</div>
            <div className="font-medium">{name}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
