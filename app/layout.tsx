import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew Dang OS",
  description: "A Windows-inspired operating system portfolio for Andrew Dang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-background text-foreground antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
