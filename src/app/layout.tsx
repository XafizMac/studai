import { Exo_2 } from "next/font/google";
import "./globals.css";
import ClientProvider from "./clientProvider"; // Импортируем клиентский провайдер

const exo_2 = Exo_2({ subsets: ["cyrillic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <title>{metadata.title}</title> */}
      </head>
      <body className={exo_2.className}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
