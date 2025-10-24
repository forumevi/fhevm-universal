"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

type WalletConnectProps = {
  onAddressChange?: (address: string | null) => void;
};

export default function WalletConnect({ onAddressChange }: WalletConnectProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const connectWallet = async () => {
    try {
      if (!(window as any).ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();

      setAddress(accounts[0]);
      setChainId(Number(network.chainId));

      if (onAddressChange) onAddressChange(accounts[0]);
    } catch (err) {
      console.error(err);
      alert("Connection failed.");
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {address ? (
        <div>
          ✅ Connected:{" "}
          <span style={{ fontFamily: "monospace" }}>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>{" "}
          (Chain {chainId})
        </div>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            background: "#0070f3",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          🦊 Connect Wallet
        </button>
      )}
    </div>
  );
}
