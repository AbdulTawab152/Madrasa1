import { motion } from "framer-motion";
import IslamicHeader from "../components/IslamicHeader";
import { FaHandsHelping, FaGlobe, FaPhone, FaShieldAlt, FaMapMarkerAlt, FaComments, FaCheckCircle, FaClock } from "react-icons/fa";

export default function LoadingDonationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <IslamicHeader pageType="donation" title="Ways to Donate" />
      
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <FaHandsHelping className="text-orange-600" />
              <span>Support Islamic Education</span>
            </div>
            
            <div className="h-16 bg-gray-200 rounded-xl mb-6 animate-pulse max-w-4xl mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-lg mb-8 animate-pulse max-w-3xl mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Donation Methods Skeleton */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="h-12 bg-gray-200 rounded-xl mb-4 animate-pulse max-w-md mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <div className="flex flex-col lg:flex-row">
                {/* Header Skeleton */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 lg:w-1/3 flex-shrink-0">
                  <div className="mb-4">
                    <div className="h-6 bg-white/30 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-3 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-3 bg-white/20 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>

                {/* Content Skeleton */}
                <div className="p-8 lg:w-2/3">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-green-600 rounded-xl">
                      <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/30 rounded mb-1 animate-pulse"></div>
                        <div className="h-3 bg-white/30 rounded w-24 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-xl">
                      <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/30 rounded mb-1 animate-pulse"></div>
                        <div className="h-3 bg-white/30 rounded w-20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-600 rounded-xl md:col-span-2">
                      <div className="w-6 h-6 bg-white/30 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/30 rounded mb-1 animate-pulse"></div>
                        <div className="h-3 bg-white/30 rounded w-32 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Instructions Skeleton */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-12 bg-white/20 rounded-xl mb-6 animate-pulse max-w-lg mx-auto"></div>
            <div className="h-6 bg-white/20 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-white/20 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Skeleton */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
