// app/books/[id]/page.tsx
import React from "react";
import Image from 'next/image';
interface Author {
  id: number;
  first_name: string;
  last_name: string;
}

interface BookDetail {
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
  author_id: number;
  author?: Author;
}

async function fetchBookDetail(id: string): Promise<BookDetail> {
  const API_URL = `https://lawngreen-dragonfly-304220.hostingersite.com/api/book/${id}`;
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("خطا در دریافت اطلاعات کتاب");

  return res.json(); // مستقیم JSON رو می‌گیریم
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await fetchBookDetail(params.id);

  if (!book) return <div>کتابی یافت نشد.</div>;

  return (
    <main className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      <Image
        src={book.image || "https://via.placeholder.com/600x400"}
        alt={book.title}
        className="w-full h-auto rounded-lg mb-6"
      />
      <p className="text-gray-700 leading-relaxed">{book.description}</p>

      <div className="mt-6 text-gray-600 text-sm">
        <p>Edition: {book.edition}</p>
        <p>Pages: {book.pages}</p>
        <p>Written Year: {book.written_year}</p>
        <p>Downloadable: {book.downloadable ? "Yes" : "No"}</p>
        <p>In Library: {book.is_in_library ? "Yes" : "No"}</p>
        <p>Author: {book.author ? `${book.author.first_name} ${book.author.last_name}` : "N/A"}</p>
      </div>
    </main>
  );
}
