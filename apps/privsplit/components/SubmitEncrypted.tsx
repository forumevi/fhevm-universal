"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import privSplitAbi from "../contracts/PrivSplit.abi.json";

export default function SubmitEncrypted({
  enc,
  groupName,
}: {
  enc: string;
  groupName: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!(window as any).ethereum) {
        toast.error("Please install MetaMask!");
        return;
      }
      if (!groupName.trim()) {
        toast.error("Please enter a group name!");
        return;
      }
      if (!enc) {
        toast.error("No encrypted data found!");
        return;
      }

      setLoading(true);
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const contractAddress = process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS;
      const contract = new ethers.Contract(contractAddress!, privSplitAbi, signer);

      const groupId = ethers.encodeBytes32String(groupName.trim());

      toast.loading("🚀 Sending transaction...");
      const tx = await contract.submitShare(groupId, enc);
      await tx.wait();

      toast.dismiss();
      toast.success("✅ Encrypted share submitted!");
    } catch (err: any) {
      console.error(err);
      toast.dismiss();
      toast.error(`❌ ${err.message || "Transaction failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#aaa" : "#0070f3",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: 8,
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "1rem",
        }}
      >
        {loading ? "⏳ Submitting..." : "🚀 Submit to Blockchain"}
      </button>
    </div>
  );
}
