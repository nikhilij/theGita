import type { Metadata } from "next";
import "./globals.css";
import "../styles/fonts.css";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { LanguageProvider } from "../components/LanguageContext";


export const metadata: Metadata = {
  title: "theGita - Bhagavad Gita",
  description: "Read, listen, and explore the Bhagavad Gita in multiple languages. Experience divine wisdom with beautiful typography and comprehensive translations.",
  keywords: [
    "Bhagavad Gita",
    "Gita",
    "Hinduism",
    "Spirituality",
    "Philosophy",
    "Yoga",
    "Meditation",
    "Krishna",
    "Arjuna",
    "Ancient Texts",
    "Indian Culture",
    "Religious Studies",
    "Self-Realization",
    "Dharma",
    "Karma",
    "Moksha",
    "Sanskrit",
    "Devanagari",
    "Hindi"
  ],
  authors: [{ name: "theGita Team" }],
  openGraph: {
    title: "theGita - Divine Wisdom of Bhagavad Gita",
    description: "Experience the Bhagavad Gita with beautiful typography, multi-language support, and spiritual guidance.",
    type: "website",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#14213d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Serif:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Serif+Devanagari:wght@400;700&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          {children}
          <ScrollToTopButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
