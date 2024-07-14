import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Studai - ИИ платформа",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
}
