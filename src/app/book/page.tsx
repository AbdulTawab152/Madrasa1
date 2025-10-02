// app/books/page.tsx
import BooksSection from "../components/books/BooksSection";
import IslamicHeader from "../components/IslamicHeader";

export default function BooksPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="books" 
        title="Our Books"
        subtitle="Discover our collection of Islamic books and literature"
        alignment="center"
        // cta={{
        //   label: "Browse All Books",
        //   href: "/book"
        // }}
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BooksSection showAll={true} />
      </div>
    </main>
  );
}
