"use client";

import { AllowedLangs } from "@/constants/lang";
import { setLang } from "@/context/lang";
import { Exo_2 } from "next/font/google";
import { Suspense, useEffect } from "react";

const exo_2 = Exo_2({ subsets: ["cyrillic"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const langLS = localStorage.getItem("lang");
    if (langLS) setLang(JSON.parse(langLS) as AllowedLangs);
  }, []);

  return (
    <html>
      <body className={exo_2.className} style={{ background: "#eef7ff" }}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
