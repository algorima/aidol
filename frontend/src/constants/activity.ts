/**
 * Companion daily activity schedule
 * Matches group schedule for inbox activity status display
 */

export const ACTIVITIES = [
  "RESTING",
  "PRACTICING",
  "SHORT_BREAK",
  "RESTING_AT_HOME",
] as const;

export type Activity = (typeof ACTIVITIES)[number];

interface ScheduleSlot {
  startHour: number;
  endHour: number;
  activity: Activity;
}

export const DAILY_SCHEDULE: ScheduleSlot[] = [
  { startHour: 6, endHour: 12, activity: "RESTING" },
  { startHour: 12, endHour: 17, activity: "PRACTICING" },
  { startHour: 17, endHour: 19, activity: "SHORT_BREAK" },
  { startHour: 19, endHour: 6, activity: "RESTING_AT_HOME" },
];
