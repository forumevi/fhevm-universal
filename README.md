🚀 Next.js + ethers + FHE (Fully Homomorphic Encryption) yapısını açıklar

🔐 Cüzdan bağlantısı, şifreli veri gönderimi ve mock sözleşme mantığını anlatır

🧱 Kurulum ve .env.local örneğini içerir

🧭 Geliştirici & deploy talimatlarını Vercel için hazırlar

💬 “Demo dApp”, “Mock”, “PrivSplit” gibi proje terimlerine uygun sade dil kullanır

📄 README.md (tam içerik)
# 🔐 PrivSplit dApp (Mock)

> Encrypted contribution demo using **FHE (Fully Homomorphic Encryption)** and **Ethereum wallet connection**.  
> This is a frontend demo built with **Next.js**, **ethers.js**, and **react-hot-toast**, designed for exploring encrypted data sharing on-chain.

---

## ⚙️ Tech Stack

- 🧱 **Framework**: [Next.js 14](https://nextjs.org)
- ⚡ **Blockchain SDK**: [ethers.js v5.7](https://docs.ethers.io/v5/)
- 🔒 **Encryption**: Mock FHE (Fully Homomorphic Encryption) workflow
- 🦊 **Wallet Connection**: MetaMask integration
- 🧩 **UI Components**: React + TypeScript
- 🔔 **UX Enhancements**: `react-hot-toast` notifications

---

## 📂 Project Structure



apps/
privsplit/
app/
page.tsx # Main UI (Encryption + Submit)
layout.tsx # Root layout with Header
components/
Header.tsx # App header with wallet & network badge
WalletConnect.tsx # MetaMask connect/disconnect logic
SubmitEncrypted.tsx# Contract interaction
contracts/
PrivSplit.abi.json # Mock contract ABI


---

## 🚀 Getting Started

### 1️⃣ Install dependencies
```bash
pnpm install

2️⃣ Set environment variables

Create a file called .env.local inside /apps/privsplit:

NEXT_PUBLIC_PRIVSPLIT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE


(Use your deployed mock contract address — or a dummy one for frontend demo.)

3️⃣ Run locally
pnpm dev --filter privsplit


Open your browser at http://localhost:3000

🦊 Wallet Integration

Click "Connect Wallet" to link MetaMask.

After encryption, click "Submit Encrypted Data".

The app will:

Trigger MetaMask popup (eth_requestAccounts)

Send a transaction to PrivSplit contract

Show progress & success via react-hot-toast

🧠 Smart Contract (Mock)

PrivSplit.abi.json is a minimal ABI representing:

function submitShare(bytes32 groupId, string enc) external;


You can replace it with a real contract address later — the app will auto-connect to it via NEXT_PUBLIC_PRIVSPLIT_ADDRESS.

🖥️ Deployment (Vercel)

Push changes to your GitHub repo

Link the project on Vercel

Add an environment variable:

NEXT_PUBLIC_PRIVSPLIT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE


Vercel automatically builds the app via pnpm build.

🌐 Demo Preview (Optional)

Once deployed on Vercel, your live demo will be available at:

https://your-vercel-domain.vercel.app

🧩 Roadmap

 Add true FHE computation layer

 Support for multi-user encrypted aggregation

 Add contract event listeners

 UI refinements (network badge, dark mode)

🧑‍💻 Author

ForumEvi
Frontend / Web3 Developer
💬 https://github.com/forumevi

🪄 License

MIT License © 2025 ForumEvi
