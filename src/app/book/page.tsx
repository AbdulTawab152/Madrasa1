// app/books/page.tsx
import BooksSection from "../components/books/BooksSection";
import { BooksApi } from "../../lib/api"; // مسیر درست API
import { Book } from "../../lib/types";



export default async function BooksPage() {
  // fetch تمام کتاب‌ها
  const res = await BooksApi.getAll();
  const books = Array.isArray(res.data) ? (res.data as Book[]) : [];

  return (
    <main className="max-w-full mt-28 mx-auto p-8">
    
     <BooksSection books ={books} showAll={true} />

    </main>
  );
}
