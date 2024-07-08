import { Metadata } from "next";
import { Exo_2 } from "next/font/google";

export const metadata: Metadata = {
  title: "Studai - ИИ платформа",
};

const exo_2 = Exo_2({ subsets: ["cyrillic"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return <body className={exo_2.className}>{children}</body>;
}
