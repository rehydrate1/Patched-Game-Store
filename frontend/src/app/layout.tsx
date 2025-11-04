import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.scss";
import LayoutWrapper from "@/components/LayoutWrapper";
import {ReactNode} from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <LayoutWrapper>
            {children}
        </LayoutWrapper>
        </body>
        </html>
    );
}
