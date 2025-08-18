  "use client";

  import { useEffect, useState } from "react";
  import Link from "next/link";
  import Image from "next/image";
  import { BookOpen, Calendar, Download, Eye, Star } from "lucide-react";

  // Interface for the Book data
  interface Book {
    id: number;
    title: string;
    edition: string;
    pages: number;
    written_year: string;
    description: string;
    pdf_file: string;
    is_published: boolean;
    downloadable: boolean;
    image: string;
    is_in_library: boolean;
    book_category_id: number;
    author_id: number;
  }

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const res = await fetch("https://lawngreen-dragonfly-304220.hostingersite.com/api/books");
          if (!res.ok) throw new Error("Failed to fetch books");
          const data = await res.json();
          setBooks(data);
        } catch (err: any) {
          console.error("Error fetching books:", err);
          setError("خطا در دریافت لیست کتاب‌ها");
        } finally {
          setLoading(false);
        }
      };

      fetchBooks();
    }, []);

    // Group books into rows of 3
    const bookRows = [];
    for (let i = 0; i < books.length; i += 3) {
      bookRows.push(books.slice(i, i + 3));
    }

    if (loading) {
      return <div className="p-8 text-center text-gray-600">در حال بارگذاری کتاب‌ها...</div>;
    }

    if (error) {
      return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-40 right-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>

        {/* Hero Section */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="/1.jpg" 
              alt="Islamic Library Background" 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg animate-fade-in-down" style={{ animationDuration: '1s' }}>
              Islamic Knowledge Library
            </h1>
            <div className="h-1 w-32 bg-white/70 mx-auto mb-8 animate-width-expand" style={{ animationDuration: '1.5s' }}></div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{ animationDuration: '1s', animationDelay: '0.5s' }}>
              Explore our collection of authentic Islamic books, manuscripts, and scholarly works
            </p>
          </div>
        </div>

        {/* Books Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent inline-block mb-3 animate-gradient-x">
                Our Collection
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-width-expand" style={{ animationDuration: '1.5s' }}></div>
            </div>
            <p className="text-gray-600 mt-4 md:mt-0 max-w-2xl animate-fade-in" style={{ animationDuration: '1s', animationDelay: '0.3s' }}>
              Browse through our carefully curated collection of Islamic literature spanning various topics and eras
            </p>
          </div>

          {/* Book Cards */}
          <div className="space-y-8">
            {bookRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex flex-col sm:flex-row gap-6 justify-center">
                {row.map((book, index) => (
                  <div 
                    key={book.id} 
                    className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:rotate-1 border border-gray-100 flex flex-col w-full sm:w-1/3 animate-fade-in-up" 
                    style={{ animationDelay: `${(rowIndex * 3 + index) * 0.1}s`, animationDuration: '0.6s' }}
                  >
                    {/* Library badge */}
                    {book.is_in_library && (
                      <div className="absolute top-0 right-0 z-10 animate-bounce-in" style={{ animationDuration: '0.5s', animationDelay: `${(rowIndex * 3 + index) * 0.1 + 0.3}s` }}>
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-2.5 py-1 rounded-bl-lg shadow-sm flex items-center">
                          <Star size={12} className="mr-1 fill-white animate-pulse" style={{ animationDuration: '3s' }} />
                          In Library
                        </div>
                      </div>
                    )}

                    <div className="relative aspect-[3/4] overflow-hidden group">
                      <Image
                        src={getImageUrl(book.image)}
                        alt={book.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                      <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm text-green-700 text-xs rounded-full shadow-sm">
                          <Calendar size={12} className="mr-1" />
                          {book.written_year}
                        </div>
                        <div className="flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs rounded-full shadow-sm">
                          <BookOpen size={12} className="mr-1" />
                          {book.pages}
                        </div>
                      </div>

                      {book.edition && (
                        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0">
                          <div className="bg-green-600/90 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-sm">
                            {book.edition} Edition
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-3 flex-grow flex flex-col bg-gradient-to-b from-white to-gray-50">
                      <h3 className="text-base font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-1 line-clamp-2">
                        {book.title}
                      </h3>
                      <div className="h-0.5 w-10 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mb-2 transition-all duration-500 group-hover:w-full"></div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-grow transition-all duration-300 group-hover:text-gray-800">
                        {book.description}
                      </p>

                      <div className="flex gap-2 mt-auto transform transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                        <Link 
                          href= {`/book/${book.id}`} 
                          target="_blank"
                          className="flex-1 inline-flex items-center justify-center px-2 py-1.5 bg-gradient-to-r from-green-500 to-blue-600 text-white text-xs font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow group relative overflow-hidden"
                        >
                          <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                          <Eye size={12} className="mr-1" />
                          <span>View</span>
                        </Link>

                        {book.downloadable && (
                          <Link 
                            href={book.pdf_file} 
                            download
                            className="inline-flex items-center justify-center px-2 py-1.5 bg-white border border-green-500 text-green-600 text-xs font-medium rounded-lg hover:bg-green-50 transition-all duration-300 group relative overflow-hidden"
                          >
                            <span className="absolute inset-0 w-0 bg-green-100 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                            <Download size={12} className="mr-1 relative z-10" />
                            <span className="relative z-10">Download</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty slots for layout balance */}
                {Array(3 - row.length).fill(0).map((_, i) => (
                  <div key={`empty-${i}`} className="hidden sm:block w-1/3"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }
