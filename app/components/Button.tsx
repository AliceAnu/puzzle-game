"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm";

  const styles =
    variant === "primary"
      ? "bg-[#414BEA] text-white hover:bg-[#190482]"
      : variant === "secondary"
      ? "bg-[#D9E2FF] text-[#414BEA] hover:bg-[#C2D9FF]"
      : "bg-[#F05537] text-white hover:bg-red-600";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
