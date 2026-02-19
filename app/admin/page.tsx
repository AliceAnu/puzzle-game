"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);

  /* -----------------------------
     ✅ Fetch Admin Data
  ----------------------------- */
  useEffect(() => {
    const fetchAdminData = async () => {
      const res = await fetch("/api/admin/data");
      const data = await res.json();

      setUsers(data.users);
      setScores(data.scores);
    };

    fetchAdminData();
  }, []);

  return (
    <div style={{ padding: "50px", background: "#F6F5F5" }}>
      <h1 style={{ color: "#414BEA", fontSize: "32px" }}>
        🛠 Admin Dashboard
      </h1>

      <p style={{ marginBottom: "30px", color: "#555" }}>
        View all Users and Daily Puzzle Scores
      </p>

      {/* ================= USERS TABLE ================= */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "40px",
          boxShadow: "0px 5px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ color: "#414BEA" }}>👤 Users Table</h2>

        <table
          style={{
            width: "100%",
            marginTop: "15px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#D9E2FF", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Email</th>
              <th style={{ padding: "12px" }}>Created At</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px" }}>{u.name || "No Name"}</td>
                <td style={{ padding: "12px" }}>{u.email}</td>
                <td style={{ padding: "12px" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= SCORES TABLE ================= */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0px 5px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ color: "#414BEA" }}>📊 Daily Scores Table</h2>

        <table
          style={{
            width: "100%",
            marginTop: "15px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#D9E2FF", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>User</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Score</th>
              <th style={{ padding: "12px" }}>Solved</th>
              <th style={{ padding: "12px" }}>Difficulty</th>
            </tr>
          </thead>

          <tbody>
            {scores.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px" }}>
                  {s.user?.email || "Guest"}
                </td>

                <td style={{ padding: "12px" }}>{s.date}</td>

                <td style={{ padding: "12px", fontWeight: "bold" }}>
                  ⭐ {s.score}
                </td>

                <td style={{ padding: "12px" }}>
                  {s.solved ? "✅ Yes" : "❌ No"}
                </td>

                <td style={{ padding: "12px" }}>{s.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
