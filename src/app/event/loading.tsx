import IslamicHeader from "../components/IslamicHeader";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function EventsLoading() {
  return (
    <main className="w-full">
      <IslamicHeader pageType="events" />
      <div className="pb-16">
        <PageSkeleton type="events" showFilters={false} cardCount={6} />
      </div>
    </main>
  );
}