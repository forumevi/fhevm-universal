"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);

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
      setAddress(addr);

      // 🔊 global event yay
      window.dispatchEvent(new CustomEvent("walletConnected", { detail: addr }));

      toast.success("Wallet connected ✅");
    } catch (err: any) {
      toast.error(err.message || "Connection failed");
    }
  };

  const disconnect = () => {
    setAddress(null);
    window.dispatchEvent(new CustomEvent("walletDisconnected"));
  };

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("accountsChanged", (accs: string[]) => {
      const newAddr = accs.length > 0 ? accs[0] : null;
      setAddress(newAddr);
      if (newAddr)
        window.dispatchEvent(new CustomEvent("walletConnected", { detail: newAddr }));
      else window.dispatchEvent(new CustomEvent("walletDisconnected"));
    });
  }, []);

  return address ? (
    <button
      onClick={disconnect}
      style={{
        background: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: 6,
        padding: "6px 12px",
        cursor: "pointer",
      }}
    >
      Disconnect
    </button>
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
