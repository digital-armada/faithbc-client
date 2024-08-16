import type { Metadata } from "next";
import { Roboto, Lora } from "next/font/google";

import "./globals.css";
import Menu from "@/components/Menu/Menu";
import Providers from "@/lib/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loraFont = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora",
});

export const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${loraFont.variable} ${robotoFont.variable}`}>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
