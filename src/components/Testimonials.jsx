import React from "react";
import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6"; // X (Twitter) icon

const testimonials = [
  { name: "Bee Tech", text: "Wow!!! This is awesome" },
  { name: "Big Fave", text: "Creative and efficient. Highly recommend!" },
  { name: "Mfon Isongidok", text: "Overall it's very nice" },
  { name: "Miracle Onukak", text: "This is beautiful brooooo❤️❤️" },
  { name: "Chris Tech", text: "Madddd!" },
  { name: "Peniella Ewa", text: "Wow" },
  { name: "Miracle Onukak", text: "I love it, can I replicate?" },
  { name: "Deborah", text: "I want to learn Please, you're good" },
  { name: "Inioluwa", text: "This is beautiful Boss" },
  { name: "Ebenezer", text: "Very good and responsive boss" },
];

const MarqueeRow = ({ testimonials, direction = "left" }) => {
  const animation = {
    animate: {
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <motion.div className="flex gap-6 w-max" {...animation}>
        {[...testimonials, ...testimonials].map(({ name, text }, i) => (
          <div
            key={i}
            className="bg-white/5 text-white min-w-[300px] max-w-[300px] p-6 rounded shadow relative"
          >
            {/* X Icon */}
            <div className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer">
              <FaXTwitter className="text-xl" />
            </div>

            {/* Testimonial Text */}
            <p className="mb-3 text-gray-300 text-sm leading-relaxed">"{text}"</p>

            {/* Name */}
            <h4 className="font-semibold text-gray-500 text-sm">- {name}</h4>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const firstHalf = testimonials.slice(0, half);
  const secondHalf = testimonials.slice(half);

  return (
    <section className="py-20 px-6 bg-gray-950 text-white space-y-12">
      <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-amber-300 to-blue-400 bg-clip-text text-transparent">
  Here's a little brag!
</h1>

      <h3 className="mb-10 text-gray-300">What people say about my work</h3>
      <MarqueeRow testimonials={firstHalf} direction="left" />
      <MarqueeRow testimonials={secondHalf} direction="right" />
    </section>
  );
}
