import IslamicHeader from "../components/IslamicHeader";
import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function AwlayaaLoading() {
  return <DetailPageSkeleton type="awlayaa" showSidebar={false} showComments={false} showRelated={false} />;
}