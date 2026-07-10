import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with correct precedence. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price in a compact, locale-aware way (EUR by default). */
export function formatPrice(
  value: number,
  opts: { currency?: string; compact?: boolean; locale?: string } = {},
) {
  const { currency = "EUR", compact = false, locale = "fr-FR" } = opts;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Format a number with locale grouping (e.g. surfaces, counts). */
export function formatNumber(value: number, locale = "fr-FR") {
  return new Intl.NumberFormat(locale).format(value);
}

/** Turn a title into a URL-safe slug. */
export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
