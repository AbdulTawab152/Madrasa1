// app/tasawwuf/page.tsx
import TasawufList from "../components/tasawuuf/TasawwufList";
import { motion } from "framer-motion"; 

export default function TasawufPage() {
  return (
    <div className="min-h-screen mt-28 bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Hero Section with Orange Theme */}
  

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-orange-900 mb-6">Sacred Knowledge Repository</h2>
          <p className="text-orange-800 max-w-2xl mx-auto text-lg">
            Explore the depths of Islamic spirituality through our curated collection of articles on Tasawuf
          </p>
        </div>
     
        <TasawufList />
      </section>

      {/* Newsletter Section */}
 
    </div>
  );
}
