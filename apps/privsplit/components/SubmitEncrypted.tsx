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
      if (typeof window === "undefined" || !(window as any).ethereum) {
        toast.error("🦊 MetaMask not found!");
        return;
      }

      // 🔑 Popup garantili bağlantı isteği
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const network = await provider.getNetwork(); // ✅ Ağ bilgisi eklendi

      const contractAddress = process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS;
      if (!contractAddress) {
        toast.error("❌ Contract address missing!");
        return;
      }

      const contract = new ethers.Contract(contractAddress, privSplitAbi, signer);

      // 🔢 groupName → bytes32
      const groupId = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(groupName)).padEnd(66, "0");

      setLoading(true);
      const loadingId = toast.loading("📡 Sending encrypted share...");

      const tx = await contract.submitShare(groupId, enc);

      toast.dismiss(loadingId);
      toast.success("✅ Transaction sent! Waiting for confirmation...");

      await tx.wait();

      // 🌐 Dinamik Etherscan URL seçimi
      let explorerBase = "https://etherscan.io";
      if (network.chainId === 11155111) explorerBase = "https://sepolia.etherscan.io";
      else if (network.chainId === 5) explorerBase = "https://goerli.etherscan.io";
      else if (network.chainId === 11155420) explorerBase = "https://optimism-sepolia.etherscan.io";
      else if (network.chainId === 80001) explorerBase = "https://mumbai.polygonscan.com";

      toast.success(
        <div>
          🎉 Transaction confirmed! <br />
          <a
            href={`${explorerBase}/tx/${tx.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            View on Etherscan
          </a>
        </div>
      );
    } catch (err: any) {
      console.error(err);
      toast.error(`❌ ${err.message || "Transaction failed"}`);
    } finally {
      setLoading(false);
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
        fontWeight: 600,
        transition: "0.3s all",
      }}
    >
      {loading ? "⏳ Sending..." : "🚀 Submit Encrypted Data"}
    </button>
  );
}
