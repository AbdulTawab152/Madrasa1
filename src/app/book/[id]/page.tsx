import { BooksApi } from "../../../lib/api";
import Image from "next/image";
import { Book } from "../../../lib/types";
import Link from "next/link";
import { FaBook, FaCalendar, FaUser, FaArrowLeft, FaEye, FaHeart } from 'react-icons/fa';

interface Params {
  params: Promise<{ id: string }>;
}

export default async function BookDetailsPage({ params }: Params) {
  const { id } = await params;

  try {
    const res = await BooksApi.getById(id);
    const book = res.data as Book;

    if (!book) {
      return (
        <div className="min-h-screen  flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4 border border-amber-100">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-2xl font-bold text-black mb-4">Book Not Found</h1>
            <p className="text-gray-600 mb-6">Sorry, the book you're looking for doesn't exist.</p>
            <Link
              href="/book"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md"
            >
              Back to Books
            </Link>
          </div>
        </div>
      );
    }

    const getImageUrl = (img?: string | null) => {
      if (!img) return null;
      if (img.startsWith("http")) return img;
      return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
    };

    return (
      <div className="min-h-screen mt-36 md:mt-[100px] bg-white">
        {/* Enhanced White Header */}
        <div className="bg-white border-b border-gray-100 py-10 shadow-sm relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-3 left-3 w-20 h-20 bg-amber-100 rounded-full opacity-60"></div>
            <div className="absolute bottom-3 right-3 w-24 h-24 bg-orange-100 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-yellow-100 rounded-full opacity-40"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Link 
                href="/book" 
                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-all duration-300 group bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-lg"
              >
                <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Books</span>
              </Link>
              
              <div className="text-gray-500 text-sm font-medium bg-gray-50 px-3 py-1 rounded-full">
                Book Details
              </div>
            </div>
            
            {/* Main Title */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-4 border border-amber-200">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                Islamic Literature
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-gray-900">
                {book.title}
              </h1>
              
              {/* Decorative line */}
              <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Book Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Book Image */}
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden shadow-md">
                  {book.image ? (
                    <Image
                      src={getImageUrl(book.image) || ""}
                      alt={book.title}
                      width={400}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="text-6xl mb-2">📚</div>
                        <div className="text-sm">No Image</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Info */}
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                {book.description && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                    <div 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: book.description }}
                    />
                  </div>
                )}

                {/* Book Details */}
                <div className="grid grid-cols-2 gap-4">
                  {book.pages && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Pages</div>
                      <div className="text-lg font-semibold text-gray-900">{book.pages}</div>
                    </div>
                  )}
                  {book.written_year && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Year</div>
                      <div className="text-lg font-semibold text-gray-900">{book.written_year}</div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                    Read Book
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Author Section */}
          {book.author && book.author.first_name && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUser className="text-amber-600 w-4 h-4" />
                Author
              </h2>
              <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
                {book.author.image && (
                  <div className="w-32  h-32 md:w-20 h-20 rounded-full overflow-hidden border-2 border-amber-100">
                    <Image
                      src={getImageUrl(book.author.image) || ""}
                      alt={`${book.author.first_name} ${book.author.last_name || ''}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-[20px] font-semibold text-gray-900 mb-2">
                    {book.author.first_name} {book.author.last_name || ''}
                  </h3>
                  {book.author.bio && (
                    <div 
                      className="text-gray-600 text-[20px] leading-relaxed mb-3"
                      dangerouslySetInnerHTML={{ __html: book.author.bio }}
                    />
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {book.author.contact_no && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                        {book.author.contact_no}
                      </span>
                    )}
                    {book.author.full_address && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                        {book.author.full_address}
                      </span>
                    )}
                    {book.author.dob && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                        {book.author.dob}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching book:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4 border border-amber-100">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-black mb-4">Error Loading Book</h1>
          <p className="text-gray-600 mb-6">Sorry, there was an error loading the book details.</p>
          <Link
            href="/book"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md"
          >
            Back to Books
          </Link>
        </div>
      </div>
    );
  }
}
