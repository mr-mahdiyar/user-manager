import { NextResponse, NextRequest } from "next/server";
import { isSessionValid, isUserLoggedIn, logout, refresh } from "./services/auth";
import { isHomePage, isPathMatchedWithAuthPaths, isPathMatchedWithProtectedPaths } from "./utils/path";

export async function middleware(request: NextRequest) {
  const isUserLoggedInBefore = await isUserLoggedIn();
  const currentPath = request.nextUrl.pathname;
  const stillValid = await isSessionValid();

  switch (isUserLoggedInBefore) {
    case true: {
      if (!stillValid && (isPathMatchedWithProtectedPaths(currentPath) || isHomePage(currentPath))) {
        await logout();
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      if (isPathMatchedWithAuthPaths(currentPath) || isHomePage(currentPath)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return;
    }

    case false: {
      if (isPathMatchedWithProtectedPaths(currentPath) || isHomePage(currentPath))
        return NextResponse.redirect(new URL("/auth/login", request.url));
      return;
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/"],
};
