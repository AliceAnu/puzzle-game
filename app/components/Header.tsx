"use client";

import React from "react";

interface HeaderProps {
  user: any | null;
  isGuest: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, isGuest }) => {
  return (
    <header className="mb-6 text-center">
      <h1 className="text-3xl text-[#414BEA] font-bold mb-2 font-poppins">
        🎮 Daily Puzzle Dashboard
      </h1>

      <p className="text-[#3D3B40] text-lg">
        Welcome back, <b>{isGuest ? "Guest Player 👤" : user?.displayName}</b>
      </p>

      {isGuest && (
        <p className="text-sm text-gray-500 mt-1">
          ⚠ Guest mode progress is stored only on this device.
        </p>
      )}
    </header>
  );
};

export default Header;
