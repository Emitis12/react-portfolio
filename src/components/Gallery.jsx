import React from "react";

const images = ["/img/gallery1.jpg", "/img/gallery2.jpg", "/img/gallery3.jpg"];

export default function Gallery() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-black dark:text-white transition-colors duration-500">
      <h2 className="text-3xl font-semibold mb-6">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="gallery item"
            className="rounded shadow-md dark:shadow-white/10 transition-shadow duration-300"
          />
        ))}
      </div>
    </section>
  );
}
