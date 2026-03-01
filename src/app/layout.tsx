import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Well | What Was Actually Said",
  description:
    "Strip away centuries of interpretation. Discover what the original words actually meant. Greek to English, no filters, no agenda.",
  keywords: [
    "bible study",
    "greek translation",
    "original scripture",
    "hamartia",
    "metanoia",
    "spiritual teaching",
    "WWJD",
    "gnostic gospels",
  ],
  openGraph: {
    title: "The Well | What Was Actually Said",
    description:
      "Strip away centuries of interpretation. Discover what the original words actually meant.",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#2D6A4F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
