"use client";

import { FHEProvider, useEncryptedState } from "@fhevm-universal/react";
import SubmitEncrypted from "../components/SubmitEncrypted";

function SplitForm() {
  const { plain, setPlain, enc } = useEncryptedState(100);

  const handleEncrypt = () => {
    alert(`Locally encrypted mock:\n\n${enc}`);
  };

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "60px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: 16 }}>💰 PrivSplit dApp (Mock)</h1>
      <p style={{ color: "#666", marginBottom: 16 }}>
        Enter your private contribution amount. It will be <b>encrypted locally</b> using the FHE client.
      </p>

      <label style={{ display: "block", marginBottom: 10 }}>
        💵 <b>Contribution (amount in tokens):</b>
      </label>
      <input
        type="number"
        placeholder="e.g. 100"
        value={plain}
        onChange={(e) => setPlain(parseInt(e.target.value || "0", 10))}
        style={{
          width: "100%",
          padding: "8px 10px",
          border: "1px solid #ccc",
          borderRadius: 6,
          marginBottom: 12,
        }}
      />

      <button
        onClick={handleEncrypt}
        style={{
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          padding: "8px 14px",
          fontWeight: 500,
        }}
      >
        🔐 Encrypt
      </button>

      <div style={{ marginTop: 20 }}>
        <p>Encrypted payload:</p>
        <code
          style={{
            display: "block",
            wordBreak: "break-all",
            background: "#f9f9f9",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #eee",
          }}
        >
          {enc}
        </code>
      </div>

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
