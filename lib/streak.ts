import dayjs from "dayjs";
import { DailyActivity } from "@/lib/db/activityDB";

export function calculateStreak(
  activityMap: Record<string, DailyActivity>
) {
  let streak = 0;
  let current = dayjs();

  while (
    activityMap[current.format("YYYY-MM-DD")]?.solved
  ) {
    streak++;
    current = current.subtract(1, "day");
  }

  return streak;
}
