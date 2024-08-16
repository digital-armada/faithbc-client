import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/auth";
import {
  // DEFAULT_LOGIN_REDIRECT,
  // apiAuthPrefix,
  // authRoutes,
  // publicRoutes,
  dashPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // const isDashboardRoute = nextUrl.pathname.startsWith(dashPrefix);
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  console.log("isDashboardRoute", isDashboardRoute);
  //
  //   if (isDashboardRoute) {
  //     if (isLoggedIn) {
  //       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //     }
  //     return null;
  //   }
  //
  if (!isLoggedIn && isDashboardRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  // return null;
});
// const reqUrl = new URL(req.url);
// if (!req.auth && reqUrl?.pathname == "/dashboard") {
//   return NextResponse.redirect(
//     new URL(
//       `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
//         reqUrl?.pathname,
//       )}`,
//       req.url,
//     ),
//   );
// }

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
