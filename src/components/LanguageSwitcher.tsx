"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getLanguageDirection } from '@/lib/i18n';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ps', name: 'پښتو', flag: '🇦🇫' },
  { code: 'prs', name: 'دری', flag: '🇦🇫' },
];

export default function LanguageSwitcher() {
  // Component hidden - users will use GTranslate widget instead
  return null;
}
