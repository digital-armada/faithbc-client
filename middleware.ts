import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
import { AuthService } from "./src/infrastructure/services/authentication.service";

const authService = new AuthService();

export async function middleware(request: NextRequest) {
  const isAuthenticated = await authService.isAuthenticated();
  const protectedPaths = ["/dashboard"];

  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (request.nextUrl.pathname === "/signin" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();

  //   const session = await auth();
  //   const nextUrl = req.nextUrl;
  //
  //   // Early return if no session
  //   if (!session?.user) {
  //     if (nextUrl.pathname.startsWith("/dashboard")) {
  //       return NextResponse.redirect(new URL("/signin", req.url));
  //     }
  //     return NextResponse.next();
  //   }
  //
  //   // User state checks
  //   const { blocked, confirmed } = session.user;
  //
  //   // Handle different user states
  //   if (blocked) {
  //     return NextResponse.redirect(new URL("/blocked", req.url));
  //   }
  //
  //   if (!confirmed) {
  //     return NextResponse.redirect(new URL("/confirmation/newrequest", req.url));
  //   }
  //
  //   // If user is logged in and all checks pass
  //   return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
