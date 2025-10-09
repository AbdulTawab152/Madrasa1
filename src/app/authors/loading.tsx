import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function AuthorsLoading() {
  return <DetailPageSkeleton type="author" showSidebar={false} showComments={false} showRelated={false} />;
}