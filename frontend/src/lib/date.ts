export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export interface RelativeTime {
  key: string;
  params?: Record<string, string | number>;
}

/**
 * Returns an i18n key + params for relative time display.
 * - < 1 min → chat.time.justNow
 * - < 60 min → chat.time.minutesAgo { count }
 * - < 24 hours → chat.time.hoursAgo { count }
 * - >= 24 hours → chat.time.absolute { time, ampm }
 */
export const getRelativeTime = (
  dateStr: string,
  now: Date = new Date(),
): RelativeTime | null => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;

  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) return { key: "chat.time.justNow" };

  const diffMin = Math.floor(diffMs / (1000 * 60));
  if (diffMin < 1) return { key: "chat.time.justNow" };
  if (diffMin < 60)
    return { key: "chat.time.minutesAgo", params: { count: diffMin } };

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24)
    return { key: "chat.time.hoursAgo", params: { count: diffHour } };

  const hours = date.getHours();
  const ampm = hours < 12 ? "am" : "pm";
  const displayHour = hours % 12 || 12;
  const minute = String(date.getMinutes()).padStart(2, "0");

  return {
    key: "chat.time.absolute",
    params: { time: `${displayHour}:${minute}`, ampm },
  };
};

export const getDaysSince = (dateStr: string) => {
  const created = new Date(dateStr);
  if (isNaN(created.getTime())) return 0;
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
};
