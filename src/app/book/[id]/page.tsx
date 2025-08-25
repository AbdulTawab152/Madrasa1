import { BooksApi } from "../../../lib/api";
import Image from "next/image";
import { Book } from "../../../lib/types";
import Link from "next/link";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function BookDetailsPage({ params }: Params) {
  const { id } = await params;

  // کتاب تکی از API
  const res = await BooksApi.getById(id);
  const book = res.data as Book;

  if (!book) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">کتاب پیدا نشد!</h1>
          <p className="text-gray-600 mb-6">متأسفیم، کتاب مورد نظر شما یافت نشد.</p>
          <Link 
            href="/book" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
          >
            بازگشت به لیست کتاب‌ها
          </Link>
        </div>
      </div>
    );
  }

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <main className="min-h-screen mt-32 bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl  overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8">
          <div className="absolute top-4 right-4 opacity-20 text-5xl font-arabic">﷽</div>
          <div className="relative z-10">
            <Link 
              href="/book" 
              className="inline-flex items-center text-amber-100 hover:text-white transition-colors mb-6"
            >
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              book
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{book.title}</h1>
            <p className="text-amber-100 text-lg max-w-3xl">{book.description?.substring(0, 120)}...</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Book Image */}
            <div className="relative">
              {book.image ? (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={getImageUrl(book.image)}
                    alt={book.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-6xl text-amber-300">📚</div>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 ml-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  درباره کتاب
                </h2>
                <p className="text-gray-600 leading-relaxed text-justify">{book.description}</p>
              </div>

              {/* Metadata */}
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">اطلاعات کتاب</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-lg ml-3">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">تعداد صفحات</p>
                      <p className="font-medium">{book.pages || "نامشخص"}</p>
                    </div>
                  </div>

                  {/* <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-lg ml-3">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m4 0h4m-4 0V9" />
                      </svg>
                    </div>
                    <div>
                    
                    </div>
                  </div> */}

                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-lg ml-3">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <div>
                     
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-lg ml-3">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">سال انتشار</p>
                      <p className="font-medium">{book.written_year || "نامشخص"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center">
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  مطالعه کتاب
                </button>
                
                <button className="flex-1 border border-amber-500 text-amber-600 py-3 px-6 rounded-lg hover:bg-amber-50 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  افزودن به علاقه‌مندی‌ها
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}