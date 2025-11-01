"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { PiList } from "react-icons/pi";

import { appConfig, navigation } from "@/lib/config";
import RouteProgressBar from "@/components/RouteProgressBar";
import { Suspense } from "react";
import { FaSearch } from "react-icons/fa";


const PRIMARY_LINK_LIMIT = 7;
const NAV_LABELS: Record<string, string> = {
  home: "کور",
  courses: " کورسونه",
  iftah: "افتاء",
  article: "مقالې",
  awlayaa: "اولیا",
  awlyaacharts: "اولیا چارټونه",
  admission: "نوم لیکنه",
  books: "کتابتون",
  donation: "مرسته",
  blogs: "بلاګونه",
  author: "لیکوالان",
  event: "واقعات",
  tasawwuf: "تصوف",
  graduation: "فراغتونه",
  sanad: "شجره",
  contact: "اړیکه",
};

const Navbar = memo(function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const isRTL = true;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ps');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }, [pathname]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);


  const { desktop, mobile } = useMemo(() => {
    const now = new Date();
    const gregorianFull = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const gregorianCompact = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    try {
      const hijriFull = new Intl.DateTimeFormat("en-u-ca-islamic", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(now);
      const hijriCompact = new Intl.DateTimeFormat("en-u-ca-islamic", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(now);

      return {
        desktop: `${hijriFull.replace("AH", "Hijri")} ${gregorianFull}`.trim(),
        mobile: `${hijriCompact.replace("AH", "Hijri")} ${gregorianCompact}`.trim(),
      };
    } catch {
      return {
        desktop: gregorianFull,
        mobile: gregorianCompact,
      };
    }
  }, []);

  const primaryLinks = useMemo(
    () => navigation.main.slice(0, PRIMARY_LINK_LIMIT).map(link => ({
      ...link,
      name: NAV_LABELS[link.name as keyof typeof NAV_LABELS] || link.name
    })),
    []
  );
  const secondaryLinks = useMemo(
    () => navigation.main.slice(PRIMARY_LINK_LIMIT).map(link => ({
      ...link,
      name: NAV_LABELS[link.name as keyof typeof NAV_LABELS] || link.name
    })),
    []
  );

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((previous) => !previous);
  }, []);

  const toggleMoreMenu = useCallback(() => {
    setMoreMenuOpen((previous) => !previous);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen((previous) => !previous);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
      // You can redirect to a search results page or filter content
      // Example: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const closeMoreMenu = useCallback(() => setMoreMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50" dir="rtl" lang="ps">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(255,255,255,0))]" aria-hidden="true" />
        <div className="absolute -left-12 top-6 h-24 w-24 rounded-full bg-primary-700/40 blur-2xl" aria-hidden="true" />
        <div className="absolute -right-10 bottom-0 h-20 w-20 rounded-full bg-secondary-400/30 blur-2xl" aria-hidden="true" />
        <div className="max-w-screen-xl relative mx-auto px-4 py-2 md:py-4">
          <div className={`hidden md:flex items-center justify-between text-sm text-primary-50/90 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={isRTL ? 'text-right' : 'text-left'}>{desktop}</span>
            <span className="arabic text-xl font-bold tracking-widest text-secondary-100 drop-shadow-sm">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </span>
          </div>
          <div className="md:hidden text-center space-y-2">
            <span className="arabic block text-lg font-bold tracking-widest text-secondary-100 drop-shadow-sm">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </span>
            <span className="inline-flex items-center justify-center gap-2 text-[11px] font-medium text-primary-50/90">
              <svg
                className="h-3 w-3 text-primary-200"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{mobile}</span>
            </span>
          </div>
        </div>
      </div>

      <nav
        className={`relative bg-white/95 backdrop-blur transition-all duration-300 border-b border-primary-100/70 ${
          hasScrolled ? "shadow-am" : ""
        }`}
        aria-label="Primary"
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-2">
          <div className={`flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo - Will be on right for RTL */}
            <Link
              href="/"
              className={`flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                  <Image
                    src="/logo.png"
                    alt="د انور العلوم نښان"
                    fill
                    sizes="(max-width: 768px) 120px, 150px"
                    className="object-contain"
                    priority
                  />
                </div>
              
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <div className="text-lg font-bold text-primary-900">
                  {appConfig.name}
                </div>
                <div className="text-xs text-primary-600 font-medium">
                  د اسلامي زده کړو پلیټفارم
                </div>
              </div>
            </Link>

            {/* Navigation - Center */}
            <div className="hidden lg:flex py-3 items-center justify-center flex-1">
              <ul className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {primaryLinks.map(({ href, name }) => {
                  const isActive = pathname === href;
                  return (
                    <li key={href} className="group relative">
                      <Link
                        href={href}
                        className={`font-medium text-[13px] uppercase tracking-wide transition-colors duration-200 py-2 text-primary-800 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
                          isActive ? "text-primary-600" : ""
                        } ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        {name}
                      </Link>
                      <span
                        className={`absolute -bottom-1 h-0.5 w-full rounded-full bg-secondary-500 transition-opacity duration-200 ${
                          isRTL ? 'right-0' : 'left-0'
                        } ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                        aria-hidden="true"
                      />
                    </li>
                  );
                })}

                {secondaryLinks.length > 0 && (
                  <li className="relative">
                    <button
                      type="button"
                      onClick={toggleMoreMenu}
                      className="flex items-center gap-2 font-medium text-[13px] uppercase tracking-wide text-primary-800 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus-visible:outline-none"
                      aria-haspopup="true"
                      aria-expanded={isMoreMenuOpen}
                    >
                      نور
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          isMoreMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                <div
                  className={`absolute top-full mt-3 w-56 rounded-xl border border-primary-100 bg-white shadow-xl transition-all duration-200 ${
                    isRTL ? 'right-0' : 'left-1/2 -translate-x-1/2'
                  } ${
                    isMoreMenuOpen
                      ? "visible opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                  role="menu"
                >
                  <ul className="py-3">
                    {secondaryLinks.map(({ href, name }) => {
                      const isActive = pathname === href;
                      return (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={closeMoreMenu}
                            className={`block px-4 py-3 uppercase text-xs transition-colors duration-200 focus:outline-none focus-visible:outline-none ${
                              isRTL ? 'text-right' : 'text-left'
                            } ${
                              isActive
                                ? "bg-primary-50 font-semibold text-primary-700"
                                : "text-primary-700 hover:bg-primary-50 hover:text-primary-600"
                            }`}
                          >
                            {name}
                          </Link>
                        </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* Left side - Search, Mobile Menu, Donation for RTL */}
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Search Button */}
              <div ref={searchRef} className="relative">
                <button
                  type="button"
                  onClick={toggleSearch}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 hover:bg-primary-100 border border-primary-200 shadow-sm transition-colors duration-200"
                  aria-label="Toggle search"
                >
                  <FaSearch size={18} className="text-primary-700" />
                </button>
                
                {/* Search Overlay */}
                {isSearchOpen && (
                  <div className={`absolute top-full mt-4 z-50 ${isRTL ? 'right-0' : 'left-0'}`}>
                    <form onSubmit={handleSearch} className="relative">
                      <div className="bg-white rounded-xl shadow-xl border border-primary-200 p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="پلټنه..."
                            className={`h-10 px-4 rounded-lg bg-primary-50 border border-primary-200 text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                              searchQuery.length > 20 ? 'w-96' : 'w-80'
                            }`}
                            autoFocus
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={() => setSearchQuery("")}
                              className="text-primary-400 hover:text-primary-600 transition-colors p-1"
                              aria-label="Clear search"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                          <button
                            type="submit"
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                          >
                            پلټنه
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              
              {/* Donation Button */}
              <Link href="/donation" className="hidden md:block">
                <button
                  className="group relative inline-flex items-center justify-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ease-out hover:scale-105 active:scale-100 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 overflow-hidden"
                >
                  {/* Subtle shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                  
                  <span className="text-lg inline-block animate-bounce group-hover:animate-none group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-out">🎁</span>
                  <span className="whitespace-nowrap relative z-10">مرسته وکړئ</span>
                </button>
              </Link>
              
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 hover:bg-primary-100 border border-primary-200 shadow-sm transition-colors duration-200 lg:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <PiList size={22} className="text-primary-700" />
              </button>
            </div>

 
          </div>
        </div>
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-40 bg-primary-900/40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />

      <aside
        className={`lg:hidden fixed inset-y-0 z-50 w-4/5 max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isRTL 
            ? (isMobileMenuOpen ? "translate-x-0" : "translate-x-full") 
            : (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full")
        } ${isRTL ? 'right-0' : 'left-0'}`}
        aria-label="Mobile navigation"
      >
        <div className={`flex items-center justify-between px-6 py-5 border-b border-primary-100/60 bg-gradient-to-r from-primary-50 to-primary-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="د انور العلوم نښان"
                fill
                sizes="(max-width: 768px) 120px, 150px"
                className="object-contain"
                priority
              />
            </div>
            <span className={`text-lg font-semibold text-primary-900 tracking-wide ${isRTL ? 'text-right' : 'text-left'}`}>{appConfig.name}</span>
          </div>
          
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="rounded-full p-2 text-primary-700 hover:text-primary-600 focus:outline-none focus-visible:outline-none transition-colors duration-200"
              aria-label="Close navigation menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <nav className="h-full overflow-y-auto px-6 py-6" aria-label="Mobile">
          <div className="space-y-3">
            {primaryLinks.map(({ href, name }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between rounded-xl p-4 text-sm font-medium transition-all duration-200 shadow-sm ${
                    isActive
                      ? `${isRTL ? 'border-r-4' : 'border-l-4'} border-primary-600 bg-gradient-to-r from-primary-400/30 to-primary-300/30 text-primary-900`
                      : "text-primary-800/90 hover:bg-primary-100/40"
                  }`}
                >
                  <span className={isRTL ? 'text-right' : 'text-left'}>{name}</span>
                </Link>
              );
            })}

            {secondaryLinks.length > 0 && (
              <div className="pt-5 mt-6 border-t border-primary-100/60">
                <button
                  type="button"
                  onClick={toggleMoreMenu}
                  className="flex w-full items-center justify-between rounded-xl bg-primary-100/40 p-4 text-sm font-semibold text-primary-800 hover:bg-primary-100/60 transition-all duration-200 focus:outline-none focus-visible:outline-none"
                  aria-expanded={isMoreMenuOpen}
                >
                  <span className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                    نور انتخابونه
                  </span>
                  <svg
                    className={`h-4 w-4 text-primary-500 transition-transform ${
                      isMoreMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${
                    isMoreMenuOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {secondaryLinks.map(({ href, name }) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => {
                          closeMobileMenu();
                          closeMoreMenu();
                        }}
                        className={`block rounded-lg p-3 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary-100/50 text-primary-900"
                            : "text-primary-700 hover:bg-primary-100/30"
                        }`}
                      >
                        {name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Donation Button at Bottom */}
            <div className="pt-6 mt-8 border-t border-primary-100/60 flex justify-center">
              <Link href="/donation" onClick={closeMobileMenu} className="w-full">
                <button
                  className="group relative w-full flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-br from-yellow-300 via-primary-600 to-primary-700 hover:from-yellow-400 hover:to-primary-800 text-white font-bold text-base shadow-2xl hover:shadow-yellow-200/60 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:ring-offset-2"
                  style={{
                    boxShadow: '0 6px 24px 0 rgba(255, 205, 86, 0.15), 0 1.5px 6px 0 rgba(13, 148, 136, 0.11)'
                  }}
                >
                  <span className="absolute left-0 top-0 w-full h-full rounded-xl bg-gradient-to-br from-yellow-200 via-transparent to-transparent opacity-0 group-hover:opacity-30 blur-sm pointer-events-none transition-opacity duration-300"></span>
                  <span className="relative inline-flex items-center gap-3 z-10">
                    <span className="text-2xl animate-bounce drop-shadow-md">🎁</span>
                    <span className="whitespace-nowrap text-lg tracking-wide  drop-shadow">مرسته وکړئ</span>
                  </span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 z-10 opacity-70 group-hover:translate-x-1 transition-transform duration-300">
                    <svg width="22" height="22" fill="none" viewBox="0 0 22 22" className="text-yellow-300 group-hover:text-yellow-400"><path d="M17.5 10.43l-10.167 7.173a1 1 0 01-1.55-.833V5.217a1 1 0 011.55-.833L17.5 11.557a1 1 0 010 1.606z" fill="currentColor"/></svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </aside>
    </header>
  );
});

export default Navbar;
