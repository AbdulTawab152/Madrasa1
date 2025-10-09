import IslamicHeader from "../components/IslamicHeader";
import AwlyaaChartsSection from "../components/awlyaa/AwlyaaChartsSection";

export default function AwlyaaChartsPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="awlayaa" 
        title="Awlyaa Charts"
        subtitle="Explore the spiritual lineage and connections of our Islamic scholars"
        alignment="center"
        cta={{
          label: "View Charts",
          href: "#charts-section"
        }}
      />
      <div id="charts-section" className="w-full">
        <AwlyaaChartsSection />
      </div>
    </main>
  );
}
