import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { FHEVMConfig } from "@fhevm-universal/core";
import { createFHEClient, FHEVMClient } from "@fhevm-universal/core";

const Ctx = createContext<{ client: FHEVMClient | null; ready: boolean }>({
  client: null,
  ready: false,
});

export function FHEProvider({
  config,
  children,
}: {
  config: FHEVMConfig;
  children: React.ReactNode;
}) {
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
    (async () => {
      setEnc(await client.encryptU32(plain));
    })();
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
