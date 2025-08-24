import Link from "next/link";
import Image from "next/image";
import { Book } from "../../../lib/types";
import { getImageUrl } from "../../../lib/utils";

interface BooksSectionProps {
  books: Book[];
  showAll?: boolean;
}

export default function BooksSection({ books, showAll = false }: BooksSectionProps) {
  const sortedBooks =
    books
      ?.filter(book => book.is_published === 1)
      .sort((a, b) => new Date(b.created_at || b.updated_at || '0').getTime() - new Date(a.created_at || a.updated_at || '0').getTime()) || [];

  const displayBooks = showAll ? sortedBooks : sortedBooks.slice(0, 3);



  return (
    <div className="w-full">
      {!showAll && (
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-sm">
            📚 Featured
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {showAll ? "All Books" : "Featured Books"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {showAll
              ? "Explore our comprehensive collection of books"
              : "Discover our most popular and featured books"}
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBooks.map(book => (
          <Link key={book.id} href={`/book/${book.id}`} className="group">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col h-[420px]">
              
              {/* Book Image */}
              <div className="relative overflow-hidden h-48">
                {book.image ? (
                  <Image
                    src={getImageUrl(book.image) || ''}
                    alt={book.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                    <span className="text-3xl">📚</span>
                  </div>
                )}

                {/* Featured Badge */}
                {/* {book.is_featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                    ⭐ Featured
                  </div>
                )} */}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                  {book.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-4">
                  {book.description.replace(/<[^>]*>/g, '')}
                </p>

                <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
                  <span>📖 {book.pages} pages</span>
                  <span>📅 {book.written_year}</span>
                  <span>📚 {book.edition}</span>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium py-2 px-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-sm">
                  Read More
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && displayBooks.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-sm rounded-lg shadow-sm hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          >
            Explore All Books
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
