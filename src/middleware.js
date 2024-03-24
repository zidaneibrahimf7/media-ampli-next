import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req, event) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/accounts', req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
      error: '/login',
      signOut: '/'
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  matcher: [
    '/accounts',
    '/pre-account',
    '/device',
    '/platform',
    // '/analytics',
    // '/avatarInstance',
    // '/bulk',
    // '/history',
    // '/instances',
    // '/report',
    // '/send-message',
    // '/users',
    '/login'
  ]
}