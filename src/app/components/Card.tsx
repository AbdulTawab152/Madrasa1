import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const baseCardStyles =
  "group relative overflow-hidden rounded-3xl border border-primary-100/70 bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(15,23,42,0.55)] focus-within:-translate-y-1 focus-within:shadow-[0_28px_60px_-30px_rgba(15,23,42,0.55)]";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(baseCardStyles, className)} {...props} />
  )
);
Card.displayName = "Card";

interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  gradientOverlay?: boolean;
}

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, gradientOverlay = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-white/10 bg-slate-950/5",
        className
      )}
      {...props}
    >
      {children}
      {gradientOverlay ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/20 to-transparent" />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-primary-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
    </div>
  )
);
CardMedia.displayName = "CardMedia";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-full flex-col gap-5 p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-primary-100/70 pt-4",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export const CardEyebrow = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary-600",
        className
      )}
      {...props}
    />
  )
);
CardEyebrow.displayName = "CardEyebrow";

export const CardBadge = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm",
        className
      )}
      {...props}
    />
  )
);
CardBadge.displayName = "CardBadge";
