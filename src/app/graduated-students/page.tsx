import GraduationsSection from "../components/graduation/TopGraduations.tsx";
import IslamicHeader from "../components/IslamicHeader";

export default function GraduationsPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="graduated-students" 
        title="Our Graduates"
        subtitle="Celebrating the remarkable achievements of our esteemed graduates"
        alignment="center"
       
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <GraduationsSection showAll={true} />
      </div>
    </main>
  );
}
