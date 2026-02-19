"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

import Heatmap from "@/app/components/Heatmap";

import { getAllActivity } from "@/lib/db/activityDB";
import dayjs from "dayjs";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  const [activity, setActivity] = useState<any>({});
  const [recentScores, setRecentScores] = useState<any[]>([]);

  const [streak, setStreak] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  /* -----------------------------
     ✅ Auth Check
  ----------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) window.location.href = "/";
      setUser(u);
    });

    return () => unsub();
  }, []);

  /* -----------------------------
     ✅ Load Activity from IndexedDB
  ----------------------------- */
  useEffect(() => {
    async function loadData() {
      const all = await getAllActivity();

      // Convert array → object for heatmap
      const map: any = {};
      all.forEach((entry) => {
        map[entry.date] = entry;
      });

      setActivity(map);

      // Recent scores (latest 5)
      const sorted = all.sort((a, b) =>
        b.date.localeCompare(a.date)
      );

      setRecentScores(sorted.slice(0, 5));

      // Stats
      setTotalSolved(all.length);
      setBestScore(Math.max(...all.map((x) => x.score), 0));

      // Streak calculation
      let streakCount = 0;
      let current = dayjs();

      while (true) {
        const key = current.format("YYYY-MM-DD");
        if (map[key]?.solved) {
          streakCount++;
          current = current.subtract(1, "day");
        } else break;
      }

      setStreak(streakCount);
    }

    loadData();
  }, []);

  /* -----------------------------
     ✅ Logout
  ----------------------------- */
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "50px", background: "#F6F5F5" }}>
      {/* HEADER */}
      <div
        style={{
          background: "white",
          padding: "25px 30px",
          borderRadius: "18px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.08)",
          marginBottom: "35px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 className="brand-title">
            📌 Bluestock Dashboard – {user?.displayName || "Player"}
          </h1>

          <p className="subtitle">
            Track your puzzle streaks, achievements, and daily performance.
          </p>

          <button
            className="btn btn-primary"
            style={{ width: "220px", marginTop: "15px" }}
            onClick={() => (window.location.href = "/game")}
          >
            🎮 Play Today’s Puzzle
          </button>
        </div>

        <button
          className="btn btn-danger"
          style={{ width: "160px", height: "50px" }}
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid-3">
        <div className="card">
          <h3 style={{ color: "#414BEA" }}>🔥 Current Streak</h3>
          <h1>{streak} Days</h1>
        </div>

        <div className="card">
          <h3 style={{ color: "#414BEA" }}>✅ Total Wins</h3>
          <h1>{totalSolved}</h1>
        </div>

        <div className="card">
          <h3 style={{ color: "#414BEA" }}>🏆 Best Score</h3>
          <h1>{bestScore}</h1>
        </div>
      </div>

      {/* HEATMAP */}
      <div className="heatmap-box">
        <h2 style={{ color: "#414BEA", marginBottom: "10px" }}>
          📅 365-Day Contribution Heatmap
        </h2>

        <div style={{ overflowX: "auto", paddingTop: "20px" }}>
          <Heatmap activity={activity} />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{ marginTop: "35px" }} className="card">
        <h2 style={{ color: "#414BEA" }}>
          📌 Recent Activity / Daily Scores
        </h2>

        <table
          style={{
            width: "100%",
            marginTop: "15px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left", background: "#D9E2FF" }}>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Score</th>
              <th style={{ padding: "12px" }}>Difficulty</th>
            </tr>
          </thead>

          <tbody>
            {recentScores.map((row) => (
              <tr key={row.date} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{row.date}</td>
                <td style={{ padding: "12px", fontWeight: "bold" }}>
                  ⭐ {row.score}
                </td>
                <td style={{ padding: "12px" }}>{row.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
