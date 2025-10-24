"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import privSplitAbi from "../contracts/PrivSplit.abi.json";

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

      // 📦 kontrattaki fonksiyonun adı: submitShare
      // ilk parametre groupId (örnek olarak sabit verdik)
      // ikinci parametre ise enc (encrypted value)
      const dummyGroupId =
        "0x0000000000000000000000000000000000000000000000000000000000000001"; // örnek groupId

      toast.loading("⏳ Sending encrypted share...");

      const tx = await contract.submitShare(dummyGroupId, enc);
      await tx.wait();

      toast.dismiss();
      toast.success("✅ Encrypted share successfully submitted!");
    } catch (err: any) {
      console.error(err);
      toast.dismiss();
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
