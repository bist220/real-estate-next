import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './app/lib/auth'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { DEFAULT_LOCALES, LOCALES } from './app/types/LocaleType'

// Supported locales
// const locales = ['en-US', 'hi-IN', 'mr-IN']
const locales = LOCALES;
const defaultLocale = DEFAULT_LOCALES

// Locale matcher
function getLocale(request: NextRequest): string {
  const locale = request.cookies.get('NEXT_LOCALE')?.value || null;
  console.log(`===>>> middleware :: locale :: ${locale}`);
  if(locale) {
    console.log(`===>>> middleware :: locale :: ${locale}`);
    return match([locale], locales, defaultLocale)
  }

  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(languages, locales, defaultLocale)
}

// ------------------------------
// Route pattern definitions
// ------------------------------

// API routes — skip i18n
const PUBLIC_API_ROUTES: RegExp[] = [
  /^\/api\/auth/,
  /^\/api\/public/,
]

const PROTECTED_API_ROUTES: RegExp[] = [
  /^\/api\/properties\/[^/]+\/edit$/,
  /^\/api\/upload/,
]

// Non-API page routes — use i18n
const PUBLIC_PAGE_ROUTES: RegExp[] = [
  /^\/$/,                   // Home
  /^\/login$/,              // Login page
  /^\/register$/,           // Register page
]

const PROTECTED_PAGE_ROUTES: RegExp[] = [
  /^\/property\/new$/,
  /^\/property\/edit\/[^/]+$/, // e.g. /property/edit/123
  /^\/logout$/,
]

// Route match helpers
function matches(pathname: string, patterns: RegExp[]): boolean {
  return patterns.some((regex) => regex.test(pathname))
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAPI = pathname.startsWith('/api')

  // ---- API ROUTES ---- //
  if (isAPI) {
    if (matches(pathname, PUBLIC_API_ROUTES)) {
      return NextResponse.next() // allow public APIs
    }

    if (matches(pathname, PROTECTED_API_ROUTES)) {
      const token = req.cookies.get('token')?.value
      if (!token) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }

      try {
        const payload = await verifyToken(token)
        if (!payload) throw new Error('Invalid token')
        return NextResponse.next()
      } catch {
        return new NextResponse(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
      }
    }

    return NextResponse.next() // other APIs are treated as public by default
  }

  // ---- PAGE / NON-API ROUTES ---- //

  // Check if locale prefix exists
  const hasLocalePrefix = locales.some((loc) => pathname.startsWith(`/${loc}`))

  // Normalize path without locale (e.g. from `/en-US/property/new` → `/property/new`)
  const pathWithoutLocale = hasLocalePrefix
    ? pathname.replace(/^\/[a-zA-Z-]+/, '')
    : pathname

  // 1. Redirect to localized path if not already
  if (!hasLocalePrefix) {
    const locale = getLocale(req)
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(url)
  }

  const nextLocale = req.cookies.get('NEXT_LOCALE')?.value || null;
  console.log(`===>>> middleware :: nextLocale :: ${nextLocale}`);
  console.log(`===>>> middleware :: hasLocalePrefix :: ${hasLocalePrefix}`);
  if(nextLocale && hasLocalePrefix) {
    console.log(`===>>> middleware :: 2 nextLocale :: ${nextLocale}`);
    console.log(`===>>> middleware :: 2 hasLocalePrefix :: ${hasLocalePrefix}`);
    const currentLocale = locales.filter((loc) => pathname.startsWith(`/${loc}`));
    console.log(`===>>> middleware :: currentLocale[] :: ${JSON.stringify(currentLocale)}`);
    if(currentLocale.length>0 && nextLocale!==currentLocale[0]) {
      const url = req.nextUrl.clone()
      const newPathname = pathname.replace(currentLocale[0], nextLocale)
      url.pathname = newPathname;
      return NextResponse.redirect(url)
    }
  }

  // 2. Auth check if route is protected
  if (matches(pathWithoutLocale, PROTECTED_PAGE_ROUTES)) {
    const token = req.cookies.get('token')?.value
    const currentLocale = locales.find((loc) => pathname.startsWith(`/${loc}`)) ?? defaultLocale

    if (!token) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = `/${currentLocale}/login`
      loginUrl.searchParams.set('redirect', req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      const payload = await verifyToken(token)
      if (!payload) throw new Error('Invalid token')
      return NextResponse.next()
    } catch {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = `/${currentLocale}/login`
      loginUrl.searchParams.set('redirect', req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 3. If it's a public page, allow access (already localized)
  return NextResponse.next()
}

// ------------------------------
// Middleware matcher
// ------------------------------
// Only run middleware on:
// - All /api routes (for auth)
// - All page routes (for i18n and auth)
// - Avoid internal assets like /_next and static
export const config = {
  matcher: [
    // All API routes
    '/api/:path*',

    // All pages except Next.js internals
    '/((?!_next|static|favicon.ico|robots.txt).*)',
  ],
}
