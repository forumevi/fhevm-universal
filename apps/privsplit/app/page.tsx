"use client";

import { FHEProvider, useEncryptedState } from "@fhevm-universal/react";

function SplitForm() {
  const { plain, setPlain, enc } = useEncryptedState(100);

  const handleSubmit = async () => {
    alert(`Submitting encrypted share:\n\n${enc}\n\n(Mock only)`);
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
      <h1 style={{ fontSize: "1.8rem", marginBottom: 16 }}>
        💰 PrivSplit dApp (Mock)
      </h1>
      <p style={{ color: "#666", marginBottom: 16 }}>
        Enter your (private) contribution amount. It will be encrypted on the
        client.
      </p>

      <label>
        Contribution (hidden):{" "}
        <input
          type="number"
          value={plain}
          onChange={(e) => setPlain(parseInt(e.target.value || "0", 10))}
          style={{
            marginLeft: 8,
            padding: "6px 10px",
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />
      </label>

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

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 24,
          padding: "10px 18px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        🚀 Submit (mock contract call)
      </button>
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
