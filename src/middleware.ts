import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n, LanguageType } from "./i18n.config";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  let locale = i18n.defaultLocale;

  try {
    locale = matchLocale(
      languages,
      locales,
      i18n.defaultLocale
    ) as LanguageType;
  } catch {
    locale = i18n.defaultLocale;
  }

  return locale;
}

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = !i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameIsMissingLocale && !pathname.startsWith("/api")) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Matcher ignoring `/next/`, `/api/`, ..etc
  matcher: [
    "/((?!.api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

/**
 *   matcher: ["/((?!_next|api|favicon.ico|robots.txt).*)"],
 */
