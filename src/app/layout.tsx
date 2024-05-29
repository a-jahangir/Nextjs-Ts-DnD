import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dnd from "@/library/dnd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Example",
  description: "Drag and Drop in box",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dnd>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Dnd>
  );
}
