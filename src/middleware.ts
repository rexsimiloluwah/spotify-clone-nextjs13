import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const isAuth = !!token;

  if (!isAuth && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export default middleware;

// The middleware runs when any of these paths is accessed
export const config = {
  matcher: ["/", "/playlist/:path*", "/search"],
};
