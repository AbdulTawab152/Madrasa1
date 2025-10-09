import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function GalleryLoading() {
  return <DetailPageSkeleton type="article" showSidebar={false} showComments={false} showRelated={false} />;
}