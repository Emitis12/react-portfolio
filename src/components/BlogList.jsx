import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import posts from "../data/posts.js";
import gsap from "gsap";
import { motion, useInView } from "framer-motion";
import emailjs from "emailjs-com";

export default function BlogList() {
  const cardsRef = useRef([]);
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");
  const formInView = useInView(formRef, { once: true });

  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await fetch("https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ name, email }),
      });

      await emailjs.send(
        "service_anx5raa",
        "template_5ubip7g",
        { name, email },
        "SjtlQWhT54kc3ajjA"
      );

      setSubscribed(true);
      setShowMessage(true);
      setName("");
      setEmail("");
      setTimeout(() => setShowMessage(false), 5000);
    } catch (err) {
      console.error("Subscription error", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto transition-colors duration-500 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-6">Blog</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <Link
            to={`/blog/${post.slug}`}
            key={index}
            className="block border rounded shadow hover:shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <motion.div
        ref={formRef}
        className="mt-12"
        initial={{ opacity: 0, y: 60 }}
        animate={formInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h3 className="text-xl font-semibold mb-2">Subscribe for Updates</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 flex-wrap">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <motion.button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            Subscribe
          </motion.button>
        </form>

        {error && (
          <motion.div
            className="mt-4 p-4 bg-red-100 border border-red-300 rounded text-red-700 font-medium shadow-sm dark:bg-red-900/20 dark:border-red-500 dark:text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {subscribed && showMessage && (
          <motion.div
            className="mt-4 p-4 bg-green-100 border border-green-300 rounded text-green-700 font-medium shadow-sm dark:bg-green-900/20 dark:border-green-500 dark:text-green-400"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            🎉 Thank you for subscribing!
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
