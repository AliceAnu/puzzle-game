"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function UserScores() {
  const { user, loading } = useAuth();

  const [scores, setScores] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Wait until auth finishes loading
    if (loading) return;

    // ✅ If user is not logged in, stop
    if (!user?.email) return;

    async function fetchScores() {
      try {
        const res = await fetch(`/api/scores?email=${user.email}`);

        if (!res.ok) {
          throw new Error("Failed to fetch scores");
        }

        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error(err);
        setError("Could not load scores");
      }
    }

    fetchScores();
  }, [user, loading]);

  // ✅ Loading state
  if (loading) {
    return <p>Loading user...</p>;
  }

  // ✅ Guest user state
  if (!user) {
    return <p>Please login to see your scores.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">
        Welcome, {user.displayName || user.email}
      </h2>

      <h3 className="text-lg font-semibold">Your Daily Scores</h3>

      {error && <p className="text-red-500">{error}</p>}

      {scores.length === 0 ? (
        <p>No scores found yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {scores.map((score) => (
            <li key={score.id} className="border p-2 rounded">
              📅 {score.date} | ⭐ Score: {score.score} | ⏱ Time:{" "}
              {score.timeTaken}s
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
