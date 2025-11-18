"use client";

import { useEffect } from 'react';

/**
 * IslamicLoader - A beautiful, simple Islamic-themed loader
 * Used for all detail pages across the website
 */

export default function IslamicLoader() {
  useEffect(() => {
    // Scroll to top when loader appears
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 flex items-center justify-center bg-gradient-to-br from-[#e0f2f2] via-white to-[#f0f9f9] p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-xl p-6 sm:p-8 max-w-[280px] w-full border border-[#d0e8e8]">
        <div className="flex flex-col items-center justify-center space-y-5">
          {/* Islamic Crescent Moon Loader */}
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-[#e0f2f2] border-t-[#4a8a8a] rounded-full animate-spin"></div>
            
            {/* Inner crescent moon - elegant design */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Crescent shape - simplified */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                  <div className="absolute inset-0 bg-[#4a8a8a] rounded-full opacity-15 animate-pulse"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading Text - compact */}
          <div className="text-center space-y-1.5">
            <h3 className="text-base sm:text-lg font-semibold text-[#4a8a8a]" style={{ fontFamily: 'Amiri, serif' }}>
              جاري التحميل...
            </h3>
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Amiri, serif' }}>
              مهرباني وکړئ انتظار وکړئ
            </p>
          </div>
          
          {/* Animated Progress Dots - minimal */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <div 
              className="w-1.5 h-1.5 bg-[#4a8a8a] rounded-full animate-bounce" 
              style={{ animationDelay: '0ms', animationDuration: '0.8s' }}
            ></div>
            <div 
              className="w-1.5 h-1.5 bg-[#4a8a8a] rounded-full animate-bounce" 
              style={{ animationDelay: '150ms', animationDuration: '0.8s' }}
            ></div>
            <div 
              className="w-1.5 h-1.5 bg-[#4a8a8a] rounded-full animate-bounce" 
              style={{ animationDelay: '300ms', animationDuration: '0.8s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

