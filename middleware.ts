import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  console.log("Middleware running for path:", req.nextUrl.pathname);
  const session = await auth();
  console.log("middleAuth", session);

  if (!session) {
    console.log("No session found in middleware");
  }

  const nextUrl = req.nextUrl;
  const isLoggedIn =
    !!session?.user &&
    session.user.confirmed === true &&
    session.user.blocked !== true;
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute && !isLoggedIn) {
    console.log("Redirecting to signin page");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (session?.user?.blocked) {
    console.log("User is blocked, redirecting to blocked page");
    return NextResponse.redirect(new URL("/blocked", req.url));
  }

  if (session?.user && !session.user.confirmed) {
    console.log("User is not confirmed, redirecting to confirmation page");
    return NextResponse.redirect(new URL("/confirmation/newrequest", req.url));
  }

  console.log("Proceeding to next middleware/page");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
