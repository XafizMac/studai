import { Suspense } from "react";
import "../../../public/bg/registration.jpg";
import { Button } from "antd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
