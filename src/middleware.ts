import { fallbackLang, supportedLangs } from "@/i18n/settings";
import acceptLanguage from "accept-language";
import { type NextRequest, NextResponse } from "next/server";

import { COOKIE_NAME } from "@/i18n/settings";

acceptLanguage.languages(supportedLangs);

export const config = {
    // matcher: '/:lng*'
    matcher: [
        "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
    ],
};

export function middleware(req: NextRequest) {
    let lang: string | null = null;
    if (req.cookies.has(COOKIE_NAME))
        lang = acceptLanguage.get(req.cookies.get(COOKIE_NAME)?.value);
    if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
    if (!lang) lang = fallbackLang;

    // Redirect if lang in path is not supported
    if (
        !supportedLangs.some((loc) =>
            req.nextUrl.pathname.startsWith(`/${loc}`),
        ) &&
        !req.nextUrl.pathname.startsWith("/_next")
    ) {
        const newUrl = new URL(`/${lang}${req.nextUrl.pathname}`, req.url);
        // Copy search params from original URL
        req.nextUrl.searchParams.forEach((value, key) => {
            newUrl.searchParams.set(key, value);
        });
        return NextResponse.redirect(newUrl);
    }

    if (req.headers.has("referer")) {
        const refererUrl = new URL(req.headers.get("referer") || "");
        const lngInReferer = supportedLangs.find((l) =>
            refererUrl.pathname.startsWith(`/${l}`),
        );
        const response = NextResponse.next();
        if (lngInReferer) response.cookies.set(COOKIE_NAME, lngInReferer);
        return response;
    }

    return NextResponse.next();
}
