import IslamicHeader from "../components/IslamicHeader";
import DetailPageSkeleton from "@/components/loading/DetailPageSkeleton";

export default function LoadingGraduationsPage() {
  return <DetailPageSkeleton type="graduated-student" showSidebar={false} showComments={false} showRelated={false} />;
}
