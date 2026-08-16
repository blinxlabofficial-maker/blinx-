import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import FloatingContactButton from "@/components/FloatingContactButton/FloatingContactButton";
import { ContactModalProvider } from "@/context/ContactModalContext";
import ContactModal from "@/components/ContactModal/ContactModal";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8F7F4",
};

export const metadata: Metadata = {
  title: "Blinx Lab — We Build Businesses for the Digital World",
  description:
    "Blinx Lab builds the digital presence that helps ambitious businesses get seen, trusted, and chosen. Strategy, creative, and technology — built for small and developing businesses.",
  keywords: [
    "digital agency",
    "small business",
    "web development",
    "SEO",
    "digital marketing",
    "ERP",
    "CRM",
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <ContactModalProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingContactButton />
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}

