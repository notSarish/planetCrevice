import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "planetCrevice",
    description: "A Windows 95 simulated environment",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
