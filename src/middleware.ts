import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper to decode JWT payload safely in Next.js Edge Middleware
function decodeJWTPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(payloadBase64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonPayload);
    // Check expiry
    if (parsed.exp && Date.now() >= parsed.exp * 1000) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected route patterns
  const isStudentRoute = pathname.startsWith("/student");
  const isAcademicianRoute = pathname.startsWith("/academician");
  const isIndustryRoute = pathname.startsWith("/industry");

  if (!isStudentRoute && !isAcademicianRoute && !isIndustryRoute) {
    return NextResponse.next();
  }

  const tokenCookie = request.cookies.get("ayush_token");
  const token = tokenCookie?.value;

  // 1. If not authenticated, redirect to login with return redirect param
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = decodeJWTPayload(token);
  if (!payload || !payload.role) {
    // Invalid or expired token
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("ayush_token");
    return response;
  }

  // 2. Strict Role-Based Access Control (RBAC)
  if (isStudentRoute && payload.role !== "student") {
    const target = payload.role === "academician" ? "/academician" : "/industry";
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (isAcademicianRoute && payload.role !== "academician") {
    const target = payload.role === "student" ? "/student" : "/industry";
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (isIndustryRoute && payload.role !== "industry") {
    const target = payload.role === "student" ? "/student" : "/academician";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/academician/:path*",
    "/industry/:path*",
  ],
};
