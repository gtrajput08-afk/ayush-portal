import { NextRequest } from "next/server";
import { verifyToken, JWTPayload } from "./jwt";

export function getAuthUser(request: NextRequest): JWTPayload | null {
  // 1. Check HttpOnly cookie
  const tokenCookie = request.cookies.get("ayush_token");
  if (tokenCookie?.value) {
    const payload = verifyToken(tokenCookie.value);
    if (payload) return payload;
  }

  // 2. Check Authorization Bearer header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (payload) return payload;
  }

  return null;
}
