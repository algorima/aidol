const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validates that a resource ID is a well-formed UUID.
 * Prevents client-side path traversal when IDs are interpolated into URLs.
 */
export function assertResourceId(id: string | number): void {
  if (typeof id !== "string" || !UUID_RE.test(id)) {
    throw new Error(`Invalid resource ID: ${String(id)}`);
  }
}
