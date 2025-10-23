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
    if (!Number.isInteger(value) || value < 0)
      throw new Error("encryptU32 expects unsigned int");
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

  getProvider(): ethers.JsonRpcProvider {
    return this.provider;
  }
  getChainId(): number {
    return this.config.chainId;
  }
}

export async function createFHEClient(
  config: FHEVMConfig
): Promise<FHEVMClient> {
  return new FHEVMClient(config);
}
