import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function LoadingCourseDetail() {
  return <DetailPageSkeleton type="course" showSidebar={true} showComments={false} showRelated={true} />;
}
