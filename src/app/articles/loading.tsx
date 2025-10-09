import IslamicHeader from "../components/IslamicHeader";
import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function ArticlesLoading() {
  return <DetailPageSkeleton type="article" showSidebar={false} showComments={false} showRelated={false} />;
}