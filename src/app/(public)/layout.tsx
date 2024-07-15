import { Exo_2 } from "next/font/google";
import { Suspense } from "react";

const exo_2 = Exo_2({ subsets: ["cyrillic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo_2.className}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
