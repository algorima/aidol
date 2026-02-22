const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;
const DATA_URL_PATTERN = /^data:/i;
const BLOB_URL_PATTERN = /^blob:/i;

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function ensureLeadingSlash(value: string): string {
  return value.startsWith("/") ? value : `/${value}`;
}

export function resolveImageUrl(url: string): string {
  const value = url.trim();
  if (
    !value ||
    ABSOLUTE_URL_PATTERN.test(value) ||
    DATA_URL_PATTERN.test(value) ||
    BLOB_URL_PATTERN.test(value)
  ) {
    return value;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    return value;
  }

  return `${trimTrailingSlash(apiBaseUrl)}${ensureLeadingSlash(value)}`;
}
