import ArticlesCard from "../components/ArticlesCard";
import IslamicHeader from "../components/IslamicHeader";

export default function ArticlesPage() {
  return (
    <main className="w-full">
      <IslamicHeader pageType="articles" />
      <ArticlesCard />
    </main>
  );
}
