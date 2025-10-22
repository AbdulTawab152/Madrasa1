"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type Alignment = "center" | "left";
type Theme = "amber" | "emerald" | "indigo" | "slate";
type PageType = "courses" | "articles" | "blogs" | "events" | "books" | "authors" | "awlayaa" | "tasawwuf" | "gallery" | "about" | "contact" | "donation" | "registration" | "graduated-students" | "iftah" | "default";

export interface IslamicHeaderProps {
  title?: string;
  subtitle?: string;
  alignment?: Alignment;
  theme?: Theme;
  pageType?: PageType;
  className?: string;
  cta?: {
    label: string;
    href: string;
  };
}


const themeClasses: Record<
  Theme,
  {
    backgroundImage: string;
    overlay: string;
    accentText: string;
  }
> = {
  amber: {
    backgroundImage: "bg-[url('/image.png')]",
    overlay: "bg-gradient-to-br from-amber-900/80 via-orange-900/70 to-amber-800/80",
    accentText: "text-amber-50",
  },
  emerald: {
    backgroundImage: "bg-[url('/image.png')]",
    overlay: "bg-gradient-to-br from-emerald-900/80  via-teal-900/70 to-emerald-800/80",
    accentText: "text-emerald-50",
  },
  indigo: {
    backgroundImage: "bg-[url('/image.png')]",
    overlay: "bg-gradient-to-br from-emerald-900/80  via-teal-900/70 to-emerald-800/80",
    accentText: "text-indigo-50",
  },
  slate: {
    backgroundImage: "bg-[url('/image.png')]",
    overlay: "bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80",
    accentText: "text-slate-100",
  },
};

export default function IslamicHeader({
  title,
  subtitle,
  alignment = "center",
  theme,
  pageType = "default",
  className = "",
  cta,
}: IslamicHeaderProps) {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  // Get defaults based on page type using useMemo for optimization
  const pageDefaults = useMemo(() => {
    const defaults = {
      courses: {
        title: t('header.courses.title'),
        subtitle: t('header.courses.subtitle'),
        theme: "amber" as Theme,
      },
      articles: {
        title: t('header.articles.title'),
        subtitle: t('header.articles.subtitle'),
        theme: "emerald" as Theme,
      },
      blogs: {
        title: t('header.blogs.title'),
        subtitle: t('header.blogs.subtitle'),
        theme: "indigo" as Theme,
      },
      events: {
        title: t('header.events.title'),
        subtitle: t('header.events.subtitle'),
        theme: "amber" as Theme,
      },
      books: {
        title: t('header.books.title'),
        subtitle: t('header.books.subtitle'),
        theme: "emerald" as Theme,
      },
      authors: {
        title: t('header.authors.title'),
        subtitle: t('header.authors.subtitle'),
        theme: "indigo" as Theme,
      },
      awlayaa: {
        title: t('header.awlayaa.title'),
        subtitle: t('header.awlayaa.subtitle'),
        theme: "slate" as Theme,
      },
      tasawwuf: {
        title: t('header.tasawwuf.title'),
        subtitle: t('header.tasawwuf.subtitle'),
        theme: "slate" as Theme,
      },
      gallery: {
        title: t('header.gallery.title'),
        subtitle: t('header.gallery.subtitle'),
        theme: "amber" as Theme,
      },
      about: {
        title: t('header.about.title'),
        subtitle: t('header.about.subtitle'),
        theme: "emerald" as Theme,
      },
      contact: {
        title: t('header.contact.title'),
        subtitle: t('header.contact.subtitle'),
        theme: "indigo" as Theme,
      },
      donation: {
        title: t('header.donation.title'),
        subtitle: t('header.donation.subtitle'),
        theme: "amber" as Theme,
      },
      registration: {
        title: t('header.registration.title'),
        subtitle: t('header.registration.subtitle'),
        theme: "emerald" as Theme,
      },
      "graduated-students": {
        title: t('header.graduatedStudents.title'),
        subtitle: t('header.graduatedStudents.subtitle'),
        theme: "indigo" as Theme,
      },
      iftah: {
        title: t('header.iftah.title'),
        subtitle: t('header.iftah.subtitle'),
        theme: "slate" as Theme,
      },
      default: {
        title: t('header.default.title'),
        subtitle: t('header.default.subtitle'),
        theme: "amber" as Theme,
      },
    };
    
    return defaults[pageType] || defaults.default;
  }, [pageType, t]);
  
  // Use provided props or fall back to page defaults
  const finalTitle = title || pageDefaults.title;
  const finalSubtitle = subtitle || pageDefaults.subtitle;
  const finalTheme = theme || pageDefaults.theme;
  
  const themeCfg = themeClasses[finalTheme];
  const alignmentClasses =
    alignment === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <section
      className={`relative overflow-hidden ${themeCfg.backgroundImage} bg-cover bg-center bg-no-repeat pt-32 pb-8 px-6 sm:pt-36 sm:pb-12 mb-8 ${className}`}
    >
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${themeCfg.overlay}`}></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl  px-4 sm:px-6">
        <div className={`flex flex-col gap-4 mt-10 sm:mt-20 ${alignmentClasses}`}>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
              {finalTitle}
            </h1>
            {finalSubtitle ? (
              <p
                className={`max-w-3xl text-base font-medium sm:text-lg ${alignment === "center" ? "text-center" : "text-left"} ${themeCfg.accentText} opacity-90`}
              >
                {finalSubtitle}
              </p>
            ) : null}
          </div>

          {cta ? (
            <div
              className={
                alignment === "center"
                  ? "flex justify-center"
                  : "flex justify-start"
              }
            >
              <Link
                href={cta.href}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                {cta.label}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

