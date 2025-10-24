"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setConnecting(true);

      if (!(window as any).ethereum) {
        alert("🦊 MetaMask not detected. Please install it first.");
        setConnecting(false);
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0] ?? null);

      const network = await provider.getNetwork();
      // ✅ ethers v6 `chainId` artık bigint, string'e çeviriyoruz
      setChainId(network.chainId.toString());

      setConnecting(false);
    } catch (e) {
      console.error(e);
      alert("Connection rejected or failed.");
      setConnecting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #eee",
        background: "#fafafa",
        borderRadius: 8,
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>🦊 Wallet</h2>

      {address ? (
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.9rem" }}>
            <strong>Address:</strong> {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>Chain ID: {chainId}</div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={connecting}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            background: connecting ? "#aaa" : "#0070f3",
            color: "white",
            border: "none",
            cursor: connecting ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
        >
          {connecting ? "⏳ Connecting..." : "🔗 Connect Wallet"}
        </button>
      )}
    </div>
  );
}
