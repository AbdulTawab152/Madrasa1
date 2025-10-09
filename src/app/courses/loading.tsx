import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function CoursesLoading() {
  return <DetailPageSkeleton type="course" showSidebar={false} showComments={false} showRelated={false} />;
}