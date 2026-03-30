import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Public routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // just forward request
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
