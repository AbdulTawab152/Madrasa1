import GraduationsSection from "../components/graduation/TopGraduations";
import IslamicHeader from "../components/IslamicHeader";
import Breadcrumb from "@/components/Breadcrumb";

export default function GraduationsPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="graduated-students" 
        alignment="center"
       
      />
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <GraduationsSection showAll={true} />
      </div>
    </main>
  );
}
