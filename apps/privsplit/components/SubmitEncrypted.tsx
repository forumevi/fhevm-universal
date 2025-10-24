"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import privSplitAbiJson from "../contracts/PrivSplit.abi.json";

const privSplitAbi = privSplitAbiJson.abi || privSplitAbiJson;

export default function SubmitEncrypted({ enc }: { enc: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!(window as any).ethereum) {
        toast.error("Please install MetaMask!");
        return;
      }

      setLoading(true);
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const contractAddress = process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS;
      if (!contractAddress) {
        toast.error("❌ Missing contract address in environment variables!");
        setLoading(false);
        return;
      }

      const contract = new ethers.Contract(contractAddress, privSplitAbi, signer);

      // Mock call – gerçek contract fonksiyonuna göre güncellenecek
      const tx = await contract.submitEncrypted(enc);
      toast.loading("⏳ Sending encrypted data...");
      await tx.wait();

      toast.success("✅ Successfully submitted encrypted payload!");
    } catch (err: any) {
      console.error(err);
      toast.error(`Error: ${err.message || "Transaction failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
      <Toaster position="top-right" />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#ccc" : "#0070f3",
          color: "white",
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "1rem",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {loading ? "🚀 Submitting..." : "🚀 Submit (mock contract call)"}
      </button>
    </div>
  );
}
