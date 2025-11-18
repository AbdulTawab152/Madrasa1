"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop - Ensures page scrolls to top on route change
 * Prevents Next.js scroll restoration that causes jumping
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const scrollLockRef = useRef(true);

  useEffect(() => {
    // Disable scroll restoration permanently
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Immediately scroll to top when pathname changes
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Lock scroll at top
    scrollLockRef.current = true;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.width = '100%';
    
    // Monitor for content ready and keep scroll locked
    let scrollCheckInterval: NodeJS.Timeout;
    let unlockAttempts = 0;
    const maxUnlockAttempts = 100; // 5 seconds max
    
    const checkAndUnlock = () => {
      unlockAttempts++;
      
      // Check if main content is rendered
      const main = document.querySelector('main');
      const hasContent = main && main.children.length > 0;
      
      // Check if we're still at top
      const isAtTop = window.scrollY === 0 && window.pageYOffset === 0;
      
      // Only unlock if content is ready AND we're at top AND enough time has passed
      if (hasContent && isAtTop && unlockAttempts > 20) {
        // Wait a bit more to ensure content is stable
        setTimeout(() => {
          if (scrollLockRef.current) {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo({ top: 0, behavior: 'instant' });
            scrollLockRef.current = false;
            
            // Force scroll to top multiple times to ensure it sticks
            requestAnimationFrame(() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
              }, 50);
            });
          }
        }, 200);
        clearInterval(scrollCheckInterval);
        return;
      }
      
      // Force scroll to top while locked
      if (scrollLockRef.current) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      
      // Safety: unlock after max attempts
      if (unlockAttempts >= maxUnlockAttempts) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo({ top: 0, behavior: 'instant' });
        scrollLockRef.current = false;
        clearInterval(scrollCheckInterval);
      }
    };
    
    scrollCheckInterval = setInterval(checkAndUnlock, 50);
    
    // Also listen for scroll events to prevent any scrolling
    const preventScroll = (e: Event) => {
      if (scrollLockRef.current) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    
    window.addEventListener('scroll', preventScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    
    // Safety: Force unlock after 3 seconds max
    const safetyTimer = setTimeout(() => {
      if (scrollLockRef.current) {
        scrollLockRef.current = false;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 3000);

    return () => {
      clearInterval(scrollCheckInterval);
      clearTimeout(safetyTimer);
      window.removeEventListener('scroll', preventScroll);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      scrollLockRef.current = false;
    };
  }, [pathname]);

  return null;
}

