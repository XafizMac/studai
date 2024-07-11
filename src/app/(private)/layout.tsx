import { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import { Suspense } from "react";

const exo_2 = Exo_2({ subsets: ["cyrillic"] });
export const metadata: Metadata = {
  title: "Генерация",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={exo_2.className} style={{ background: "#eef7ff" }}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
