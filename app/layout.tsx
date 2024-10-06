import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";
import Providers from "@/lib/Providers";

export const metadata: Metadata = {
  title: "TheraTone",
  description: "Your Personalized Therapy Room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen"
        )}
      >
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
