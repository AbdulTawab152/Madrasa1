import IslamicHeader from "../components/IslamicHeader";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function BlogsLoading() {
  return (
    <main className="w-full">
      <IslamicHeader pageType="blogs" />
      <div className="pb-16">
        <PageSkeleton type="blogs" showFilters={false} cardCount={6} />
      </div>
    </main>
  );
}