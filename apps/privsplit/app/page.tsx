"use client";

import { FHEProvider, useEncryptedState } from "@fhevm-universal/react";
import SubmitEncrypted from "../components/SubmitEncrypted";

function SplitForm() {
  const { plain, setPlain, enc } = useEncryptedState(100);

  const handleSubmit = async () => {
    alert(`Submitting encrypted share:\n\n${enc}\n\n(Mock only)`);
  };

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        background: "#fff",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: 16, textAlign: "center" }}>
        💰 PrivSplit dApp (Mock)
      </h1>
      <p style={{ color: "#555", marginBottom: 16, textAlign: "center" }}>
        Enter your private contribution amount.  
        It will be <strong>encrypted locally</strong> using the FHE client.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <label style={{ minWidth: 120 }}>Contribution:</label>
        <input
          type="number"
          value={plain}
          onChange={(e) => setPlain(parseInt(e.target.value || "0", 10))}
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <p>Encrypted payload:</p>
        <code
          style={{
            display: "block",
            wordBreak: "break-all",
            background: "#f9f9f9",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #eee",
            fontSize: "0.9rem",
          }}
        >
          {enc}
        </code>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 20,
          padding: "10px 18px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          width: "100%",
        }}
      >
        🚀 Submit (mock)
      </button>

      {/* 🔹 Ek: zincire gönderim butonu (mock / gerçek seçilebilir) */}
      <SubmitEncrypted enc={enc} />
    </div>
  );
}

export default function Page() {
  return (
    <FHEProvider config={{ rpcUrl: "https://rpc.zama.dev", chainId: 11155111 }}>
      <SplitForm />
    </FHEProvider>
  );
}
