"use client";
import WalletConnect from "./WalletConnect";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 28px",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* 🔹 LOGO ALANI */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background:
              "linear-gradient(135deg, #0070f3 0%, #38bdf8 100%)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "1.2rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          ⛓️
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
            fhevm-universal
          </span>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#64748b",
              fontWeight: 500,
              marginTop: -2,
            }}
          >
            Fully Homomorphic Encryption dApp
          </span>
        </div>
      </div>

      {/* 🔹 SAĞ TARAFTA TEMA + CÜZDAN */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <ThemeToggle />
        <WalletConnect />
      </div>
    </header>
  );
}
