import { openDB } from "idb";

export type PuzzleProgress = {
  date: string;
  answer: string;
  secondsSpent: number;
  hintsUsed: number;
};

const DB_NAME = "DailyPuzzleDB";
const STORE = "progress";

async function getDB() {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("dailyActivity")) {
        db.createObjectStore("dailyActivity", { keyPath: "date" });
      }

      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "date" });
      }
    },
  });
}

/* ✅ Save Progress */
export async function saveProgress(data: PuzzleProgress) {
  const db = await getDB();
  await db.put(STORE, data);
}

/* ✅ Load Progress */
export async function loadProgress(date: string) {
  const db = await getDB();
  return await db.get(STORE, date);
}

/* ✅ Clear Progress After Completion */
export async function clearProgress(date: string) {
  const db = await getDB();
  await db.delete(STORE, date);
}
