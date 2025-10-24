"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import privSplitAbi from "../contracts/PrivSplit.abi.json";

interface Props {
  enc: string;
  groupName: string;
}

export default function SubmitEncrypted({ enc, groupName }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        toast.error("🦊 MetaMask not found!");
        return;
      }

      // 🔑 Popup açar
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contractAddress = process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS;
      if (!contractAddress) {
        toast.error("Contract address missing!");
        return;
      }

      const contract = new ethers.Contract(contractAddress, privSplitAbi, signer);

      const groupId = "0x" + Buffer.from(groupName).toString("hex").padEnd(64, "0");
      setLoading(true);
      toast.loading("📡 Sending encrypted share...");

      const tx = await contract.submitShare(groupId, enc);

      toast.success("✅ Transaction sent! Waiting for confirmation...");
      await tx.wait();

      toast.success(
        <>
          🎉 Transaction confirmed! <br />
          <a
            href={`https://etherscan.io/tx/${tx.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            View on Etherscan
          </a>
        </>
      );
    } catch (err: any) {
      console.error(err);
      toast.error(`❌ ${err.message || "Transaction failed"}`);
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      style={{
        marginTop: "1rem",
        backgroundColor: loading ? "#ccc" : "#0070f3",
        color: "white",
        padding: "10px 16px",
        border: "none",
        borderRadius: 8,
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "1rem",
      }}
    >
      {loading ? "⏳ Sending..." : "🚀 Submit Encrypted Data"}
    </button>
  );
}
