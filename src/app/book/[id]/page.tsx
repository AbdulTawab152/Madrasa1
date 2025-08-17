// app/books/[id]/page.tsx
import React from "react";
import Image from 'next/image';
import { fetchWithCache } from '../../../lib/api';
import { endpoints } from '../../../lib/config';
import { Book } from '../../../lib/types';

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function fetchBook(id: string): Promise<Book> {
  try {
    const data = await fetchWithCache<Book>(`${endpoints.books}/${id}`);
    return data;
  } catch (error) {
    throw new Error("Book not found");
  }
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function BookDetailPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await fetchBook(id);

  return (
    <main className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {book.image ? (
              <Image
                src={getImageUrl(book.image)}
                alt={book.title}
                className="w-full h-96 md:h-full object-cover"
                width={400}
                height={600}
              />
            ) : (
              <div className="w-full h-96 md:h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">{book.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Edition:</strong> {book.edition}
                </div>
                <div>
                  <strong>Pages:</strong> {book.pages}
                </div>
                <div>
                  <strong>Written Year:</strong> {book.written_year}
                </div>
                <div>
                  <strong>Category ID:</strong> {book.book_category_id}
                </div>
                <div>
                  <strong>Author ID:</strong> {book.author_id}
                </div>
                <div>
                  <strong>Published:</strong> {book.is_published ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Downloadable:</strong> {book.downloadable ? "Yes" : "No"}
                </div>
                <div>
                  <strong>In Library:</strong> {book.is_in_library ? "Yes" : "No"}
                </div>
              </div>
              
              {book.downloadable && book.pdf_file && (
                <div className="mt-6">
                  <a
                    href={book.pdf_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
