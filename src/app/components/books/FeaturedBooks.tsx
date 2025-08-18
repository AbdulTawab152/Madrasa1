import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, ChevronRight, Star } from "lucide-react";

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

async function fetchBooksData(): Promise<Book[]> {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/books";
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Error fetching books");

  return res.json();
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function FeaturedBooks({ showAll = false }: { showAll?: boolean }) {
  const allBooks = await fetchBooksData();
  
  // Get only the first 3 books for the homepage
  const books = showAll ? allBooks : allBooks.slice(0, 3);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent inline-block mb-3 animate-gradient-x">
              Islamic Knowledge Treasury
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-width-expand" style={{ animationDuration: '1.5s' }}></div>
          </div>
          {/* <p className="text-gray-600 mt-4 md:mt-0 max-w-2xl animate-fade-in" style={{ animationDuration: '1s', animationDelay: '0.3s' }}>
            Discover authentic Islamic books from renowned scholars and traditional sources
          </p> */}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {books.map((book, index) => (
            <div 
              key={book.id} 
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:rotate-1 border border-gray-100 flex flex-col w-full sm:w-1/3 animate-fade-in-up" 
              style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.6s' }}
            >
              {/* Library badge */}
              {book.is_in_library && (
                <div className="absolute top-0 right-0 z-10 animate-bounce-in" style={{ animationDuration: '0.5s', animationDelay: `${index * 0.1 + 0.3}s` }}>
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-2.5 py-1 rounded-bl-lg shadow-sm flex items-center">
                    <Star size={12} className="mr-1 fill-white animate-pulse" style={{ animationDuration: '3s' }} />
                    In Library
                  </div>
                </div>
              )}
              
              <div className="relative aspect-[3/3] overflow-hidden group">
                <Image
                  src={getImageUrl(book.image)}
                  alt={book.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Badges container - positioned at bottom */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  {/* Year badge */}
                  <div className="flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm text-green-700 text-xs rounded-full shadow-sm">
                    <Calendar size={12} className="mr-1" />
                    {book.written_year}
                  </div>
                  
                  {/* Pages badge */}
                  <div className="flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs rounded-full shadow-sm">
                    <BookOpen size={12} className="mr-1" />
                    {book.pages}
                  </div>
                </div>
                
                {/* Edition badge - new */}
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
                
                <Link 
                  href={`/book/${book.id}`}
                  className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white text-xs font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {!showAll && (
          <div className="text-center">
            <Link 
              href="/book" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-green-500 text-green-600 font-medium rounded-xl hover:bg-green-50 transition-all duration-300 shadow-md group"
            >
              <span>See All Books</span>
              <ChevronRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}