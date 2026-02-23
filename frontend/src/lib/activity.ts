import { type Activity, DAILY_SCHEDULE } from "@/constants/activity";

/**
 * Returns the current activity based on the time of day.
 * Handles midnight-crossing slots (e.g., 19:00-06:00).
 */
export const getCurrentActivity = (now: Date = new Date()): Activity => {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      hour: "numeric",
      hour12: false,
    }).format(now),
  );

  for (const slot of DAILY_SCHEDULE) {
    if (slot.startHour < slot.endHour) {
      if (hour >= slot.startHour && hour < slot.endHour) {
        return slot.activity;
      }
    } else {
      // Midnight-crossing slot (e.g., 19:00 - 06:00)
      if (hour >= slot.startHour || hour < slot.endHour) {
        return slot.activity;
      }
    }
  }

  throw new Error(
    "Could not determine activity for the current time. The schedule may be incomplete.",
  );
};
