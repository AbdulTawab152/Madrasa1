import IslamicHeader from "../components/IslamicHeader";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function BooksLoading() {
  return (
    <main className="max-w-full">
      <IslamicHeader pageType="books" />
      <div className="pb-16">
        <PageSkeleton type="books" showFilters={false} cardCount={6} />
      </div>
    </main>
  );
}