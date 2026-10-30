import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Pulse Admin",
  description: "Private administration workspace for Code Pulse",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
