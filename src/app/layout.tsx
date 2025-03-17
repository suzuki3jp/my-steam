import type { Metadata } from "next";
import "./globals.css";

import { fontMono, fontSans } from "@/fonts";

export const metadata: Metadata = {
    title: "MySteam",
    description: "Generate a card of your steam profile and games.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${fontMono.variable} ${fontSans.variable}`}>
                {children}
            </body>
        </html>
    );
}
