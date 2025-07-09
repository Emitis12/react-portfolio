import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Google Sheet Submission
      await fetch("https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email }),
      });

      // EmailJS Submission
      await emailjs.send(
        "service_anx5raa",
        "template_5ubip7g",
        { email },
        "SjtlQWhT54kc3ajjA"
      );

      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err) {
      console.error("Subscription failed", err);
      setError("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <motion.section
      className="py-20 px-6 max-w-xl mx-auto transition-colors duration-500 text-black dark:text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-semibold mb-6">Subscribe to Newsletter</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex gap-2 flex-col sm:flex-row"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Subscribe
        </motion.button>
      </form>

      {/* Success Message */}
      {subscribed && (
        <motion.p
          className="text-green-700 mt-4 font-medium bg-green-100 border border-green-200 p-3 rounded shadow-sm dark:text-green-400 dark:bg-green-900/10 dark:border-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎉 Thank you for subscribing! Please check your inbox.
        </motion.p>
      )}

      {/* Error Message */}
      {error && (
        <motion.p
          className="text-red-700 mt-4 font-medium bg-red-100 border border-red-200 p-3 rounded shadow-sm dark:text-red-400 dark:bg-red-900/10 dark:border-red-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ⚠️ {error}
        </motion.p>
      )}
    </motion.section>
  );
}
