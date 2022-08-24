import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const ua = userAgent(req);
  if (ua.isBot) return NextResponse.next({ status: 400 });

  if (
    !req.nextUrl.pathname.startsWith("/enter") &&
    !req.cookies.get("carrotsession")
  )
    return NextResponse.redirect(new URL("/enter", req.url));
}

export const config = {
  matcher: "/:path*",
};
