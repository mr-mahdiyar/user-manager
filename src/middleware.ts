import { NextResponse, NextRequest } from "next/server";
import { isUserLoggedIn } from "./services/auth";
import {
  isHomePage,
  isPathMatchedWithAuthPaths,
  isPathMatchedWithProtectedPaths,
} from "./utils/path";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  console.log("here is token: ", cookieStore.get("token")?.value);

  const isUserLoggedInBefore = await isUserLoggedIn();
  const currentPath = request.nextUrl.pathname;

  switch (isUserLoggedInBefore) {
    case true: {
      if (isPathMatchedWithAuthPaths(currentPath) || isHomePage(currentPath))
        return NextResponse.redirect(new URL("/dashboard", request.url));
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
