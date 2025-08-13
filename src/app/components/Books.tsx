"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const books = [
  {
    title: "Holy Quran",
    author: "Various Authors",
    image: "/assets/scholar-teaching.jpg",
    description: "Read and listen to the Quran in multiple languages.",
    link: "/books/quran",
  },
  {
    title: "Hadith Collections",
    author: "Imam Bukhari, Muslim & others",
    image: "/assets/1.jpg",
    description: "Explore Sahih Bukhari, Muslim, Tirmidhi, and more.",
    link: "/books/hadith",
  },
  {
    title: "Islamic History",
    author: "Ibn Kathir",
    image: "/assets/2.jpg",
    description: "Books on the life of Prophet Muhammad (PBUH) and the companions.",
    link: "/books/history",
  },
  {
    title: "Fiqh & Jurisprudence",
    author: "Various Scholars",
    image: "/assets/1.jpg",
    description: "Explore the rules of Islamic law from the four schools of thought.",
    link: "/books/fiqh",
  },
  {
    title: "Seerah & Biography",
    author: "Al-Mubarakpuri",
    image: "/assets/2.jpg",
    description: "Detailed biography of the Prophet Muhammad (PBUH).",
    link: "/books/seerah",
  },
  {
    title: "Spirituality & Tazkiyah",
    author: "Imam Al-Ghazali",
    image: "/assets/scholar-teaching.jpg",
    description: "Purification of the soul and heart through Islamic spirituality.",
    link: "/books/spirituality",
  },
];

export const Books = ({ className, limit }: { className?: string; limit?: number }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Slice books if limit is provided
  const displayedBooks = limit ? books.slice(0, limit) : books;

  return (
    <>
      <h1 className="text-3xl text-center pt-20 font-bold text-gray-800 dark:text-white">
        📚 Our Books
      </h1>

      <div
        className={cn(
          "relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-14 px-10",
          "bg-cover bg-center bg-no-repeat",
          className
        )}
      >
        {/* Background image behind all cards */}
        {/* <div className="absolute inset-0 -z-10">
          <img
            src="/assets/islamic-background.jpg"
            alt="Background"
            className="w-full h-full object-cover "
          />
        </div> */}

        {displayedBooks.map((item, idx) => (
          <div
            key={item.link}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative group block h-96 w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Image */}
            <motion.img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />

            {/* Dark Blur Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm" />

            {/* Text Content */}
            <div className="relative z-10 h-full w-full flex flex-col justify-end p-6 text-white space-y-2 transition-all duration-300">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold"
              >
                {item.title}
              </motion.h3>

              {item.author && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-gray-300"
                >
                  {item.author}
                </motion.p>
              )}

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-200 line-clamp-3"
              >
                {item.description}
              </motion.p>

              {/* See More Button (Visible on Hover) */}
              <motion.a
                href={item.link}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hoveredIndex === idx ? 1 : 0,
                  y: hoveredIndex === idx ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300",
                  hoveredIndex === idx ? "pointer-events-auto" : "pointer-events-none"
                )}
              >
                See More
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button if limit is set and more books exist */}
      {limit && books.length > limit && (
        <div className="text-center mt-10">
          <Link href="/books" passHref>
            {/* <a className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors">
              See All Books
            </a> */}
          </Link>
        </div>
      )}
    </>
  );
};

export default Books;
