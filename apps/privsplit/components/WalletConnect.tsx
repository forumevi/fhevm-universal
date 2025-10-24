"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

export default function WalletConnect({ onAddressChange }: { onAddressChange?: (address: string | null) => void }) {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      const newAddr = accounts.length > 0 ? accounts[0] : null;
      setAddress(newAddr);
      if (onAddressChange) onAddressChange(newAddr);
    });

    window.ethereum.on("chainChanged", () => window.location.reload());
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        toast.error("🦊 MetaMask not found!");
        return;
      }

      // 🧩 doğrudan request (popup garantili)
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      const networkInfo = await provider.getNetwork();

      setAddress(userAddress);
      setNetwork(networkInfo.name || "Unknown");

      if (onAddressChange) onAddressChange(userAddress);
      toast.success(`✅ Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`);
    } catch (err: any) {
      console.error("Wallet connection error:", err);
      toast.error(err.message || "❌ Wallet connection failed");
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setNetwork("");
    if (onAddressChange) onAddressChange(null);
    toast("👋 Wallet disconnected");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {address ? (
        <>
          <span
            style={{
              fontFamily: "monospace",
              background: "#f0f2f5",
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          >
            {address.slice(0, 6)}...{address.slice(-4)} ({network})
          </span>
          <button
            onClick={disconnectWallet}
            style={{
              background: "#ff5555",
              color: "white",
              border: "none",
              borderRadius: 6,
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          🦊 Connect Wallet
        </button>
      )}
    </div>
  );
}
