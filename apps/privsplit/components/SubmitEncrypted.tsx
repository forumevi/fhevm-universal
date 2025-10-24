"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import privSplitAbi from "../contracts/PrivSplit.abi.json";

interface Props {
  enc: string;
  groupName: string;
}

export default function SubmitEncrypted({ enc, groupName }: Props) {
  const [loading, setLoading] = useState(false);
  const [decryptedSim, setDecryptedSim] = useState<string | null>(null); // 🧩 simülasyon için

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
      const network = await provider.getNetwork();

      const contractAddress = process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS;
      if (!contractAddress) {
        toast.error("❌ Contract address missing!");
        return;
      }

      const contract = new ethers.Contract(contractAddress, privSplitAbi, signer);
      const groupId = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(groupName)).padEnd(66, "0");

      setLoading(true);
      const loadingId = toast.loading("📡 Sending encrypted share...");

      const tx = await contract.submitShare(groupId, enc);

      toast.dismiss(loadingId);
      toast.success("✅ Transaction sent! Waiting for confirmation...");

      await tx.wait();

      // 🌐 Dinamik explorer seçimi
      let explorerBase = "https://etherscan.io";
      if (network.chainId === 11155111) explorerBase = "https://sepolia.etherscan.io";
      else if (network.chainId === 5) explorerBase = "https://goerli.etherscan.io";
      else if (network.chainId === 11155420) explorerBase = "https://optimism-sepolia.etherscan.io";
      else if (network.chainId === 80001) explorerBase = "https://mumbai.polygonscan.com";

      // 🧮 Mock decryption preview
      try {
        const decoded = Buffer.from(enc.replace(/^0x/, ""), "hex").toString();
        setDecryptedSim(decoded || "0");
      } catch {
        setDecryptedSim("N/A");
      }

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
    <div style={{ textAlign: "center" }}>
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

      {/* 🧮 Decryption Preview (Animated) */}
      {decryptedSim && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: "1.5rem",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "1rem",
            color: "#0f172a",
            textAlign: "left",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0" }}>🧮 Decryption Preview (Simulation)</h4>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5 }}>
            Your encrypted value would decrypt to:{" "}
            <b style={{ color: "#3b82f6" }}>{decryptedSim}</b> tokens 🎉
          </p>
        </motion.div>
      )}
    </div>
  );
}
