"use client";

import React, { useState } from "react";
import SubmitEncrypted from "../components/SubmitEncrypted";
import WalletConnect from "../components/WalletConnect";

export default function Page() {
  const [value, setValue] = useState("");
  const [enc, setEnc] = useState("");
  const [address, setAddress] = useState<string | null>(null);

  const handleEncrypt = () => {
    // mock encryption (örnek olarak)
    const encrypted = "0x" + Buffer.from(value).toString("hex");
    setEnc(encrypted);
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
      <WalletConnect onAddressChange={setAddress} />

      <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>💰 PrivSplit dApp (Mock)</h1>

      <p style={{ color: "#666" }}>
        Enter your private contribution amount. It will be{" "}
        <b>encrypted locally</b> using the FHE client.
      </p>

      <label style={{ width: "100%", maxWidth: 400 }}>
        Contribution:
        <input
          type="text"
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

          {/* 🔥 Burada sadece cüzdan bağlıysa gönderme butonu görünür */}
          {address ? (
            <SubmitEncrypted enc={enc} />
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
