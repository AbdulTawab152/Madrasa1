"use client";

import { useEffect } from 'react';

export default function DocumentAttributes() {
  useEffect(() => {
    // Always set to RTL for Pashto
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ps';
    }
  }, []);

  return null;
}
