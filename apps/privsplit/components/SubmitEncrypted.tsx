"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

interface Props {
  enc: string;
  groupName: string;
}

export default function SubmitEncrypted({ enc, groupName }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!window.ethereum) {
        toast.error("MetaMask not found 🦊");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // ✅ Örnek kontrat adresi
      const contractAddress = process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS;
      if (!contractAddress) {
        toast.error("Contract address missing in .env.local ⚠️");
        return;
      }

      // ✅ Basit ABI (örnek fonksiyon)
      const abi = [
        "function submitEncrypted(string memory group, string memory payload) public returns (bool)"
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);

      setLoading(true);
      toast.loading("Submitting encrypted data to blockchain... 🚀");

      const tx = await contract.submitEncrypted(groupName, enc);
      await tx.wait();

      toast.dismiss();
      toast.success("Transaction confirmed on blockchain ✅");

      console.log("TX hash:", tx.hash);
    } catch (err: any) {
      toast.dismiss();
      console.error(err);
      toast.error(err.message || "Transaction failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      style={{
        background: loading ? "#94a3b8" : "#3b82f6",
        color: "white",
        padding: "10px 18px",
        border: "none",
        borderRadius: 8,
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        transition: "all 0.25s ease",
      }}
    >
      {loading ? "⏳ Waiting for confirmation..." : "🚀 Submit to Blockchain"}
    </button>
  );
}
