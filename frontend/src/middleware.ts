import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

const CLAIM_TOKEN_COOKIE = "ClaimToken";

/**
 * Next.js middleware for ClaimToken cookie management.
 *
 * - Generates a new ClaimToken if no cookie exists
 * - Migrates localStorage token via X-Migrate-ClaimToken header
 * - Sets httpOnly cookie for security
 * - Prepares for future SSR support
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const existingToken = request.cookies.get(CLAIM_TOKEN_COOKIE)?.value;

  if (!existingToken) {
    // Check for migration header (localStorage -> cookie migration)
    const migrateToken = request.headers.get("X-Migrate-ClaimToken");
    const newToken = migrateToken || uuidv4();

    response.cookies.set(CLAIM_TOKEN_COOKIE, newToken, {
      httpOnly: true,
      secure: false, // MVP http environment
      sameSite: "lax",
      path: "/",
      // No maxAge = session cookie (cleared when browser closes)
      // For persistent cookie, add: maxAge: 60 * 60 * 24 * 365 (1 year)
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  // Run middleware on all routes except static files and API routes
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
