"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { getRandomPuzzle } from "@/lib/dailyPuzzle";
import { validateAnswer, Puzzle } from "@/game/puzzleEngine";

import confetti from "canvas-confetti";

// ✅ Import Activity DB
import { saveDailyActivity } from "@/lib/db/activityDB";

import dayjs from "dayjs";

export default function GamePage() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [wins, setWins] = useState(0);

  // ✅ Timer
  const [timeLeft, setTimeLeft] = useState(30);

  // ✅ Hint System
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintText, setHintText] = useState("");

  // Detect Guest
  const isGuest =
    typeof window !== "undefined" &&
    localStorage.getItem("guest") === "true";

  /* -----------------------------
     ✅ Auth Check (Google Only)
  ----------------------------- */
  useEffect(() => {
    if (isGuest) return;

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) window.location.href = "/";
    });

    return () => unsub();
  }, [isGuest]);

  /* -----------------------------
     ✅ Load New Puzzle
  ----------------------------- */
  const loadNewPuzzle = () => {
    setPuzzle(getRandomPuzzle());
    setAnswer("");
    setFeedback("");

    // Reset Timer
    setTimeLeft(30);

    // Reset Hints
    setHintsUsed(0);
    setHintText("");
  };

  useEffect(() => {
    loadNewPuzzle();
  }, []);

  /* -----------------------------
     ✅ Timer Countdown Logic
  ----------------------------- */
  useEffect(() => {
    if (!puzzle) return;

    if (timeLeft === 0) {
      setFeedback("⏳ Time’s up! Moving to next puzzle...");

      setTimeout(() => {
        loadNewPuzzle();
      }, 1200);

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, puzzle]);

  /* -----------------------------
     🎉 Confetti Blast
  ----------------------------- */
  const blastConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#414BEA", "#7752FE", "#F05537"],
    });
  };

  /* -----------------------------
     ✅ SAVE ACTIVITY AFTER WIN
  ----------------------------- */
  const saveWinToDB = async () => {
    const today = dayjs().format("YYYY-MM-DD");

    const score = 200 - hintsUsed * 20; // simple scoring
    const difficulty = 2; // default Medium

    await saveDailyActivity({
      date: today,
      solved: true,
      score: score,
      timeTaken: 30 - timeLeft,
      difficulty: difficulty,
      synced: false,
    });

    console.log("✅ Saved activity for:", today);
  };

  /* -----------------------------
     ✅ Submit Answer
  ----------------------------- */
  const handleSubmit = async () => {
    if (!puzzle) return;

    if (!validateAnswer(puzzle, answer)) {
      setFeedback("❌ Wrong Answer! Try again.");
      return;
    }

    // 🎉 Correct Answer
    blastConfetti();

    setFeedback("✅ Correct! Next Puzzle Loading...");

    // ✅ Save win to IndexedDB
    if (!isGuest) {
      await saveWinToDB();
    }

    setWins((w) => w + 1);

    setTimeout(() => {
      loadNewPuzzle();
    }, 1500);
  };

  /* -----------------------------
     ✅ Hint Logic (Max 3)
  ----------------------------- */
  const handleHint = () => {
    if (!puzzle) return;

    if (hintsUsed >= 3) {
      setHintText("⚠ No more hints left!");
      return;
    }

    const hint = puzzle.answer.slice(0, hintsUsed + 1);

    setHintsUsed((h) => h + 1);
    setHintText(`💡 Hint: Answer starts with "${hint}"`);
  };

  /* -----------------------------
     ✅ Redirect After 3 Wins
  ----------------------------- */
  useEffect(() => {
    if (!isGuest && wins === 3) {
      window.location.href = "/dashboard";
    }
  }, [wins, isGuest]);

  if (!puzzle) return <p>Loading...</p>;

  return (
    <div className="page-center">
      <div className="puzzle-box">
        {/* Title */}
        <h1 className="brand-title">Bluestock Daily Puzzle</h1>

        {/* Subtitle */}
        <p className="subtitle">
          {isGuest
            ? "Guest Mode: Unlimited puzzles 🎮"
            : `Win 3 puzzles to unlock Dashboard (${wins}/3)`}
        </p>

        {/* Timer Bar */}
        <div
          style={{
            marginTop: "15px",
            height: "10px",
            width: "100%",
            background: "#D9E2FF",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(timeLeft / 30) * 100}%`,
              background: "#F05537",
              transition: "0.5s",
            }}
          />
        </div>

        <h3 style={{ marginTop: "10px", color: "#F05537" }}>
          ⏳ Time Left: {timeLeft}s
        </h3>

        {/* Question */}
        <p className="puzzle-question">{puzzle.question}</p>

        {/* Input */}
        <input
          className="input-box"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
        />

        {/* Submit */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          ✅ Submit Answer
        </button>

        {/* Hint */}
        <button className="btn btn-secondary" onClick={handleHint}>
          💡 Use Hint ({hintsUsed}/3)
        </button>

        {/* Hint Text */}
        {hintText && (
          <p style={{ marginTop: "12px", color: "#7752FE" }}>
            {hintText}
          </p>
        )}

        {/* Feedback */}
        {feedback && (
          <p
            className="feedback"
            style={{
              marginTop: "15px",
              fontSize: "18px",
              color: feedback.includes("Correct") ? "green" : "red",
            }}
          >
            {feedback}
          </p>
        )}

        {/* Guest Logout */}
        {isGuest && (
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("guest");
              window.location.href = "/";
            }}
          >
            🚪 Logout Guest
          </button>
        )}
      </div>
    </div>
  );
}
