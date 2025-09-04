// app/books/page.tsx
import BooksSection from "../components/books/BooksSection";
import { BooksApi } from "../../lib/api"; // مسیر درست API
import { Book } from "../../lib/types";



export default async function BooksPage() {
  // fetch تمام کتاب‌ها
  const res = await BooksApi.getAll();
  const books = Array.isArray(res.data) ? (res.data as Book[]) : [];

  return (
    <main className="max-w-full mt-32 mx-auto ">
       
       <section className="relative w-full mt-0 mb-16 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 z-0"></div>
  <div className="relative z-10 py-10 md:py-10 px-6 flex flex-col items-center text-center">
    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-full">
      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
      Our Islamic Books
    </div>
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-black leading-tight">
      Discover{" "}
      <span className="text-amber-600">
        Islamic Books
      </span>{" "}
      <br className="hidden md:block" />
      That{" "}
      <span className="relative inline-block">
        Inspire
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500 rounded-full"></span>
      </span>
    </h1>
    <p className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-12 leading-relaxed">
      Explore our curated collection of Islamic books and literature. Learn, grow, and enrich your knowledge at your own pace.
    </p>
  </div>
</section>

      
    
     <BooksSection books ={books} showHero={true} showAll={true} />

    </main>
  );
}
