import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function LoadingBookDetail() {
  return <DetailPageSkeleton type="book" showSidebar={true} showComments={false} showRelated={true} />;
}