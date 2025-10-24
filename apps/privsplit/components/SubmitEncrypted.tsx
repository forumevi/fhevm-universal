"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { abi as privSplitAbi } from "../contracts/PrivSplit.abi.json"; // (see note)

export default function SubmitEncrypted({ enc }: { enc: string }) {
  const [loading, setLoading] = useState(false);

  async function submitMock() {
    // mock: show alert
    alert("Mock submit: blob length " + (enc?.length ?? 0));
  }

  async function submitToChain() {
    if (!window.ethereum) return alert("Connect wallet first");
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = process.env.NEXT_PUBLIC_PRIVSPLIT_ADDRESS;
      if(!contractAddress) return alert("No contract address configured in env.");
      const contract = new ethers.Contract(contractAddress, privSplitAbi, signer);
      // bytes: hex string
      await contract.submitShare(ethers.id("group1").slice(0,66), enc);
      alert("Submitted on-chain (tx sent)");
    } catch (e) {
      console.error(e);
      alert("Submit failed: " + (e as any).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{marginTop:12}}>
      <button onClick={submitMock} style={{marginRight:8}}>Submit (mock)</button>
      <button onClick={submitToChain} disabled={loading} style={{background:"#0b8", color:"#002"}}>
        Submit on-chain
      </button>
    </div>
  );
}
