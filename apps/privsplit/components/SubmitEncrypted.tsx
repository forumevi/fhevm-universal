"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import privSplitAbi from "../contracts/PrivSplit.abi.json"; // ✅ düzeltildi

export default function SubmitEncrypted({ enc }: { enc: string }) {
  const [status, setStatus] = useState<string>("idle");

  const handleSubmit = async () => {
    try {
      setStatus("connecting");

      if (!(window as any).ethereum) {
        alert("No wallet detected. Please install MetaMask or another Web3 wallet.");
        setStatus("error");
        return;
      }

      // 1️⃣ Cüzdan bağlantısı
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("Connected wallet:", address);

      setStatus("submitting");

      // 2️⃣ (isteğe bağlı) kontrat adresi ENV’den okunur
      const contractAddress =
        process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS ||
        "0x0000000000000000000000000000000000000000"; // demo address

      // 3️⃣ kontrat objesi oluşturuluyor
      const contract = new ethers.Contract(contractAddress, privSplitAbi, signer);

      // 4️⃣ blockchain’e sahte işlem (mock)
      console.log("Mock tx: sending encrypted payload:", enc);
      // Gerçek olsaydı -> await contract.submitEncrypted(enc);

      alert(`Encrypted payload sent!\n\n${enc.slice(0, 80)}...`);

      setStatus("success");
    } catch (err) {
      console.error(err);
      alert("Error submitting encrypted data.");
      setStatus("error");
    }
  };

  return (
    <div style={{ marginTop: 32, textAlign: "center" }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          background:
            status === "success"
              ? "#22c55e"
              : status === "error"
              ? "#ef4444"
              : "#111827",
          color: "white",
          border: "none",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        {status === "connecting"
          ? "🔗 Connecting..."
          : status === "submitting"
          ? "⏳ Submitting..."
          : status === "success"
          ? "✅ Submitted"
          : status === "error"
          ? "❌ Retry"
          : "📡 Send to Blockchain (mock)"}
      </button>

      <p style={{ marginTop: 10, fontSize: "0.9rem", color: "#666" }}>
        (mock transaction – no real gas used)
      </p>
    </div>
  );
}
