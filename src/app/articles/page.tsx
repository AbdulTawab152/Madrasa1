import ArticlesCard from "../components/ArticlesCard";
import IslamicHeader from "../components/IslamicHeader";
import Breadcrumb from "@/components/Breadcrumb";

export default function ArticlesPage() {
  return (
    <main className="w-full">
      <IslamicHeader pageType="articles" />
      <Breadcrumb />
      <ArticlesCard />
    </main>
  );
}
