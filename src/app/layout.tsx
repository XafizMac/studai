import { Exo_2 } from "next/font/google";
import "./globals.css";
import ClientProvider from "./clientProvider"; // Импортируем клиентский провайдер
import { Metadata } from "next";
import logo from "../../public/logo.svg";
import { Suspense } from "react";

const exo_2 = Exo_2({ subsets: ["cyrillic"] });
export const metadata: Metadata = {
  icons: logo.src,
  title: "Studai - ИИ платформа",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo_2.className}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
