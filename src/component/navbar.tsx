"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo, memo } from "react";
import { navigation } from "../lib/config";
import { FaList } from "react-icons/fa6";

const Navbar = memo(() => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoized date calculations to avoid recalculating on every render
  const { desktopDate, mobileDate } = useMemo(() => {
    const now = new Date();

    // Format Gregorian date in English (US)
    const gregorianEnglish = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const gregorianEnglishShort = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Islamic (Hijri) date using Intl API in English
    let islamicDate = "";
    let islamicDateShort = "";

    try {
      const islamic = new Intl.DateTimeFormat("en-u-ca-islamic", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(now);
      islamicDate = islamic.replace("AH", "Hijri");

      const islamicShort = new Intl.DateTimeFormat("en-u-ca-islamic", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(now);
      islamicDateShort = islamicShort.replace("AH", "Hijri");
    } catch {
      // Fallback if Islamic date calculation fails
      islamicDate = "";
      islamicDateShort = "";
    }

    return {
      desktopDate: `${islamicDate} ${gregorianEnglish}`,
      mobileDate: `${islamicDateShort} ${gregorianEnglishShort}`,
    };
  }, []); // Empty dependency array - only calculate once per session

  // Memoized navigation items
  const mainNavItems = useMemo(() => navigation.main.slice(0, 6), []);
  const dropdownNavItems = useMemo(() => navigation.main.slice(6), []);

  return (
    <div className="fixed w-full z-50 top-0 start-0">
      {/* Top Bar - Amber */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-white py-3 px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left - Dates */}
            <div className="text-sm font-medium text-amber-100">
              <div className="flex items-center gap-2">
                <span>{desktopDate}</span>
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
                  <svg
                    className="w-3 h-3 text-amber-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{mobileDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - White */}
      <nav
        className={`bg-white border-b border-amber-200 transition-all duration-300 ${
          scrolled ? "shadow-md shadow-amber-100" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo/Brand */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-bold text-amber-800 hover:text-amber-600 transition-colors duration-200"
              >
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
                          isActive ? "text-amber-600" : ""
                        }`}
                      >
                        {item.name}
                        {isActive && (
                          <div className="absolute -bottom-1 left-0 w-full h-0.5  rounded-full"></div>
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
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Content */}
                    <div
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl border border-amber-200 transition-all duration-200 ${
                        isDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="py-3">
                        {dropdownNavItems.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`block px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-0 ${
                                isActive
                                  ? "text-amber-600 bg-amber-50 font-medium"
                                  : "text-amber-700 hover:text-amber-600 hover:bg-amber-50"
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
           

          </div>

          <div className="lg:hidden">
  {/* Hamburger Button */}
  <div className="flex items-center left-0 flex-shrink-0">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="inline-flex items-center absolute right-0 top-[90px] justify-center p-2 rounded-lg text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
    <FaList size={20}/>
    </button>
  </div>

  {/* Mobile Navigation Menu */}
  <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
    <div className="absolute inset-0 bg-black/20" onClick={() => setIsOpen(false)}></div>
    <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl">
    

      {/* Navigation Items */}
      <nav className="pt-16 px-6 overflow-y-auto h-full">
        <div className="space-y-2">
          {/* Main navigation items */}
          {navigation.main.slice(0, 4).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "text-amber-900 bg-gradient-to-r from-amber-400/30 to-amber-300/30 shadow-sm border-l-4 border-amber-600"
                    : "text-amber-800 hover:text-amber-700 hover:bg-amber-200/40"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <div className="ml-2 bg-amber-600 text-amber-50 text-xs px-2 py-1 rounded-full">
                    Active
                  </div>
                )}
              </Link>
            );
          })}

          {/* More dropdown section */}
          <div className="pt-4 mt-4 border-t border-amber-200/60">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center p-4 rounded-xl text-lg font-medium text-amber-800 bg-amber-200/30 hover:bg-amber-200/50 transition-all duration-200"
              aria-expanded={isDropdownOpen}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                More Options
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                } text-amber-600`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown items */}
            <div
              className={`mt-2 ml-6 space-y-1 rounded-lg overflow-hidden transition-all duration-300 ${
                isDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {[
                { href: "/author", name: "Author" },
                { href: "/articles", name: "Articles" },
                { href: "/iftah", name: "Iftah" },
                { href: "/donation", name: "Donation" },
                { href: "/tasawwuf", name: "Tasawwuf" },
              ].map(({ href, name }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center p-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-amber-900 bg-amber-200/50"
                        : "text-amber-700 hover:text-amber-800 hover:bg-amber-200/30"
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span>{name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>

          {/* Mobile Navigation */}

          {/* Mobile Navigation */}
         
        </div>
      </nav>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
