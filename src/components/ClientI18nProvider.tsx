"use client";

// Simplified provider - no longer using i18n system
export default function ClientI18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
