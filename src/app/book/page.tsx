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
       
       <section className="relative w-full mt-0 mb-24 overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 z-0"></div>

  {/* Decorative Ornaments */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-orange-100 to-amber-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

  {/* Subtle Islamic Pattern Overlay */}
  <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/moroccan-flower.png')] bg-repeat"></div>

  {/* Content */}
  <div className="relative z-10 py-20 md:py-24 px-6 flex flex-col items-center text-center">
    
    {/* Badge */}
    <div className="inline-flex items-center gap-2 mb-10 px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-500 text-white text-sm md:text-base font-semibold rounded-full shadow-md">
      <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
       Our Islamic Books
    </div>

    {/* Title */}
    <h1 className="text-3xl md:text-6xl lg:text-6xl font-extrabold mb-8 text-gray-900 leading-snug tracking-tight">
      Discover{" "}
      <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
        Islamic Books
      </span>{" "}
      <br className="hidden md:block" />
      That{" "}
      <span className="relative inline-block text-gray-900">
        Inspire
        <span className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></span>
      </span>
    </h1>

    {/* Subtitle */}
    <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
      Enrich your mind and soul with our{" "}
      <span className="font-semibold text-amber-600">carefully selected Islamic books</span>.  
      Gain wisdom, guidance, and inspiration for your{" "}
      <span className="font-semibold text-amber-600">spiritual journey</span>.
    </p>


  </div>
</section>



      
    
     <BooksSection books ={books} showHero={true} showAll={true} />

    </main>
  );
}
