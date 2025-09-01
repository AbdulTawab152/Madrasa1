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
     <section className="relative bg-gradient-to-r from-amber-50 to-amber-100 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-96 border-2 border-amber-300 rounded-lg transform rotate-6"></div>
        <div className="absolute top-40 right-20 w-64 h-88 border-2 border-amber-300 rounded-lg transform -rotate-3"></div>
        <div className="absolute bottom-32 left-24 w-60 h-84 border-2 border-amber-300 rounded-lg transform rotate-12"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-900 mb-6 leading-tight">
              Discover Your Next <span className="text-amber-600">Great Read</span>
            </h1>
            <p className="text-lg md:text-xl text-amber-800 mb-8 max-w-lg mx-auto md:mx-0">
              Explore our vast collection of books, from timeless classics to contemporary bestsellers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:-translate-y-1">
                Browse Collection
              </button>
              <button className="border-2 border-amber-700 text-amber-700 hover:bg-amber-50 font-semibold py-3 px-8 rounded-lg transition duration-300">
                Become a Member
              </button>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-96 md:w-96 md:h-112">
              <div className="absolute w-full h-full bg-amber-700 rounded-lg transform rotate-3"></div>
              <div className="absolute w-full h-full bg-amber-600 rounded-lg transform -rotate-2"></div>
              <div className="absolute w-full h-full bg-amber-500 rounded-lg flex items-center justify-center p-8 shadow-xl">
                <div className="text-center text-amber-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-xl font-serif font-bold mb-2">Over 50,000 Titles</h3>
                  <p className="text-amber-800">Books, journals, and digital resources await your discovery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-amber-700 mb-2">150+</div>
            <div className="text-amber-900">Years of History</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-amber-700 mb-2">5,000+</div>
            <div className="text-amber-900">Active Members</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-amber-700 mb-2">24/7</div>
            <div className="text-amber-900">Digital Access</div>
          </div>
        </div>
      </div>
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
