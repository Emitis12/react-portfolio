import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import posts from "../data/posts";
import ReactMarkdown from "react-markdown";
import gsap from "gsap";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  if (!post) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        Post not found.
      </div>
    );
  }

  return (
    <article
      className="prose dark:prose-invert max-w-4xl mx-auto py-20 px-6 transition-colors duration-500"
      ref={contentRef}
    >
      <h1>{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        className="w-full rounded mb-6 shadow-md dark:shadow-white/10"
      />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
