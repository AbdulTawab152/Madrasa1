import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function LoadingArticleDetail() {
  return <DetailPageSkeleton type="article" showSidebar={true} showComments={true} showRelated={true} />;
}
