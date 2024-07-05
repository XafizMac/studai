import AppHeader from "@/components/ui/dash-header/AppHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Генерация'
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppHeader/>
            {children}
        </>
    )
}