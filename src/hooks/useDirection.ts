"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to get the current text direction based on language
 * Returns 'ltr' for English and 'rtl' for Pashto and other RTL languages
 */
export function useDirection(): 'ltr' | 'rtl' {
  // Always return RTL since website only has RTL languages
  return 'rtl';
}

