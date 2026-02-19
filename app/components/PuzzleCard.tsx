"use client";

import React from "react";

interface PuzzleCardProps {
  title: string;
  solved?: boolean;
}

export default function PuzzleCard({ title, solved = false }: PuzzleCardProps) {
  return (
    <div
      className={`w-full max-w-md p-4 rounded-xl shadow-md border ${
        solved ? "bg-green-100 border-green-400" : "bg-white border-gray-300"
      }`}
    >
      <p className="text-lg text-gray-800">{title}</p>
      {solved && <p className="mt-2 text-green-700 font-semibold">Solved ✅</p>}
    </div>
  );
}
