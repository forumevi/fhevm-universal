import React, { type ReactNode } from "react";
import Header from "../components/Header";

export const metadata = {
  title: "PrivSplit dApp (Mock)",
  description: "Encrypted contribution demo using FHE and wallet connection",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#f2f5f9",
          minHeight: "100vh",
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          color: "#111",
        }}
      >
        <Header />
        <main style={{ padding: "40px 20px", maxWidth: 960, margin: "0 auto" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
