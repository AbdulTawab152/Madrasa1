"use client";

import { memo, useMemo } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface PaginationControlsProps {
  page: number;
  totalPages: number | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  isBusy?: boolean;
  className?: string;
}

function clampPage(value: number, total: number) {
  if (!Number.isFinite(value)) return 1;
  if (total <= 0) return Math.max(1, Math.floor(value));
  return Math.min(Math.max(1, Math.floor(value)), total);
}

const PaginationControls = memo(function PaginationControls({
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  isBusy = false,
  className = "",
}: PaginationControlsProps) {
  const { t: tRaw, i18n } = useTranslation("common", { useSuspense: false });
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === "string" ? result : key;
  };
  // Always RTL since website only has RTL languages
  const isRTL = true;
  const safeTotal = useMemo(() => {
    if (typeof totalPages === "number" && totalPages > 0) {
      return Math.floor(totalPages);
    }
    return hasNextPage ? page + 1 : page;
  }, [page, totalPages, hasNextPage]);

  const pages = useMemo(() => {
    const maxButtons = 5;
    const current = clampPage(page, safeTotal);
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(1, current - half);
    const end = Math.min(safeTotal, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    const items: number[] = [];
    for (let i = start; i <= end; i += 1) {
      items.push(i);
    }
    return items;
  }, [page, safeTotal]);

  const handlePageChange = (target: number) => {
    if (isBusy) return;
    const next = clampPage(target, safeTotal);
    if (next === page) return;
    onPageChange(next);
  };

  return (
    <nav
      className={`flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center ${className}`.trim()}
      aria-label="Pagination"
    >
      <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
        <button
          type="button"
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPrevPage || isBusy}
          className="inline-flex items-center gap-2 rounded-full border border-primary-200/60 bg-white/80 px-4 py-2 text-sm font-medium text-primary-700 transition-all hover:shadow-sm hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={t('pagination.previous')}
        >
          {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {t('pagination.previous')}
        </button>
        <button
          type="button"
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage || isBusy}
          className="inline-flex items-center gap-2 rounded-full border border-primary-200/60 bg-white/80 px-4 py-2 text-sm font-medium text-primary-700 transition-all hover:shadow-sm hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={t('pagination.next')}
        >
          {t('pagination.next')}
          {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {pages[0] > 1 && (
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={isBusy}
            className="rounded-full border border-transparent px-3 py-1 text-sm font-semibold text-primary-600 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            1
          </button>
        )}
        {pages[0] > 2 && <span className="px-1 text-primary-400">…</span>}
        {pages.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handlePageChange(item)}
            disabled={isBusy}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
              item === page
                ? "bg-primary-600 text-white shadow-sm"
                : "text-primary-700 hover:bg-primary-50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {item}
          </button>
        ))}
        {pages[pages.length - 1] < safeTotal - 1 && (
          <span className="px-1 text-primary-400">…</span>
        )}
        {pages[pages.length - 1] < safeTotal && (
          <button
            type="button"
            onClick={() => handlePageChange(safeTotal)}
            disabled={isBusy}
            className="rounded-full border border-transparent px-3 py-1 text-sm font-semibold text-primary-600 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {safeTotal}
          </button>
        )}
      </div>

      <div className="text-sm text-primary-600">
        {t('pagination.page')} {Math.min(page, safeTotal)}
        {typeof totalPages === "number" && totalPages > 0 ? ` ${t('pagination.of')} ${safeTotal}` : ""}
      </div>
    </nav>
  );
});

export default PaginationControls;
