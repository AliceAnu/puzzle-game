import { openDB } from "idb";

export type DailyActivity = {
  date: string;
  solved: boolean;
  score: number;
  timeTaken: number;
  difficulty: number;
  synced: boolean;
};

const DB_NAME = "DailyPuzzleDB";
const STORE_NAME = "dailyActivity";
const DB_VERSION = 2; // ✅ Keep version stable

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // ✅ Activity Store
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "date" });
      }

      // ✅ Progress Store (needed)
      if (!db.objectStoreNames.contains("progress")) {
        db.createObjectStore("progress", { keyPath: "date" });
      }
    },
  });
}

/* ✅ Save Activity */
export async function saveDailyActivity(entry: DailyActivity) {
  const db = await getDB();
  await db.put(STORE_NAME, entry);
}

/* ✅ Get All Activity */
export async function getAllActivity(): Promise<DailyActivity[]> {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
}

/* ✅ Get Single Day Activity */
export async function getActivityByDate(date: string) {
  const db = await getDB();
  return await db.get(STORE_NAME, date);
}

/* ✅ Clear All Activity (optional for testing) */
export async function clearAllActivity() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}

export async function getDailyActivity(): Promise<DailyActivity[]> {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
}
