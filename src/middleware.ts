import { NextResponse, NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

const PROTECTED_PATHS = [
  "/dashboard",
  "/users",
  "/earning",
  "/subscription",
  "/videos/playlist",
  "/videos/upload",
  "/community",
  "/message",
  "/settings",
  "/profile",
  "/privacy-policy",
  "/terms-conditions",
  "/about-us",
]

const AUTH_PATH = /^\/auth(\/.*)?$/

interface DecodedUser {
  _id: string
  email: string
  role: string
  iat: number
  exp: number
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const token = request.cookies.get("grandSportsAccessToken")?.value

  let isAuthenticated = false
  let decodedUser: DecodedUser | null = null

  if (token) {
    try {
      decodedUser = jwtDecode<DecodedUser>(token)
      const currentTime = Math.floor(Date.now() / 1000)
      if (decodedUser.exp > currentTime && decodedUser.role === "admin") {
        isAuthenticated = true
      }
    } catch {
      // invalid token
    }
  }

  // Check if current pathname is protected
  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname === path || pathname.startsWith(path + "/")
  )

  if (isProtected && !isAuthenticated) {
    // Redirect to login with redirect param
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set(
      "redirect",
      pathname + (searchParams.toString() ? `?${searchParams}` : "")
    )
    return NextResponse.redirect(loginUrl)
  }

  // Prevent logged-in admins from accessing /auth routes
  if (AUTH_PATH.test(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth/:path*", ...PROTECTED_PATHS.map((path) => path + "/:path*"), ...PROTECTED_PATHS],
}
