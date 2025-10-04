import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Authentication is now handled in dashboard layout at server component level
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
