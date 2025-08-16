// app/books/page.tsx
import Link from "next/link";

import Image from 'next/image';

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

  return res.json(); // مستقیم JSON رو برمی‌گردانیم
}


const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function BooksPage() {
  const books = await fetchBooksData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link key={book.id} href={`/book/${book.id}`}>


            
            <Image
          src={getImageUrl(book.image )}
          alt={book.title}
          width={300}
          height={400}
        
          className="w-full h-48 object-cover rounded group-hover:opacity-80 transition"
        />
                    <h2 className="mt-4 text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600 mt-1 text-sm line-clamp-3">{book.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
