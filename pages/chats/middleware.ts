import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("chat only middleware");
}
