"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as any).ethereum) {
      const p = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(p);
      // listen accounts / chain changes
      (window as any).ethereum.on?.("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0] ?? null);
      });
      (window as any).ethereum.on?.("chainChanged", (chainHex: string) => {
        setChainId(parseInt(chainHex, 16));
      });
    }
    return () => {
      try {
        (window as any).ethereum?.removeAllListeners?.("accountsChanged");
        (window as any).ethereum?.removeAllListeners?.("chainChanged");
      } catch {}
    };
  }, []);

  async function connect() {
    if (!provider) {
      alert("No injected wallet found (Metamask / Brave).");
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0] ?? null);
      const network = await provider.getNetwork();
      setChainId(network.chainId);
    } catch (e) {
      console.error(e);
      alert("Connection rejected or failed.");
    }
  }

  function short(a: string) {
    return a ? `${a.slice(0,6)}...${a.slice(-4)}` : "";
  }

  return (
    <div style={{display:"flex", gap:12, alignItems:"center"}}>
      {address ? (
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <div style={{padding:"6px 10px", background:"#0b1220", color:"#fff", borderRadius:8, fontFamily:"monospace"}}>
            {short(address)}
          </div>
          <div style={{color:"#666"}}>chain: {chainId ?? "—"}</div>
        </div>
      ) : (
        <button onClick={connect} style={{padding:"8px 14px", background:"#0070f3", color:"#fff", borderRadius:8, border:"none", cursor:"pointer"}}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
