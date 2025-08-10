import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Allow public access to login and register without token
  if (url.pathname === "/login" || url.pathname === "/register") {
    // If user is already logged in, redirect to homepage
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // For all other routes: require authentication
  if (!token) {
    // Redirect unauthenticated users to sign-in
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to proceed normally if authenticated
  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except _next, api, static files, etc
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
