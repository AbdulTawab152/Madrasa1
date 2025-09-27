import IslamicHeader from "../components/IslamicHeader";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function IftahLoading() {
  return (
    <main className="w-full">
      <IslamicHeader pageType="iftah" />
      <div className="pb-16">
        <PageSkeleton type="default" showFilters={false} cardCount={6} />
      </div>
    </main>
  );
}