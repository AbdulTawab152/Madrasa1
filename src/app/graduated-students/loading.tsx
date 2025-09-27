import IslamicHeader from "../components/IslamicHeader";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function LoadingGraduationsPage() {
  return (
    <main className="w-full">
      <IslamicHeader pageType="graduated-students" />
      <div className="pb-16">
        <PageSkeleton type="authors" showFilters={false} cardCount={6} />
      </div>
    </main>
  );
}
