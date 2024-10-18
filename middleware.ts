import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Middleware running for path:", req.nextUrl.pathname);

  let token;
  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie:
        process.env.NEXTAUTH_URL?.startsWith("https://") ??
        !!process.env.VERCEL_URL,
    });
    console.log("Token retrieved in middleware:", token);
  } catch (error) {
    console.error("Error retrieving token:", error);
  }

  if (!token) {
    console.log("No token found in middleware");
  }

  const nextUrl = req.nextUrl;
  const isLoggedIn =
    !!token && token.confirmed === true && token.blocked !== true;
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  console.log("Is logged in:", isLoggedIn);
  console.log("Is dashboard route:", isDashboardRoute);

  if (isDashboardRoute && !isLoggedIn) {
    console.log("Redirecting to signin page");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (token?.blocked) {
    console.log("User is blocked, redirecting to blocked page");
    return NextResponse.redirect(new URL("/blocked", req.url));
  }

  if (token && !token.confirmed) {
    console.log("User is not confirmed, redirecting to confirmation page");
    return NextResponse.redirect(new URL("/confirmation/newrequest", req.url));
  }

  console.log("Proceeding to next middleware/page");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
