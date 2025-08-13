// app/books/page.tsx
import Link from "next/link";
import React from "react";

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

export default async function BooksPage() {
  const books = await fetchBooksData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link key={book.id} href={`/book/${book.id}`}>
            <img
              src={book.image || "https://via.placeholder.com/300x400"}
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-4 text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600 mt-1 text-sm line-clamp-3">{book.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
