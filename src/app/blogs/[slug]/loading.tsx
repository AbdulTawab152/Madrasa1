import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function LoadingBlogDetail() {
  return <DetailPageSkeleton type="blog" showSidebar={true} showComments={true} showRelated={true} />;
}