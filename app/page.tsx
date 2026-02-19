"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export default function HomePage() {
  // ✅ Google Login Redirect
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // ✅ Only redirect to Google
    await signInWithRedirect(auth, provider);
  };

  // Guest Login
  const loginGuest = () => {
    localStorage.setItem("guest", "true");
    window.location.href = "/game";
  };

  // Admin Password Prompt
  const adminLogin = () => {
    const password = prompt("Enter Admin Password 🔒");

    if (password === "alice@26") {
      window.location.href = "/admin";
    } else {
      alert("❌ Wrong Password! Access Denied.");
    }
  };

  return (
    <div className="page-center login-bg">
      {/* ✅ Admin Button */}
      <button className="admin-btn" onClick={adminLogin}>
        🔒 Admin Login
      </button>

      <div className="jumbotron">
        <h1 className="brand-title">Bluestock Puzzle Game</h1>

        <p className="subtitle">
          Login to play today’s brain puzzle challenge 🚀
        </p>

        <button className="btn btn-primary" onClick={loginGoogle}>
          🔑 Login with Google
        </button>

        <button className="btn btn-secondary" onClick={loginGuest}>
          👤 Continue as Guest
        </button>
      </div>
    </div>
  );
}
