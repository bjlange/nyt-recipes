import type { Metadata } from "next";
import "./globals.css";

import { franklin } from "./fonts";

export const metadata: Metadata = {
  title: "Brian & Allison's Favorite NYT Recipes",
  icons: {
    icon: "/LtimesIcon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${franklin.className} antialiased`}>
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
