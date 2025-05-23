import type { Metadata } from "next";
import {
  Doto,
  Inter,
  Playfair_Display,
  Pixelify_Sans,
  Silkscreen,
  Staatliches,
} from "next/font/google";
// import localFont from "next/font/local";
import localFont from "next/font/local";
// import { ReactLenis } from "lenis/react";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const doto = Doto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-doto",
});

const inter = Inter({
  subsets: ["latin"], // Only include the Latin subset
  weight: ["400", "600"], // Choose specific weights you need
  variable: "--font-inter", // Custom CSS variable
});
const pixelify = Pixelify_Sans({
  subsets: ["latin"], // Added subset for Pixelify Sans
  weight: ["400", "500"], // Adjust the weights you need
  variable: "--font-pixelify", // Custom CSS variable
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair",
});
export const metadata: Metadata = {
  title: "E-Cell MJCET",
  description: "Official website of E-Cell MJCET",
};

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silkscreen",
});

const staatliches = Staatliches({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-staatliches",
});

const getBlockFont = localFont({
  src: "../app/fonts/block.woff2",
  variable: "--font-block",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${getBlockFont.variable} ${doto.variable} ${inter.variable} ${staatliches.variable} ${pixelify.variable} ${silkscreen.variable} antialiased`}
      >
        {/* <ReactLenis root={true}> */}
        {/* <LoadingScreen /> */}
        {children}
        {/* </ReactLenis> */}
        <Toaster />
      </body>
    </html>
  );
}
