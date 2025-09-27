import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="rounded-2xl border border-primary-100/60 bg-white/95 shadow-soft">
      <div className="px-6 py-10 md:px-10 md:py-12">
        <div className="space-y-4 max-w-3xl">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.35em] text-primary-600">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-primary-900">
            {title}
          </h1>
          {description && (
            <p className="text-primary-600 text-base md:text-lg leading-relaxed">
              {description}
            </p>
          )}
          {children && <div className="pt-2">{children}</div>}
        </div>
      </div>
    </section>
  );
}
