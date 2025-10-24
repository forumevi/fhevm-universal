"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

export default function WalletConnect({
  onAddressChange,
}: {
  onAddressChange?: (addr: string | null) => void;
}) {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string>("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error("🦊 MetaMask not found");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      const net = await provider.getNetwork();
      setAddress(addr);
      setNetwork(net.name);
      if (onAddressChange) onAddressChange(addr);
      toast.success("Connected successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setNetwork("");
    if (onAddressChange) onAddressChange(null);
  };

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("accountsChanged", (accs: string[]) => {
      const a = accs.length > 0 ? accs[0] : null;
      setAddress(a);
      if (onAddressChange) onAddressChange(a);
    });
  }, []);

  return address ? (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <span
        style={{
          background: "#eaf3ff",
          padding: "4px 10px",
          borderRadius: 6,
          border: "1px solid #cfe0ff",
        }}
      >
        {address.slice(0, 6)}...{address.slice(-4)}{" "}
        <small style={{ opacity: 0.7 }}>({network})</small>
      </span>
      <button
        onClick={disconnect}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: 6,
          padding: "4px 10px",
          cursor: "pointer",
        }}
      >
        Disconnect
      </button>
    </div>
  ) : (
    <button
      onClick={connectWallet}
      style={{
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: 6,
        padding: "6px 12px",
        cursor: "pointer",
      }}
    >
      🦊 Connect Wallet
    </button>
  );
}
