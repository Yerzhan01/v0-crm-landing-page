import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/webhook") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/classic") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/kaspi")
  ) {
    return NextResponse.next()
  }

  // Check auth for protected routes
  if (pathname.startsWith("/dashboard")) {
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        const redirectUrl = new URL("/auth/login", request.url)
        redirectUrl.searchParams.set("redirect", pathname)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error("Middleware auth error:", error)
      // In case of error, let it pass - layout will check again
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
