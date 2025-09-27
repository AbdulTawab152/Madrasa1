import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function LoadingEventDetail() {
  return <DetailPageSkeleton type="event" showSidebar={true} showComments={false} showRelated={true} />;
}