import { openDB } from "idb";

const DB_NAME = "PuzzleDB";
const STORE_NAME = "progress";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function saveProgress(puzzleId: string, answer: string) {
  const db = await getDB();
  await db.put(STORE_NAME, answer, puzzleId);
}

export async function getProgress(puzzleId: string): Promise<string | null> {
  const db = await getDB();
  return (await db.get(STORE_NAME, puzzleId)) || null;
}

export async function clearProgress() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}