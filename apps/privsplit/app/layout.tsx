// apps/privsplit/app/layout.tsx
import React, { type ReactNode } from "react";

export const metadata = {
  title: "PrivSplit dApp (Mock)",
  description: "Encrypted contribution demo using FHE",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#f2f5f9",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
