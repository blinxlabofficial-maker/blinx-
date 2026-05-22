import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-headline-lg",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-body-md",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-label-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "blinx_ LAB - High Velocity Creative",
  description: "We engineer high-velocity creative for brands ready to break the algorithm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${anton.variable} ${hanken.variable} ${jetbrains.variable} antialiased selection:bg-voltage-yellow selection:text-ink-black flex flex-col min-h-screen`}
      >
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

