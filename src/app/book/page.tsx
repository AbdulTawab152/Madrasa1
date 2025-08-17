// app/books/page.tsx
import Link from "next/link";
import Image from "next/image";

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

  if (!res.ok) throw new Error("خطا در دریافت لیست کتاب‌ها");

  return res.json();
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function BooksPage() {
  const books = await fetchBooksData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        Our Library
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <Link key={book.id} href={book.pdf_file} target="_blank">
            <div className="relative w-full h-96 overflow-hidden rounded-3xl group cursor-pointer shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                src={getImageUrl(book.image)}
                alt={book.title}
                fill
                className="object-cover w-full h-full"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{book.title}</h2>
                <p className="text-white text-sm line-clamp-3">{book.description}</p>
                <span className="mt-4 text-gray-200 text-sm">{book.written_year}</span>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow hover:from-purple-500 hover:to-pink-500 transition-all">
                  View / Download
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
