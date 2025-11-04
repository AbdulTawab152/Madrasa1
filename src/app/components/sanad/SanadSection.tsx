"use client";

import { useEffect, useState } from "react";
import { SanadApi } from "../../../lib/api";
import { Sanad } from "../../../lib/types";
import { motion } from "framer-motion";
import { ComingSoonEmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/hooks/useTranslation";

interface SanadSectionProps {
  showAll?: boolean;
  showHero?: boolean;
}

export default function SanadSection({ showAll = false, showHero = false }: SanadSectionProps) {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  const [sanads, setSanads] = useState<Sanad[]>([]);
  const [loading, setLoading] = useState(true);
  
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
        if (!showAll) data = data.slice(0, 4);
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
        <span className="ml-3 text-gray-600">د شجرو معلومات راټولول...</span>
      </div>
    );
  }

  if (!sanads.length) {
    return (
      <ComingSoonEmptyState
        title={t('sanad.title')}
        description={t('sanad.description')}
        className="max-w-2xl mx-auto"
      />
    );
  }

  return (
    <div className="w-full">
      {showHero && (
        <div className="text-center mb-16">
          <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('sanad.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('sanad.description')}
          </p>
        </div>
      )}

      {/* Beautiful Sanad Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
              {idx === 0 ? (
                // First item - bigger and special
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 border-l-6 border-blue-600 ">
                  <div className="text-center notranslate">
                    <div className="text-4xl mb-4">📜</div>
                    <p className="text-gray-800 text-xl leading-relaxed font-semibold rtl">
                      {sanad.name}
                    </p>
                  </div>
                </div>
              ) : (
                // Other items - with numbers
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-50">
                  <div className="flex items-center justify-between gap-4 notranslate">
                    <div className="flex-shrink-0 w-8 h-8"></div>
                    <p className="text-gray-800 text-lg leading-relaxed font-medium rtl flex-1 text-center">
                      {sanad.name}
                    </p>
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {idx}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
