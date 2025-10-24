"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { abi as privSplitAbi } from "../contracts/PrivSplit.abi.json";

export default function SubmitEncrypted({ enc }: { enc: string }) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!(window as any).ethereum) {
        toast.error("🦊 Please install MetaMask first.");
        return;
      }

      setSubmitting(true);
      toast.loading("🔐 Submitting encrypted data...");

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const contractAddress = process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS;
      if (!contractAddress) throw new Error("Missing contract address!");

      const contract = new ethers.Contract(contractAddress, privSplitAbi, signer);

      // 🧠 Gerçek kontrat çağrısı
      const tx = await contract.submitEncrypted(enc);
      toast.loading("📡 Waiting for confirmation...");

      await tx.wait();
      toast.dismiss();
      toast.success("✅ Transaction confirmed on blockchain!");

    } catch (err: any) {
      console.error(err);
      toast.dismiss();
      toast.error(`❌ Transaction failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Toaster position="top-right" />
      <button
        onClick={handleSubmit}
        disabled={submitting}
        style={{
          width: "100%",
          padding: "10px 16px",
          borderRadius: 8,
          background: submitting ? "#aaa" : "#0070f3",
          color: "white",
          border: "none",
          fontSize: "1rem",
          cursor: submitting ? "not-allowed" : "pointer",
          transition: "0.2s",
        }}
      >
        {submitting ? "⏳ Submitting..." : "🚀 Send to Blockchain"}
      </button>
      <p style={{ fontSize: "0.8rem", color: "#777", textAlign: "center", marginTop: "6px" }}>
        (uses real MetaMask transaction)
      </p>
    </div>
  );
}
