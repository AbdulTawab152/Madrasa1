"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../../lib/utils";
import { BooksApi } from "../../../lib/api";
import { Book } from "../../../lib/types";
import { Typewriter } from "react-simple-typewriter";

interface BooksSectionProps {
  showAll?: boolean; // Show all books or only limited
  showHero?: boolean; // Only display hero on specific page
}

export default function BooksSection({ showAll = false, showHero = false }: BooksSectionProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await BooksApi.getAll();
        setBooks(response.data.data || response.data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const sortedBooks = books.filter((book) => book.is_published === 1);
  const displayBooks = showAll ? sortedBooks : sortedBooks.slice(0, 3);

  return (
    <div className="w-full text-gray-900">
      {/* Hero Section - only show on Books page */}
      {showHero && (
        <section className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 flex flex-col-reverse lg:flex-row items-center gap-10 relative z-10">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                <Typewriter
                  words={[
                    "Discover Your Next Favorite Book",
                    "Expand Your Knowledge",
                    "Dive Into Timeless Stories",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 opacity-0 animate-fadeIn">
                Explore a curated collection of books and expand your imagination.
                Dive into exciting stories, timeless classics, and knowledge-packed
                reads—all in one place.
              </p>
            </div>

            {/* Hero Image */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full h-80 sm:h-96 lg:h-[28rem] animate-float">
                <Image
                  src="/1.jpg"
                  alt="Books Hero"
                  fill
                  className="object-cover rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Decorative floating circles */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full animate-spin-slow"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/20 rounded-full animate-spin-slow-reverse"></div>
        </section>
      )}

      {/* Books Grid */}
      <div id="books-section" className="max-w-7xl mx-auto px-6 lg:px-8 py-12 bg-white">
        {loading ? (
          <p className="text-center text-lg">Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBooks.map((book) => (
              <Link key={book.id} href={`/book/${book.id}`} className="group">
                <div>
                  <div className="relative rounded-lg overflow-hidden h-80">
                    {book.image ? (
                      <Image
                        src={getImageUrl(book.image) || ""}
                        alt={book.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-5xl text-amber-300">
                        📚
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-center pt-6">{book.title}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-5 pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      {book.pages} pages
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {book.written_year}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }

        @keyframes spinSlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 60s linear infinite; }
        .animate-spin-slow-reverse { animation: spinSlow 60s linear infinite reverse; }
      `}</style>
    </div>
  );
}
