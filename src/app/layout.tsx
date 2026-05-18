import type { Metadata } from "next";
import { Fugaz_One, Exo_2, Gudea } from "next/font/google";
import "./globals.css";

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

const fugazOne = Fugaz_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fugaz",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo",
});

const gudea = Gudea({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gudea",
});

export const metadata: Metadata = {
  title: "Blinx Lab — Social · Sharp · Swift",
  description: "Website for Blinx Lab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fugazOne.variable} ${exo2.variable} ${gudea.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Nav />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
