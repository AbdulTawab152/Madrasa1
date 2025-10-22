"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../../lib/utils";
import { BooksApi } from "../../../lib/api";
import { Book } from "../../../lib/types";
import PaginationControls from "@/components/PaginationControls";
import { FaBook, FaCalendar, FaEye, FaHeart } from 'react-icons/fa';
import { cleanText } from "../../../lib/textUtils";

interface BooksSectionProps {
  showAll?: boolean; // Show all books or only limited
  showHero?: boolean; // Only display hero on specific page
}

export default function BooksSection({ showAll = false, showHero = false }: BooksSectionProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const PAGE_SIZE = 8;

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await BooksApi.getAll(showAll ? {} : { page, limit: PAGE_SIZE });
        const booksData = (response as any)?.data?.data || (response as any)?.data || [];
        setBooks(Array.isArray(booksData) ? booksData : []);

        const pagination = (response as any)?.pagination;
        if (pagination && typeof pagination.totalPages === 'number') {
          setTotalPages(pagination.totalPages);
        } else if (!showAll) {
          // Fallback: infer if we likely have more pages
          setTotalPages(booksData.length < PAGE_SIZE && page === 1 ? 1 : (booksData.length === PAGE_SIZE ? page + 1 : page));
        } else {
          setTotalPages(null);
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page, showAll]);

  const sortedBooks = books.filter((book) => book.is_published === 1);
  const displayBooks = sortedBooks; // Books are already paginated from API
  const hasNextPage = !showAll && (typeof totalPages === 'number' ? (page < totalPages) : (displayBooks.length === PAGE_SIZE));
  const hasPrevPage = !showAll && page > 1;

  if (loading) {
    return (
      <div className="flex flex-col  items-center justify-center py-16">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <span className="mt-6 text-gray-600 font-medium">Loading our collection...</span>
        <p className="mt-2 text-gray-500 text-sm">Preparing the best Islamic books for you</p>
      </div>
    );
  }

  if (displayBooks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4 animate-bounce">📚</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Books Available</h3>
        <p className="text-gray-600">We're working on adding more books to our collection.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Books Grid with proper margins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayBooks.map((book) => (
          <div
            key={book.id}
            className="group relative h-[420px]"
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <div className="block h-full">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md  transition-all duration-500 transform hover:-translate-y-3 border border-amber-100 overflow-hidden relative h-full flex flex-col group-hover:border-amber-200">
                {/* Book Image Container */}
                
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  {book.image ? (
                    <Image
                      src={getImageUrl(book.image) || ""}
                      alt={book.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">📚</div>
                        <div className="text-amber-600 text-sm font-medium bg-white/80 px-3 py-1 rounded-full">
                          Book Cover
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Book Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    <FaBook className="inline mr-1" />
                    Book
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="bg-white/90 hover:bg-white text-amber-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                      <FaHeart className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* View Details Button */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Link
                      href={`/book/${book.id}`}
                      className="bg-amber-900/60 text-white hover:text-amber-100 px-4 py-2 rounded-full text-[12px] font-medium shadow-sm flex items-center gap-2 outline-none focus:outline-none focus:ring-0"
                    >
                      <FaEye className="w-4 h-4" />
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors leading-tight">
                      {cleanText(book.title)}
                    </h3>
                    {book.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {cleanText(book.description)}
                      </p>
                    )}
                  </div>

                  {/* Book Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <FaBook className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">{book.pages || 'N/A'} pages</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaCalendar className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">{book.written_year || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {!showAll && displayBooks.length > 0 && (hasNextPage || hasPrevPage || (typeof totalPages === 'number' && totalPages > 1)) && (
        <PaginationControls
          className="mt-10"
          page={page}
          totalPages={typeof totalPages === 'number' ? totalPages : null}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onPageChange={(p) => setPage(p)}
          isBusy={loading}
        />
      )}
    </div>
  );
}
