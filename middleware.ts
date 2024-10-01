import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  // @ts-ignore
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Additional checks for user confirmation and blocking status
  //   if (token && isDashboardRoute) {
  //     const { blocked, confirmed } = token;
  //
  //     if (blocked) {
  //       return NextResponse.redirect(new URL("/blocked", req.url));
  //     }
  //
  //     if (!confirmed) {
  //       return NextResponse.redirect(
  //         new URL("/confirmation/newrequest", req.url),
  //       );
  //     }
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
