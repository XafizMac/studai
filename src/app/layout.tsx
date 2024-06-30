"use client"

import { Exo_2 } from "next/font/google";
import "./globals.css";
import logo from "../../public/logo.svg"
import Store from "@/store/store";
import { createContext } from "react";

const exo_2 = Exo_2({ subsets: ["cyrillic"] });

interface State {
  store: Store
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Context.Provider value={{
      store
    }}>
      <html lang="en">
        <head>
          <title>Studai - ИИ платформа</title>
        </head>
        <body className={exo_2.className}>{children}</body>
      </html>
    </Context.Provider>
  );
}
