import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function BooksLoading() {
  return <DetailPageSkeleton type="book" showSidebar={false} showComments={false} showRelated={false} />;
}