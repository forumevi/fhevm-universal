# fhevm-universal (monorepo)

Aşağıda **tek repo** için tüm dosyalar hazır. Tamamını GitHub’a (forumevi/fhevm-universal) ekleyip commit’lediğinde, **examples/nextjs-showcase** veya **apps/privsplit** klasörünü Vercel’e bağlayarak demo’yu canlıya alabilirsin.

> Not: FHEVM çağrıları şu an **mock** (yer tutucu). Zama ağ uçlarına bağlandıktan sonra `encrypt/decrypt` ve kontrat çağrılarını gerçekleyebiliriz. 

---

## Root dosyaları

```json
// package.json (root)
{
  "name": "fhevm-universal-root",
  "private": true,
  "version": "0.1.0",
  "packageManager": "pnpm@9.11.0",
  "scripts": {
    "build": "pnpm -r --filter ./packages... build && pnpm -r --filter ./apps... build && pnpm -r --filter ./examples... build",
    "dev": "pnpm --filter ./examples/nextjs-showcase dev",
    "lint": "pnpm -r lint",
    "typecheck": "pnpm -r typecheck",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "prettier": "^3.3.3",
    "typescript": "^5.6.2"
  }
}
```

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"
  - "examples/*"
```

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM"],
    "declaration": true,
    "emitDeclarationOnly": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@fhevm-universal/core": ["packages/core/src"],
      "@fhevm-universal/react": ["packages/react/src"]
    }
  }
}
```

```gitignore
# .gitignore
node_modules
*.log
.next
out
coverage
dist
.env*
```

---

## packages/core — Universal FHEVM SDK çekirdeği

```json
// packages/core/package.json
{
  "name": "@fhevm-universal/core",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "clean": "rimraf dist",
    "lint": "eslint .",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "ethers": "^6.13.2"
  },
  "devDependencies": {
    "typescript": "^5.6.2",
    "rimraf": "^5.0.5"
  }
}
```

```json
// packages/core/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

```ts
// packages/core/src/index.ts
import { ethers } from "ethers";

export interface FHEVMConfig {
  rpcUrl: string;
  chainId: number;
}

export class FHEVMClient {
  private provider: ethers.JsonRpcProvider;

  constructor(private config: FHEVMConfig) {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
  }

  /**
   * Placeholder şifreleme: gerçek FHE çağrıları ile değiştirilecek.
   */
  async encryptU32(value: number): Promise<string> {
    if (!Number.isInteger(value) || value < 0) throw new Error("encryptU32 expects unsigned int");
    const encoded = ethers.toUtf8Bytes(value.toString());
    return ethers.hexlify(encoded);
  }

  async userDecrypt(blob: string): Promise<number> {
    const decoded = ethers.toUtf8String(blob as unknown as Uint8Array);
    return parseInt(decoded, 10);
  }

  async publicDecrypt(blob: string): Promise<number> {
    return this.userDecrypt(blob);
  }

  getProvider(): ethers.JsonRpcProvider { return this.provider; }
  getChainId(): number { return this.config.chainId; }
}

export async function createFHEClient(config: FHEVMConfig): Promise<FHEVMClient> {
  return new FHEVMClient(config);
}
```

---

## packages/react — React adapter & hooks

```json
// packages/react/package.json
{
  "name": "@fhevm-universal/react",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "dependencies": {
    "@fhevm-universal/core": "workspace:*"
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "clean": "rimraf dist",
    "lint": "eslint .",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.6.2",
    "rimraf": "^5.0.5"
  }
}
```

```json
// packages/react/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "outDir": "dist", "jsx": "react-jsx" },
  "include": ["src/**/*"]
}
```

```tsx
// packages/react/src/index.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { FHEVMConfig } from "@fhevm-universal/core";
import { createFHEClient, FHEVMClient } from "@fhevm-universal/core";

const Ctx = createContext<{ client: FHEVMClient | null, ready: boolean }>({ client: null, ready: false });

