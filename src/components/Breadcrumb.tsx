"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { Home } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a string-safe wrapper function
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null;
  }

  // Get breadcrumb items based on pathname
  const getBreadcrumbItems = () => {
    const segments = pathname.split('/').filter(Boolean);
    const items: { label: string; href: string }[] = [];

    // Map route segments to Pashto translations
    const routeMap: Record<string, string> = {
      'articles': 'navbar.article',
      'courses': 'navbar.courses',
      'blogs': 'navbar.blogs',
      'iftah': 'navbar.iftah',
      'awlayaa': 'navbar.awlayaa',
      'awlyaa-charts': 'navbar.awlyaacharts',
      'book': 'navbar.books',
      'books': 'navbar.books',
      'event': 'navbar.event',
      'events': 'navbar.event',
      'about': 'header.about.title',
      'contact': 'navbar.contact',
      'donation': 'navbar.donation',
      'admission': 'navbar.admission',
      'authors': 'navbar.author',
      'author': 'navbar.author',
      'tasawwuf': 'navbar.tasawwuf',
      'graduated-students': 'navbar.graduation',
      'sanad': 'navbar.sanad',
      'gallery': 'header.gallery.title',
      'onlin-courses': 'navbar.onlineCourses',
      'registration': 'header.registration.title',
      'search': 'navbar.search',
      'category': 'iftah.categoryPage.subcategory',
      'sub-category': 'iftah.categoryPage.subcategories',
    };

    // Build breadcrumb items
    let currentPath = '';
    segments.forEach((segment, index) => {
      // Decode URL-encoded segments
      let decodedSegment = segment;
      try {
        decodedSegment = decodeURIComponent(segment);
      } catch (e) {
        // If decoding fails, use original segment
        decodedSegment = segment;
      }

      // Skip numeric IDs and long slugs (dynamic route segments)
      // Also skip segments that contain non-ASCII characters (likely dynamic content like category names)
      const isNumeric = /^\d+$/.test(decodedSegment);
      const isLongSlug = decodedSegment.length > 30;
      const isNonASCII = /[^\x00-\x7F]/.test(decodedSegment) && !routeMap[decodedSegment];
      
      if (isNumeric || isLongSlug || (isNonASCII && index > 0)) {
        // Don't add this segment to breadcrumb, but continue building path for next segments
        currentPath += `/${segment}`;
        return;
      }

      currentPath += `/${segment}`;
      const translationKey = routeMap[decodedSegment] || routeMap[segment];
      
      if (translationKey) {
        const label = t(translationKey);
        // Add if we have a valid label (not the raw key)
        if (label && label !== translationKey) {
          items.push({
            label,
            href: currentPath,
          });
        }
      } else {
        // Skip segments that are likely dynamic content (contain non-ASCII characters)
        // Only show if it's a simple alphanumeric segment
        if (/^[a-zA-Z0-9-]+$/.test(decodedSegment)) {
          items.push({
            label: decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1).replace(/-/g, ' '),
            href: currentPath,
          });
        }
      }
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();
  const homeLabel = t('navbar.home');

  // Always show breadcrumb if not on home page, even if we can't map the route
  // This ensures it appears on all pages

  return (
    <nav 
      className="w-full px-4 sm:px-6 lg:px-8 py-4"
      dir="rtl"
      aria-label="Breadcrumb"
    >
      <div className="rounded-lg border bg-white/95 shadow-sm px-4 py-3">
        <ol className="flex items-center gap-2 text-sm" dir="rtl">
          {/* Home link - appears first (on the right in RTL) */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">{homeLabel}</span>
            </Link>
          </li>
          
          {/* Separator after home */}
          <li className="flex items-center">
            <span className="text-primary-400">›</span>
          </li>
          
          {/* Current page - appears after home (on the left in RTL) */}
          {breadcrumbItems.length > 0 ? (
            <>
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                return (
                  <li key={item.href} className="flex items-center gap-2">
                    {index > 0 && (
                      <span className="text-primary-400">›</span>
                    )}
                    {isLast ? (
                      // Last item is not a link (current page)
                      <span className="text-primary-600 font-medium">
                        {item.label}
                      </span>
                    ) : (
                      // All other items are clickable links
                      <Link
                        href={item.href}
                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </>
          ) : (
            // Fallback: show current pathname if no mapping found
            <li className="flex items-center gap-2">
              <span className="text-primary-600 font-medium">
                {pathname.split('/').filter(Boolean).pop() || 'Page'}
              </span>
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
}

