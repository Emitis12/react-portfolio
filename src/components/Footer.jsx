import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 px-6 text-center border-t text-gray-700 dark:text-gray-300 dark:border-gray-700 transition-colors duration-500">
      <p>&copy; {new Date().getFullYear()} Adeola. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2 text-xl">
        <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400">Twitter</a>
        <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400">GitHub</a>
        <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400">LinkedIn</a>
      </div>
    </footer>
  );
}
