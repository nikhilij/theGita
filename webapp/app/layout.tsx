import type { Metadata } from "next";
import "./globals.css";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { LanguageProvider } from "../components/LanguageContext";


export const metadata: Metadata = {
  title: "theGita",
  description: "The Bhagavad Gita",
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
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <ScrollToTopButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
