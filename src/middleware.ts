import { NextResponse, type NextRequest } from "next/server";

/**
 * Lightweight, edge-safe gate: redirects unauthenticated users away from
 * protected areas by checking for the Auth.js session cookie. Fine-grained
 * role checks (e.g. ADMIN-only) live in the respective server layouts.
 */
const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

export function middleware(req: NextRequest) {
  const hasSession = SESSION_COOKIES.some((c) => req.cookies.has(c));
  if (!hasSession) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
