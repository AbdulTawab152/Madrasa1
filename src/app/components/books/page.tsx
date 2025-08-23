import Link from "next/link";
import Image from "next/image";
import { Book } from "../../../lib/types";

interface BooksSectionProps {
  books: Book[];
  showAll?: boolean;
}

export default function BooksSection({ books, showAll = false }: BooksSectionProps) {
  const sortedBooks =
    books
      ?.filter(book => book.is_published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const displayBooks = showAll ? sortedBooks : sortedBooks.slice(0, 3);

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <div className="w-full">
      {!showAll && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {showAll ? "All Books" : "Featured Books"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 h-[420px] flex flex-col">
              
              {/* Book Image */}
              <div className="relative overflow-hidden h-48">
                {book.image ? (
                  <Image
                    src={getImageUrl(book.image)}
                    alt={book.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">📚</span>
                      <span className="text-amber-800 font-medium text-sm">Book Image</span>
                    </div>
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
                
                <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                  {book.description}
                </p>

                <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
                  <span>✍️ {book.author?.name || "Unknown"}</span>
                  <span>📖 {book.pages || "N/A"} pages</span>
                  <span>🏢 {book.publisher || "N/A"}</span>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-md text-sm">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-base rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
