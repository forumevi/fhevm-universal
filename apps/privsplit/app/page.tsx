"use client";

import React, { useState } from "react";
import SubmitEncrypted from "../components/SubmitEncrypted";
import WalletConnect from "../components/WalletConnect";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [value, setValue] = useState("");
  const [enc, setEnc] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");

  const handleEncrypt = () => {
    if (!value) {
      toast.error("Please enter a contribution amount!");
      return;
    }

    const encrypted = "0x" + Buffer.from(value).toString("hex");
    setEnc(encrypted);
    toast.success("✅ Locally encrypted (mock)");
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        gap: "1rem",
        minHeight: "100vh",
      }}
    >
      <Toaster position="top-right" />
      <WalletConnect onAddressChange={setAddress} />

      <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>💰 PrivSplit dApp (Mock)</h1>

      <p style={{ color: "#666" }}>
        Enter your private contribution amount. It will be{" "}
        <b>encrypted locally</b> using the FHE client.
      </p>

      {/* 🧩 Group ID */}
      <label style={{ width: "100%", maxWidth: 400 }}>
        Group name:
        <input
          type="text"
          placeholder="e.g. Team Alpha"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: 6,
            border: "1px solid #ccc",
            marginTop: 4,
            marginBottom: 12,
          }}
        />
      </label>

      <label style={{ width: "100%", maxWidth: 400 }}>
        Contribution (amount in tokens):
        <input
          type="number"
          placeholder="e.g. 100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: 6,
            border: "1px solid #ccc",
            marginTop: 4,
          }}
        />
      </label>

      <button
        onClick={handleEncrypt}
        style={{
          backgroundColor: "#0070f3",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        🔒 Encrypt
      </button>

      {enc && (
        <div style={{ width: "100%", maxWidth: 400 }}>
          <p>Encrypted payload:</p>
          <input
            type="text"
            value={enc}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />

          {/* 🔥 Sadece wallet bağlıysa gönderme butonu görünür */}
          {address ? (
            <SubmitEncrypted enc={enc} groupName={groupName} />
          ) : (
            <p style={{ color: "#888", textAlign: "center", marginTop: "1rem" }}>
              🦊 Connect your wallet to send encrypted data.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
