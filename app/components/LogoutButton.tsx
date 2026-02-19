"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LogoutButton() {
  const handleLogout = async () => {
    localStorage.removeItem("guest");

    await signOut(auth);

    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#F05537] text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
