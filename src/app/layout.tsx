import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { connectMongoDB } from "@/utils/db";
import Footer from "./components/Footer";
;(async () => await connectMongoDB())()

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Skills",
  description: "What you need to learn for the job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' flex flex-col items-center'}>{children} <Footer /></body>
    </html>
  );
}
