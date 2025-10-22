"use client";

import { useEffect, useState } from "react";
import { SanadApi } from "../../../lib/api";
import { Sanad } from "../../../lib/types";
import { motion } from "framer-motion";
import { FaScroll, FaCalendarAlt, FaStar } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";

interface SanadSectionProps {
  showAll?: boolean;
  showHero?: boolean;
}

export default function SanadSection({ showAll = false, showHero = false }: SanadSectionProps) {
  const [sanads, setSanads] = useState<Sanad[]>([]);
  const [loading, setLoading] = useState(true);
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a string-safe wrapper function
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  useEffect(() => {
    async function fetchSanads() {
      try {
        const res = await SanadApi.getAll();
        let data: Sanad[] = Array.isArray(res?.data) ? res.data as Sanad[] : [];
        if (!showAll) data = data.slice(0, 3);
        setSanads(data);
      } catch (err) {
        console.error(err);
        setSanads([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSanads();
  }, [showAll]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">{t('home.loadingSanad')}</span>
      </div>
    );
  }

  if (!sanads.length) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📜</div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          {t('home.ourSanad')}
        </h2>
        <p className="text-gray-500">{t('home.sanadDescription')}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {showHero && (
        <div className="text-center mb-16">
          <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('home.ourSanad')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.sanadDescription')}
          </p>
        </div>
      )}

      {/* Clean List Design */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {sanads.map((sanad, idx) => (
            <motion.div
              key={sanad.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                ease: "easeOut"
              }}
              className="group"
            >
              <div className="bg-white rounded-lg border-spacing-0 border border-gray-200  transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <FaScroll className="text-white text-sm" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{t('home.sanadHighlight')} Certificate</h3>
                      <p className="text-sm text-gray-600">Spiritual Lineage</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-800 text-sm leading-relaxed text-center font-medium">
                      {sanad.name}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-600" />
                      <span>{new Date(sanad.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
