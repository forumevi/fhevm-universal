"use client";
import React, { useState } from "react";
import WalletConnect from "../components/WalletConnect"; // 👈 eklendi
import SubmitEncrypted from "../components/SubmitEncrypted";
import { Toaster, toast } from "react-hot-toast";

export default function Page() {
  const [group, setGroup] = useState("");
  const [value, setValue] = useState("");
  const [enc, setEnc] = useState("");
  const [address, setAddress] = useState<string | null>(null);

  const handleEncrypt = () => {
    if (!value) {
      toast.error("Please enter an amount first 💡");
      return;
    }
    const encrypted = "0x" + Buffer.from(value).toString("hex");
    setEnc(encrypted);
    toast.success("Successfully encrypted locally 🔒");
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f8fafc 100%)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          padding: "2.5rem",
          width: "100%",
          maxWidth: 480,
          textAlign: "center",
        }}
      >
        {/* 🔌 cüzdan bağlama – sayfa state’ine bağladık */}
        <div style={{ textAlign: "right", marginBottom: 12 }}>
          <WalletConnect onAddressChange={setAddress} />
        </div>

        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            marginTop: "1rem",
            color: "#0f172a",
          }}
        >
          💰 PrivSplit dApp (Mock)
        </h1>

        <p style={{ color: "#475569", fontSize: "0.95rem", marginTop: 8 }}>
          Enter your private contribution amount. It will be{" "}
          <b>encrypted locally</b> using the FHE client.
        </p>

        <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            🧩 Group name:
          </label>
          <input
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="e.g. Team Alpha"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: 600,
              marginTop: 16,
              marginBottom: 6,
            }}
          >
            💸 Contribution (in tokens):
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter amount"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          />
        </div>

        <button
          onClick={handleEncrypt}
          style={{
            marginTop: 20,
            background: "#3b82f6",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#2563eb")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#3b82f6")}
        >
          🔒 Encrypt
        </button>

        {enc && (
          <div style={{ marginTop: 24, textAlign: "left" }}>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              🔐 Encrypted payload:
            </label>
            <input
              type="text"
              value={enc}
              readOnly
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
              }}
            />

            {address ? (
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <SubmitEncrypted enc={enc} groupName={group} />
              </div>
            ) : (
              <p
                style={{
                  color: "#94a3b8",
                  fontStyle: "italic",
                  textAlign: "center",
                  marginTop: 16,
                }}
              >
                🦊 Connect your wallet to send encrypted data.
              </p>
            )}
          </div>
        )}

        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    </main>
  );
}
