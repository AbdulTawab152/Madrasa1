import IslamicHeader from "../components/IslamicHeader";
import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function EventsLoading() {
  return <DetailPageSkeleton type="event" showSidebar={false} showComments={false} showRelated={false} />;
}