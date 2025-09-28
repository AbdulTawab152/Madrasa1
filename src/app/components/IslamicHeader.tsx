"use client";

import Link from "next/link";
import React from "react";

type Alignment = "center" | "left";
type Theme = "amber" | "emerald" | "indigo" | "slate";
type PageType = "courses" | "articles" | "blogs" | "events" | "books" | "authors" | "awlayaa" | "tasawwuf" | "gallery" | "about" | "contact" | "donation" | "registration" | "graduated-students" | "iftah" | "default";

export interface IslamicHeaderProps {
  title: string;
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

const getPageDefaults = (pageType: PageType) => {
  const defaults = {
    courses: {
      title: "Islamic Courses",
      subtitle: "Explore our comprehensive Islamic education programs and courses",
      theme: "amber" as Theme,
    },
    articles: {
      title: "Islamic Articles",
      subtitle: "Read insightful articles on Islamic teachings and contemporary issues",
      theme: "emerald" as Theme,
    },
    blogs: {
      title: "Islamic Blogs",
      subtitle: "Stay updated with our latest Islamic blog posts and insights",
      theme: "indigo" as Theme,
    },
    events: {
      title: "Islamic Events",
      subtitle: "Join our upcoming Islamic events, seminars, and gatherings",
      theme: "amber" as Theme,
    },
    books: {
      title: "Islamic Books",
      subtitle: "Discover our collection of Islamic books and literature",
      theme: "emerald" as Theme,
    },
    authors: {
      title: "Islamic Authors",
      subtitle: "Meet our esteemed Islamic scholars and authors",
      theme: "indigo" as Theme,
    },
    awlayaa: {
      title: "Awliya Allah",
      subtitle: "Learn about the lives and teachings of the Friends of Allah",
      theme: "slate" as Theme,
    },
    tasawwuf: {
      title: "Tasawwuf",
      subtitle: "Explore the spiritual dimensions of Islamic practice",
      theme: "slate" as Theme,
    },
    gallery: {
      title: "Gallery",
      subtitle: "View photos from our Islamic events and activities",
      theme: "amber" as Theme,
    },
    about: {
      title: "About Us",
      subtitle: "Learn about our mission and vision in Islamic education",
      theme: "emerald" as Theme,
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with us for any inquiries or support",
      theme: "indigo" as Theme,
    },
    donation: {
      title: "Support Our Mission",
      subtitle: "Help us continue spreading Islamic knowledge and education",
      theme: "amber" as Theme,
    },
    registration: {
      title: "Registration",
      subtitle: "Join our Islamic courses and educational programs",
      theme: "emerald" as Theme,
    },
    "graduated-students": {
      title: "Graduated Students",
      subtitle: "Celebrating our successful graduates and their achievements",
      theme: "indigo" as Theme,
    },
    iftah: {
      title: "Iftah",
      subtitle: "Explore our Iftah program and spiritual guidance",
      theme: "slate" as Theme,
    },
    default: {
      title: "Islamic Education",
      subtitle: "Welcome to our comprehensive Islamic learning platform",
      theme: "amber" as Theme,
    },
  };
  
  return defaults[pageType] || defaults.default;
};

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
    overlay: "bg-gradient-to-br from-emerald-900/80 via-teal-900/70 to-emerald-800/80",
    accentText: "text-emerald-50",
  },
  indigo: {
    backgroundImage: "bg-[url('/image.png')]",
    overlay: "bg-gradient-to-br from-emerald-900/80 via-teal-900/70 to-emerald-800/80",
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
  // Get defaults based on page type
  const pageDefaults = getPageDefaults(pageType);
  
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`flex flex-col gap-4 ${alignmentClasses}`}>
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

