import React, { useState, useRef, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import logoImg from "../assets/logo.png";

const socialLinks = [
  { icon: <FaTwitter />, href: "https://twitter.com/iam_tis", label: "Twitter" },
  { icon: <FaGithub />, href: "https://github.com/Emitis12", label: "GitHub" },
  { icon: <FaLinkedin />, href: "https://linkedin.com/in/israeltimothy", label: "LinkedIn" },
];

const navLinks = [
  { label: "Resume", to: "/src/files/cv.pdf" },
  { label: "Blog", to: "/blog" },
];

const AnimatedNavbar = forwardRef(function Navbar(_, ref) {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const desktopLinksRef = useRef([]);
  const location = useLocation();

  menuItemsRef.current = [];
  desktopLinksRef.current = [];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const addToRefs = (el, listRef) => {
    if (el && !listRef.current.includes(el)) {
      listRef.current.push(el);
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-8 left-0 w-full z-50 flex justify-center items-center px-6 py-3"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between w-full max-w-full sm:max-w-2xl md:max-w-4xl
                        bg-white/20 backdrop-blur-md border border-white/30 
                        rounded-2xl px-4 py-2 shadow-lg">
          {/* Logo + Text */}
          <div className="flex items-center relative overflow-hidden">
            <Link to="/" ref={logoRef} className="flex-shrink-0">
              <img src={logoImg} alt="Israel" className="h-10 w-auto object-contain" />
            </Link>

            <motion.span
              animate={{
                x: ["-100%", "0%", "0%", "-100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 10,
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="ml-3 text-gray-300 whitespace-nowrap font-mono"
            >
              ISRAEL TIMOTHY
            </motion.span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={i}
                  to={link.to}
                  ref={(el) => addToRefs(el, desktopLinksRef)}
                  className={`relative text-gray-300 transition-colors hover:text-blue-200
                    after:absolute after:left-0 after:bottom-0 after:gap-4 after:h-[2px] after:bg-blue-500
                    after:w-6 after:scale-x-0 hover:after:scale-x-100
                    after:origin-left after:transition-transform after:duration-300
                    ${isActive ? "after:scale-x-100 text-blue-500" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-white/10 transition text-white"
            aria-label="Toggle Menu"
            whileTap={{ scale: 0.9, rotate: 90 }}
          >
            <Menu />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center gap-6 text-xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Mobile Logo */}
            <div ref={(el) => addToRefs(el, menuItemsRef)} className="absolute top-4 left-6">
              <img src={logoImg} alt="Logo" className="h-20 w-auto object-contain" />
            </div>

            {/* Close Button */}
            <motion.button
              onClick={toggleMenu}
              className="absolute top-4 right-6 p-2 rounded-full hover:bg-white/10 transition"
              whileHover={{ rotate: 90 }}
              aria-label="Close Menu"
              ref={(el) => addToRefs(el, menuItemsRef)}
            >
              <X />
            </motion.button>

            {/* Mobile Nav Links */}
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={i}
                  to={link.to}
                  onClick={toggleMenu}
                  ref={(el) => addToRefs(el, menuItemsRef)}
                  className={`text-white hover:text-blue-500 transition-colors relative
                    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-500
                    after:w-full after:scale-x-0 hover:after:scale-x-100
                    after:origin-left after:transition-transform after:duration-300
                    ${isActive ? "after:scale-x-100 text-blue-500" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Social Links */}
            <div className="flex gap-6 mt-4 text-2xl">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors duration-300"
                  aria-label={social.label}
                  ref={(el) => addToRefs(el, menuItemsRef)}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default AnimatedNavbar;
