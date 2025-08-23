import { BooksApi } from "../../../lib/api";
import Image from "next/image";
import { Book } from "../../../lib/types";

interface Params {
  params: { id: string };
}

export default async function BookDetailsPage({ params }: Params) {
  const { id } = params;

  // کتاب تکی از API
  const res = await BooksApi.getById(id);
  const book: Book = res.data;

  if (!book) {
    return <p className="text-center mt-20 text-xl">کتاب پیدا نشد!</p>;
  }

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <main className="max-w-4xl mt-32 mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      <p className="text-gray-600 mb-6">{book.description}</p>

      {book.image && (
        <div className="mb-6">
          <Image
            src={getImageUrl(book.image)}
            alt={book.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-6 text-gray-700 mb-6 text-sm">
        <span>📖 صفحات: {book.pages || "نامشخص"}</span>
        <span>🏢 ناشر: {book.publisher || "نامشخص"}</span>
        <span>🗣 زبان: {book.language || "نامشخص"}</span>
      </div>

      <a
        href="/book"
        className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
      >
        بازگشت به لیست کتاب‌ها
      </a>
    </main>
  );
}
