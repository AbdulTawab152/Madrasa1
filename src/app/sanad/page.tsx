import SanadSection from "../components/sanad/SanadSection";
import IslamicHeader from "../components/IslamicHeader";

export default function SanadPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="sanad" 
        title="Our Sanad"
        subtitle="Discover our spiritual lineage and the blessed chain of transmission"
        alignment="center"
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <SanadSection showAll={true} showHero={false} />
      </div>
    </main>
  );
}
