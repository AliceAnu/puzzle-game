"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function UserScores() {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<any[]>([]);

  /* -----------------------------
     ✅ Detect Logged-in User
  ----------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  /* -----------------------------
     ✅ Fetch Scores Safely
  ----------------------------- */
  useEffect(() => {
    async function fetchScores() {
      try {
        // ✅ FIX: Stop if user not ready
        if (!user) return;

        const res = await fetch(`/api/scores?email=${user.email}`);

        if (!res.ok) {
          throw new Error("Failed to fetch scores");
        }

        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error("Error fetching scores:", err);
      }
    }

    fetchScores();
  }, [user]);

  return (
    <div>
      <h2>User Scores</h2>

      {scores.length === 0 && <p>No scores yet.</p>}

      {scores.map((s) => (
        <p key={s.id}>
          {s.date} → ⭐ {s.score}
        </p>
      ))}
    </div>
  );
}
