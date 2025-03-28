import type { Metadata } from "next";
import {
  Doto,
  Inter,
  Playfair_Display,
  Pixelify_Sans,
  Silkscreen,
  Staatliches,
  Nanum_Pen_Script,
} from "next/font/google";
// import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

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
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-montserrat",
// });

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

const nanum_pen_script = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nanum-pen-script",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${playfair.variable} ${doto.variable} ${inter.variable}  ${staatliches.variable} ${nanum_pen_script.variable} ${pixelify.variable} ${silkscreen.variable} antialiased`}
          >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
