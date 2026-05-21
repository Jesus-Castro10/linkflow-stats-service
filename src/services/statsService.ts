import { saveVisit, getVisits } from "../repositories/statsRepository";
import { log } from "../utils/logger";

const RECENT_LIMIT = 10;

export async function recordVisit(
  code: string,
  timestamp: string,
): Promise<void> {
  await saveVisit(code, timestamp);
  log("INFO", "Visit stored", { code });
}

export async function getStats(code: string): Promise<{
  code: string;
  totalVisits: number;
  recentVisits: string[];
  todayVisits: number;
  weekVisits: number;
  monthVisits: number;
}> {
  const visits = await getVisits(code);
  const now = new Date();
  const todayPrefix = now.toISOString().slice(0, 10);
  const weekAgo = new Date(
    now.getTime() - 7 * 24 * 60 * 60 * 1000,
  ).toISOString();
  const monthAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000,
  ).toISOString();

  return {
    code,
    totalVisits: visits.length,
    recentVisits: visits.slice(0, RECENT_LIMIT),
    todayVisits: visits.filter((ts) => ts.startsWith(todayPrefix)).length,
    weekVisits: visits.filter((ts) => ts >= weekAgo).length,
    monthVisits: visits.filter((ts) => ts >= monthAgo).length,
  };
}
