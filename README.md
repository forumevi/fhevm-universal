# 🔐 PrivSplit dApp (Mock)

**PrivSplit** is a demo decentralized app showing how private data can be encrypted in your browser and securely sent on-chain using **Fully Homomorphic Encryption (FHE)** and wallet connection.

🌐 **Live Demo:** [fhevm-universal.vercel.app](https://fhevm-universal.vercel.app)

---

## 🧠 What PrivSplit Demonstrates

PrivSplit shows how users can participate in private contribution rounds (like DAO voting or donations) **without revealing their amount publicly**.

Steps:
1. Encrypts your input locally in the browser.  
2. Sends the encrypted payload to a mock smart contract on the **Sepolia testnet**.  
3. Displays the decryption simulation.

---

## ⚙️ How It Works

1. Connect your wallet (MetaMask 🦊).  
2. Enter your group name & contribution.  
3. Encrypt locally — the value never leaves your browser unencrypted.  
4. Submit the encrypted data.  
5. Transaction opens automatically on the correct **Etherscan network** (Mainnet, Sepolia, etc.).  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14 + React 18 + TypeScript |
| Blockchain | Ethers.js (v5) |
| UX | react-hot-toast + framer-motion |
| Wallet | MetaMask (EIP-1193) |
| Hosting | Vercel |

---

## 🪄 Landing Hero Component

```tsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "#f8fafc",
        borderRadius: "12px",
        padding: "1.5rem",
        marginBottom: "2rem",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ fontSize: "1.4rem", color: "#0f172a", marginBottom: "0.5rem" }}>
        💡 What is PrivSplit?
      </h2>
      <p style={{ color: "#475569", fontSize: "0.95rem" }}>
        PrivSplit is a decentralized demo showing how encrypted values can be securely transmitted
        to blockchain without revealing user data. You can safely test on the Sepolia testnet — no real funds needed.
      </p>
    </motion.div>
  );
}
```

---

## 🚀 Local Setup

```bash
git clone https://github.com/forumevi/fhevm-universal.git
cd fhevm-universal/apps/privsplit
pnpm install
pnpm dev
```

Ensure you have Node.js ≥18 and MetaMask installed.

---

## 🔗 Environment Variables

Create `apps/privsplit/.env.local`:

```bash
NEXT_PUBLIC_PRIVSPLIT_ADDRESS=0xYourMockContractAddress
```

---

## 📜 License

MIT © 2025 — for educational & experimental purposes.

> “Encrypt locally, commit globally.” — PrivSplit 🧩
