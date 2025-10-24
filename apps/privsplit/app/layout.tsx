export const metadata = {
  title: 'PrivSplit Demo',
  description: 'Simple Next.js demo page'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