export function FHEProvider({ config, children }: { config: FHEVMConfig; children: React.ReactNode }) {
  const [client, setClient] = useState<FHEVMClient | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      const c = await createFHEClient(config);
      setClient(c);
      setReady(true);
    })();
  }, [config.rpcUrl, config.chainId]);
  const value = useMemo(() => ({ client, ready }), [client, ready]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFHEClient() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFHEClient must be used inside FHEProvider");
  return ctx;
}

export function useEncryptedState(initial = 0) {
  const { client, ready } = useFHEClient();
  const [plain, setPlain] = useState<number>(initial);
  const [enc, setEnc] = useState<string>("");
  useEffect(() => {
    if (!ready || !client) return;
    (async () => { setEnc(await client.encryptU32(plain)); })();
  }, [plain, ready, client]);
  return { plain, setPlain, enc };
}

export function useUserDecrypt() {
  const { client } = useFHEClient();
  return async (blob: string) => {
    if (!client) throw new Error("FHE client not ready");
    return client.userDecrypt(blob);
  };
}
```

---

## contracts — PrivSplit.sol (taslak)

```solidity
// contracts/PrivSplit.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * Uyarı: FHE işlemleri burada yer tutucu olarak modellenmiştir.
 * Gerçek FHEVM entegrasyonuna geçince, şifreli türler ve FHE opcode'ları kullanılacaktır.
 */
contract PrivSplit {
    struct EncryptedShare { bytes blob; }

    mapping(bytes32 groupId => EncryptedShare[]) private _shares; // her grup için şifreli paylar

    event ShareSubmitted(bytes32 indexed groupId, address indexed account, bytes blob);

    function submitShare(bytes32 groupId, bytes calldata encryptedAmount) external {
        _shares[groupId].push(EncryptedShare({ blob: encryptedAmount }));
        emit ShareSubmitted(groupId, msg.sender, encryptedAmount);
    }

    function getShares(bytes32 groupId) external view returns (EncryptedShare[] memory) {
        return _shares[groupId];
    }

    // TODO: FHE toplama/karşılaştırma (mock):
    function encryptedSummary(bytes32 groupId) external view returns (bytes memory) {
        // Gerçekte: FHE toplamı veya eşiği aşma biti gibi bir özet dönecek.
        // Şimdilik: basitçe birleştirilmiş blob simülasyonu (YER TUTUCU)
        bytes memory out;
        EncryptedShare[] memory arr = _shares[groupId];
        for (uint256 i = 0; i < arr.length; i++) {
            out = bytes.concat(out, arr[i].blob);
        }
        return out;
    }
}
```

---

## examples/nextjs-showcase — Basit demo (Vercel için ideal)

```json
// examples/nextjs-showcase/package.json
{
  "name": "nextjs-showcase",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "next": "14.2.13",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "@fhevm-universal/core": "workspace:*",
    "@fhevm-universal/react": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.6.2",
    "@types/node": "^20.14.11",
    "@types/react": "^18.2.79",
    "@types/react-dom": "^18.2.25",
    "eslint": "^9.8.0"
  }
}
```

```json
// examples/nextjs-showcase/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

```js
// examples/nextjs-showcase/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
```

```ts
// examples/nextjs-showcase/pages/index.tsx
import { FHEProvider, useEncryptedState, useFHEClient, useUserDecrypt } from "@fhevm-universal/react";

function Demo() {
  const { ready } = useFHEClient();
  const { plain, setPlain, enc } = useEncryptedState(42);
  const userDecrypt = useUserDecrypt();

  return (
    <div style={{ padding: 24 }}>
      <h1>fhevm-universal demo</h1>
      <p>Ready: {String(ready)}</p>
      <p>
        Value: <input type="number" value={plain} onChange={(e) => setPlain(parseInt(e.target.value || '0', 10))} />
      </p>
      <p>Encrypted blob: <code>{enc}</code></p>
      <button onClick={async () => alert(await userDecrypt(enc))}>Decrypt (mock)</button>
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
```

---

## apps/privsplit — Builder tra
