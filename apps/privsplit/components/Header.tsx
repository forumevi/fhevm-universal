"use client";
import React, { useEffect, useState } from "react";
import WalletConnect from "./WalletConnect";

export default function Header() {
  const [network, setNetwork] = useState<string>("");

  useEffect(() => {
    const detectNetwork = async () => {
      if (typeof window === "undefined" || !window.ethereum) return;
      try {
        const { ethers } = await import("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const net = await provider.getNetwork();
        setNetwork(net.name === "homestead" ? "Mainnet" : net.name);
      } catch (err) {
        console.error("Network detection error:", err);
      }
    };
    detectNetwork();

    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#f8f9fa",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <h2 style={{ margin: 0, color: "#0f172a" }}>🔐 PrivSplit</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {network && (
          <span
            style={{
              background:
                network.toLowerCase() === "mainnet"
                  ? "#00b894"
                  : network.toLowerCase().includes("sepolia")
                  ? "#3b82f6"
                  : "#94a3b8",
              color: "white",
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            {network.toUpperCase()}
          </span>
        )}
        <WalletConnect />
      </div>
    </header>
  );
}
