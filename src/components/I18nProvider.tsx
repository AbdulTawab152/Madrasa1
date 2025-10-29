"use client";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  // Simplified provider - document attributes are now handled by DocumentAttributes component
  return <>{children}</>;
}