import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n, LanguageType, Locale } from "./i18n.config";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Pages, Routes, UserRole } from "./constants/enums";

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

export default withAuth(
  async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = !i18n.locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameIsMissingLocale && !pathname.startsWith("/api")) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url)
      );
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    const currentLocale = request.url.split("/")[3] as Locale;
    const isAuth = await getToken({ req: request });
    const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`);
    const prodectedRoutes = [Routes.PROFILE, Routes.ADMIN];
    const isProduectRoute = prodectedRoutes.some((route) =>
      pathname.startsWith(`/${currentLocale}/${route}`)
    );
    const role = isAuth?.role;
    if (!isAuth && isProduectRoute) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.AUTH}/${Pages.LOGIN}`, request.url)
      );
    }
    // if user logged in and try to access auth routes
    if (isAuth && isAuthPage) {
      if (role === UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.ADMIN}`, request.url)
        );
      }
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
      );
    }

    // if user logged in and he isn't admin and try to access admin routes
    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)) {
      if (role !== UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
        );
      }
    }

    return response;
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  // Matcher ignoring `/next/`, `/api/`, ..etc
  matcher: [
    "/((?!.api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

/**
 *   matcher: ["/((?!_next|api|favicon.ico|robots.txt).*)"],
 */
