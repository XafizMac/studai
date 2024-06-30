import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Регистрация"
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            {children}
        </>
    )
}