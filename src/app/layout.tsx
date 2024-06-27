import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import logo from "../../public/logo.svg"

const exo_2 = Exo_2({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Studai - ИИ платформа",
  description: "Учись легко: генерация учебных работ с помощью ИИ",
  icons: logo
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo_2.className}>{children}</body>
    </html>
  );
}
