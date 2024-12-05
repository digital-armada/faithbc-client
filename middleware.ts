import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
export async function middleware(req: NextRequest) {
  const session = await auth();
  const nextUrl = req.nextUrl;

  // Early return if no session
  if (!session?.user) {
    if (nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }

  // User state checks
  const { blocked, confirmed } = session.user;

  // Handle different user states
  if (blocked) {
    return NextResponse.redirect(new URL("/blocked", req.url));
  }

  if (!confirmed) {
    return NextResponse.redirect(new URL("/confirmation/newrequest", req.url));
  }

  // If user is logged in and all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
