import IslamicHeader from "../components/IslamicHeader";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function ArticlesLoading() {
  return (
    <main className="w-full">
      <IslamicHeader pageType="articles" title={"Articles"} />
      <PageSkeleton type="articles" showFilters={true} cardCount={6} />
    </main>
  );
}