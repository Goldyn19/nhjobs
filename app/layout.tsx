import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google'
import "./globals.css";

const sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Job Portal",
  description: "New Horizons Job Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={sans.className}
      >
        {children}
      </body>
    </html>
  );
}
