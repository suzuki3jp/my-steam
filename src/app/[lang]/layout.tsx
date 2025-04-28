import { dir } from "i18next";
import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/header";
import { roboto } from "@/fonts";
import { useServerT } from "@/i18n/server";
import { supportedLangs } from "@/i18n/settings";
import type { SSRProps } from "@/types";

export const metadata: Metadata = {
    title: "MySteam",
    description: "Generate a card of your steam profile and games.",
};

export const generateStaticParams = () => {
    return supportedLangs.map((lang) => ({ lang }));
};

export default async function RootLayout({
    children,
    params,
}: Readonly<
    {
        children: React.ReactNode;
    } & SSRProps
>) {
    const { lang } = await params;
    const { t } = await useServerT(lang);

    return (
        <html lang={lang} dir={dir(lang)}>
            <body className={`${roboto.className}`}>
                <Header t={t} />
                {children}
            </body>
        </html>
    );
}
