import AppHeader from "@/components/ui/dash-header/AppHeader";

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