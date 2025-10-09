import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function BlogsLoading() {
  return <DetailPageSkeleton type="blog" showSidebar={false} showComments={false} showRelated={false} />;
}