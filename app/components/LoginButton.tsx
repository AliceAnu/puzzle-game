"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    router.push("/dashboard"); // ✅ After login → Dashboard
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-white text-black px-6 py-3 rounded-xl font-bold"
    >
      Login with Google
    </button>
  );
}
