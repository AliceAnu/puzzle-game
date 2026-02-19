"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function HomePage() {
  // Google Login
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    // Redirect to Game after login
    window.location.href = "/game";
  };

  // Guest Login
  const loginGuest = () => {
    localStorage.setItem("guest", "true");

    // Guest also goes to Game
    window.location.href = "/game";
  };

  // ✅ Admin Password Prompt
  const adminLogin = () => {
    const password = prompt("Enter Admin Password 🔒");

    // ✅ Set your admin password here
    if (password === "alice@26") {
      window.location.href = "/admin";
    } else {
      alert("❌ Wrong Password! Access Denied.");
    }
  };

  return (
    <div className="page-center login-bg">
      
      {/* ✅ Admin Button Top Right */}
      <button className="admin-btn" onClick={adminLogin}>
        🔒 Admin Login
      </button>

      {/* Main Jumbotron */}
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
