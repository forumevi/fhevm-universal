# 🔐 FHEVM Universal — PrivSplit dApp
> Encrypted contribution demo using **FHE (Fully Homomorphic Encryption)** and **Ethereum wallet connection**, built with **Next.js**, **ethers.js**, and **react-hot-toast**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/forumevi/fhevm-universal)

---

## 🚀 Overview

This project demonstrates how private data (like contributions) can be **encrypted locally** and securely submitted to a smart contract using **FHE (Fully Homomorphic Encryption)**.  
It serves as a **frontend template** for privacy-preserving dApps.

---

## 🧩 Tech Stack

- ⚡ **Next.js 14** – React-based full-stack framework  
- 🦊 **ethers.js** – Ethereum wallet & contract interactions  
- 🔥 **react-hot-toast** – Modern notification system  
- 🧠 **FHE (Fully Homomorphic Encryption)** – Privacy layer for encrypted data  
- 💅 **CSS-in-JS inline styles** – Simple, lightweight UI  

---

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/forumevi/fhevm-universal.git
   cd fhevm-universal/apps/privsplit
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Add environment variables**
   Create a `.env.local` file inside `apps/privsplit/` and add:
   ```bash
   NEXT_PUBLIC_PRIVSPLIT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE
   ```

4. **Run the app locally**
   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

---

## 🧪 Example Workflow

1. Connect your wallet (MetaMask popup appears 🦊)  
2. Enter a “Contribution” amount (mock data for now)  
3. Encrypt your input locally  
4. Submit encrypted data to the contract  

---

## 🌍 Live Demo

👉 [fhevm-universal.vercel.app](https://fhevm-universal.vercel.app)

---

## 📦 Project Structure

```
apps/
└── privsplit/
    ├── app/
    │   ├── layout.tsx       # Global layout + Header
    │   └── page.tsx         # Main app page
    ├── components/
    │   ├── WalletConnect.tsx
    │   ├── SubmitEncrypted.tsx
    │   └── Header.tsx
    ├── contracts/
    │   └── PrivSplit.abi.json
    ├── package.json
    └── tsconfig.json
```

---

## 🧠 Future Ideas

- ✅ Add **real FHE encryption** client-side  
- 🌐 Deploy **onchain contract** for live testing  
- 💬 Add support for multiple contribution groups  
- 🔍 Show transaction history with Etherscan links  

---

## 🧑‍💻 Author

**ForumEvi Labs**  
Building open, privacy-first Web3 applications.  
🌐 [forumevi](https://forumevi.com)

---

## 🪪 License

MIT © 2025 ForumEvi Labs
