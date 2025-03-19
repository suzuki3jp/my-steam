import { dir } from "i18next";
import type { Metadata } from "next";
import "./globals.css";

import { fontMono, fontSans } from "@/fonts";
import { supportedLangs } from "@/i18n/settings";

export const metadata: Metadata = {
    title: "MySteam",
    description: "Generate a card of your steam profile and games.",
};

export const generateStaticParams = () => {
    return supportedLangs.map((lang) => ({ lang }));
};

export default function RootLayout({
    children,
    params: { lang },
}: Readonly<{
    children: React.ReactNode;
    params: {
        lang: string;
    };
}>) {
    return (
        <html lang={lang} dir={dir(lang)}>
            <body className={`${fontMono.variable} ${fontSans.variable}`}>
                {children}
            </body>
        </html>
    );
}
