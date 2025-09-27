import IslamicHeader from "../components/IslamicHeader";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function GalleryLoading() {
  return (
    <main className="w-full">
      <IslamicHeader pageType="gallery" />
      <div className="pb-16">
        <PageSkeleton type="default" showFilters={false} cardCount={6} />
      </div>
    </main>
  );
}