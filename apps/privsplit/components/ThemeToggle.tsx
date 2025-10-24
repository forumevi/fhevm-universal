"use client";

import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.style.background = dark
      ? "linear-gradient(135deg, #0f172a, #1e293b)"
      : "linear-gradient(135deg, #eff6ff, #e0f2fe)";
    document.body.style.color = dark ? "#f8fafc" : "#0f172a";
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        background: dark ? "#1e293b" : "#fff",
        color: dark ? "#f8fafc" : "#0f172a",
        border: "1px solid #cbd5e1",
        borderRadius: 8,
        padding: "6px 10px",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
