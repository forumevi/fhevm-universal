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
        padding: 20,
        borderBottom: "1px solid #eee",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: "#0070f3",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          F
        </div>
        <div style={{ fontWeight: 700 }}>fhevm-universal</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ThemeToggle />
        <WalletConnect />
      </div>
    </header>
  );
}
