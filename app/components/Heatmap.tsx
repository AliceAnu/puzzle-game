"use client";

import dayjs from "dayjs";

export default function Heatmap({ activity }: any) {
  /* -----------------------------
     ✅ Generate 365 Days
  ----------------------------- */
  const start = dayjs().startOf("year");

  const days = Array.from({ length: 365 }, (_, i) =>
    start.add(i, "day")
  );

  /* -----------------------------
     ✅ Convert into Weeks
  ----------------------------- */
  const weeks: any[] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  /* -----------------------------
     ✅ Color Logic
  ----------------------------- */
  const getColor = (entry: any) => {
    if (!entry || !entry.solved) return "#E5E7EB";

    if (entry.score >= 180) return "#14532D";
    if (entry.difficulty === 3) return "#15803D";
    if (entry.difficulty === 2) return "#4ADE80";
    return "#BBF7D0";
  };

  return (
    <div style={{ overflowX: "auto", paddingBottom: "10px" }}>
      <div style={{ display: "flex", gap: "4px" }}>
        {weeks.map((week, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {week.map((day: any) => {
              const key = day.format("YYYY-MM-DD");

              // ✅ FIX: Activity might be undefined
              const entry = activity?.[key];

              return (
                <div
                  key={key}
                  title={
                    entry?.solved
                      ? `${key} Score: ${entry.score}`
                      : `${key} Not Played`
                  }
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "4px",
                    background: getColor(entry),
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
