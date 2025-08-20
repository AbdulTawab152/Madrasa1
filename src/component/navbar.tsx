'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { navigation, appConfig } from '../lib/config';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main navigation items (first 6)
  const mainNavItems = navigation.main.slice(0, 6);
  // Dropdown navigation items (rest)
  const dropdownNavItems = navigation.main.slice(6);

  return (
    <div className="fixed w-full z-20 top-0 start-0">
      {/* Top Bar - Amber */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-white py-3 px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left - Dates */}
            <div className="text-sm font-medium text-amber-100">
              <div className="flex items-center gap-2">
              
                <span>
                  {(() => {
                    // Get current Gregorian date
                    const gregorian = new Date();
                    // Format Gregorian date in English (US)
                    const gregorianEnglish = gregorian.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });

                    // Islamic (Hijri) date using Intl API in English
                    let islamicDate = '';
                    try {
                      const islamic = new Intl.DateTimeFormat('en-u-ca-islamic', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(gregorian);
                      islamicDate = islamic.replace('AH', 'Hijri');
                    } catch (e) {
                      islamicDate = '';
                    }

                    return `${islamicDate} ${gregorianEnglish}`;
                  })()}
                </span>
              </div>
            </div>
            
            {/* Center - Arabic Calligraphy */}
            <div className="text-center">
              <span className="arabic text-xl font-bold tracking-wider text-amber-50 drop-shadow-sm">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </span>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Arabic Calligraphy - Mobile */}
            <div className="text-center mb-2">
              <span className="arabic text-lg font-bold tracking-wider text-amber-50 drop-shadow-sm">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </span>
            </div>
            
            {/* Dates - Mobile */}
            <div className="text-center">
              <div className="text-xs font-medium text-amber-100">
                <div className="flex items-center justify-center gap-1">
                  <svg className="w-3 h-3 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {(() => {
                      // Get current Gregorian date
                      const gregorian = new Date();
                      // Format Gregorian date in English (US)
                      const gregorianEnglish = gregorian.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      });

                      // Islamic (Hijri) date using Intl API in English
                      let islamicDate = '';
                      try {
                        const islamic = new Intl.DateTimeFormat('en-u-ca-islamic', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }).format(gregorian);
                        islamicDate = islamic.replace('AH', 'Hijri');
                      } catch (e) {
                        islamicDate = '';
                      }

                      return `${islamicDate} ${gregorianEnglish}`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - White */}
      <nav className={`bg-white border-b border-amber-200 transition-all duration-300 ${
        scrolled ? 'shadow-lg shadow-amber-100' : ''
      }`}>
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo/Brand */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-amber-800 hover:text-amber-600 transition-colors duration-200">
              Anwarul Uloom
              </Link>
            </div>

            {/* Center - Navigation Links */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-6 rtl:space-x-reverse">
                {/* Main Navigation Items */}
                {mainNavItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <div key={item.href} className="flex items-center group">
                      <Link
                        href={item.href}
                        className={`text-amber-700 hover:text-amber-600 font-semibold text-base transition-colors duration-200 relative py-2 focus:outline-none focus:ring-0 ${
                          isActive ? 'text-amber-600' : ''
                        }`}
                      >
                        {item.name}
                        {isActive && (
                          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 rounded-full"></div>
                        )}
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 rounded-full transition-all duration-200 group-hover:w-full"></div>
                      </Link>
                                          {index < mainNavItems.length - 1 && (
                      <div className="mx-4 w-px h-5 bg-amber-300 group-hover:bg-amber-400 transition-colors duration-200"></div>
                    )}
                    </div>
                  );
                })}

                {/* Dropdown Menu */}
                <div className="flex items-center group">
                  <div className="mx-4 w-px h-5 bg-amber-300 group-hover:bg-amber-400 transition-colors duration-200"></div>
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-amber-700 hover:text-amber-600 font-semibold text-base transition-colors duration-200 flex items-center gap-2 py-2 focus:outline-none focus:ring-0"
                    >
                      More
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>

                  {/* Dropdown Content */}
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl border border-amber-200 transition-all duration-200 ${
                    isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="py-3">
                      {dropdownNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-0 ${
                              isActive
                                ? 'text-amber-600 bg-amber-50 font-medium'
                                : 'text-amber-700 hover:text-amber-600 hover:bg-amber-50'
                            }`}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Mobile Menu Button */}
            <div className="flex items-center flex-shrink-0">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-amber-600 rounded-lg hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300"
              >
                <span className="sr-only">Open main menu</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="px-4 pt-4 pb-6 space-y-2 bg-amber-50 rounded-xl mt-4 border border-amber-200 shadow-lg">
              {/* Main Navigation Items */}
              {navigation.main.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      isActive
                        ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                        : 'text-amber-800 hover:text-amber-600 hover:bg-amber-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}

              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
 