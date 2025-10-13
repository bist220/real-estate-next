import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './app/lib/auth';

const PUBLIC_PATHS = ['/', '/login', '/register', '/api/auth', '/api/properties', '/property/', '/api/upload'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return NextResponse.next();

  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));
  console.log(`===>>> middleware :: token ::  ${token}`)
  try {
    const payload = await verifyToken(token);
    if(!payload) {
      throw new Error("Invalid Token");
    }
    // await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// export const config = {
//   matcher: ['/property/new', '/api/properties/:path*', '/logout'],
// };

export const config = {
  matcher: [
    '/property/new',
    '/property/edit/:path*',
    '/api/properties/:path*',
    '/api/upload',
    '/logout',
  ],
};

