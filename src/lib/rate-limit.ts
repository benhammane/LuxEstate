import { NextResponse } from "next/server";

/**
 * Minimal in-memory sliding-window rate limiter. Good enough for the demo and
 * single-instance deployments; swap for Upstash/Redis in production.
 */
const WINDOW_MS = 60_000;
const buckets = new Map<string, number[]>();

function clientKey(request: Request, scope: string) {
  const fwd = request.headers.get("x-forwarded-for");
  const ip = fwd?.split(",")[0]?.trim() ?? "local";
  return `${scope}:${ip}`;
}

/**
 * Returns a 429 response when the limit is exceeded, otherwise `null`.
 * @param max requests allowed per 60s window
 */
export function rateLimit(
  request: Request,
  scope: string,
  max = 20,
): NextResponse | null {
  const key = clientKey(request, scope);
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  buckets.set(key, hits);

  if (hits.length > max) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans un instant." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }
  return null;
}
