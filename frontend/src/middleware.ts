import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

const CLAIM_TOKEN_COOKIE = "ClaimToken";

/**
 * Next.js middleware for ClaimToken cookie management.
 *
 * Generates a new ClaimToken if no cookie exists.
 * The cookie is httpOnly for security (XSS protection).
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const existingToken = request.cookies.get(CLAIM_TOKEN_COOKIE)?.value;

  if (!existingToken) {
    response.cookies.set(CLAIM_TOKEN_COOKIE, uuidv4(), {
      httpOnly: true,
      secure: false, // MVP http environment
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
