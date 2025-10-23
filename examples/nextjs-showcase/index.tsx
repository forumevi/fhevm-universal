import { FHEProvider, useEncryptedState, useFHEClient, useUserDecrypt } from "@fhevm-universal/react";

function Demo() {
  const { ready } = useFHEClient();
  const { plain, setPlain, enc } = useEncryptedState(42);
  const userDecrypt = useUserDecrypt();

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: 20 }}>🧠 FHEVM Universal Demo</h1>
      <p>Client ready: <strong>{String(ready)}</strong></p>
      <div style={{ margin: "20px 0" }}>
        <label>Value: </label>
        <input
          type="number"
          value={plain}
          onChange={(e) => setPlain(parseInt(e.target.value || "0", 10))}
          style={{ padding: "4px 8px", marginLeft: 8 }}
        />
      </div>
      <p>Encrypted blob:</p>
      <code style={{
        display: "block",
        maxWidth: 600,
        wordBreak: "break-all",
        padding: "10px",
        background: "#f4f4f4",
        borderRadius: 6
      }}>
        {enc}
      </code>
      <button
        onClick={async () => alert(await userDecrypt(enc))}
        style={{
          marginTop: 20,
          padding: "10px 18px",
          borderRadius: 8,
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        🔓 Decrypt (mock)
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <FHEProvider config={{ rpcUrl: "https://rpc.zama.dev", chainId: 11155111 }}>
      <Demo />
    </FHEProvider>
  );
}
