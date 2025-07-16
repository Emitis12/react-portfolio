import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

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
        body: new URLSearchParams({ email }),
      });

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
    <section
      className="py-20 px-6 max-w-xl mx-auto text-white"
      style={{ backgroundColor: "transparent" }}
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
          className="flex-1 px-4 py-2 border border-white rounded bg-transparent text-white placeholder-gray-400"
        />
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Subscribe
        </motion.button>
      </form>

      {subscribed && (
        <motion.p
          className="text-green-400 mt-4 font-medium bg-green-900/30 border border-green-500 p-3 rounded shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎉 Thank you for subscribing! Please check your inbox.
        </motion.p>
      )}

      {error && (
        <motion.p
          className="text-red-400 mt-4 font-medium bg-red-900/30 border border-red-500 p-3 rounded shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ⚠️ {error}
        </motion.p>
      )}
    </section>
  );
}
