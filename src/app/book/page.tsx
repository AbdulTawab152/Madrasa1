// app/books/page.tsx
import BooksSection from "../components/books/BooksSection";
import { BooksApi } from "../../lib/api"; // مسیر درست API
import { Book } from "../../lib/types";



export default async function BooksPage() {
  // fetch تمام کتاب‌ها
  const res = await BooksApi.getAll();
  const books = Array.isArray(res.data) ? (res.data as Book[]) : [];

  return (
    <main className="max-w-6xl mt-32 mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">لیست کتاب‌ها</h1>
     <BooksSection books ={books} showAll={true} />

    </main>
  );
}
