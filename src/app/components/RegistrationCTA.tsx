"use client";

import { useRouter } from "next/navigation";

export default function RegistrationCTA() {
  const router = useRouter();

  const goToRegistration = () => {
    router.push("/registration");
  };

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-5 right-5 w-20 h-20 bg-amber-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-5 left-5 w-24 h-24 bg-orange-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm text-amber-800 text-xs font-medium rounded-full mb-4 shadow-sm border border-amber-200/50">
          <span className="text-sm mr-1">📚</span>
          Enroll in Classes
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-3 leading-tight">
          Start Your Islamic Learning Journey
        </h2>
        
        <p className="text-amber-700 text-base mb-6 max-w-xl mx-auto">
          Join our Islamic education programs and learn from qualified scholars
        </p>

        <button
          className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold text-sm rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={goToRegistration}
        >
          Register for Classes
        </button>
      </div>
    </section>
  );
}
