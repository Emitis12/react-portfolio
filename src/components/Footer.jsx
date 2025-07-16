import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import logoImg from "../assets/logo.png"; // Adjust path if needed

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed bottom-0 left-0 w-full z-50 border-t border-white/20 bg-black/30 backdrop-blur-md text-white"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-4">
        {/* Left: Logo + Text */}
        <div className="flex items-center gap-3 text-sm">
          <img
            src={logoImg}
            alt="Logo"
            className="w-6 h-6 object-contain drop-shadow-md"
          />
          <span>&copy; {year} Israel Timothy. All rights reserved.</span>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-6 text-xl">
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </motion.a>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="hover:text-gray-300 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </motion.a>

          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="hover:text-blue-300 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}
