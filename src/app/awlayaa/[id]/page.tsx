import { AwlyaaApi } from "../../../lib/api";
import { Awlyaa } from "../../../lib/types";
import AwlyaaContent from "./AwlyaaContent";

interface AwlyaaPageProps {
  params: Promise<{ id: string }>;
}

export default async function AwlyaaDetailPage({ params }: AwlyaaPageProps) {
  const { id } = await params;
  const res = await AwlyaaApi.getById(id);
  const awlyaa: Awlyaa = res.data as Awlyaa;

  return <AwlyaaContent awlyaa={awlyaa} />;
}
