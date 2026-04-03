import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew Dang Portfolio OS",
  description: "Inspired by Windows 10 v1703, this is a portfolio website designed to mostly match it.",
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
