import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function LoadingAuthorDetail() {
  return <DetailPageSkeleton type="author" showSidebar={false} showComments={false} showRelated={true} />;
}