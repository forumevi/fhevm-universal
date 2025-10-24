"use client";
import WalletConnect from "./WalletConnect";

export default function Header() {
  return (
    <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:20, borderBottom:"1px solid #eee"}}>
      <div style={{display:"flex", alignItems:"center", gap:12}}>
        <div style={{width:40, height:40, borderRadius:8, background:"#0070f3", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}>F</div>
        <div style={{fontWeight:700}}>fhevm-universal</div>
      </div>
      <WalletConnect />
    </header>
  );
}
