import { dir } from "i18next";
import type { Metadata } from "next";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Provider } from "@/components/provider";
import { roboto } from "@/fonts";
import { useServerT } from "@/i18n/server";
import { supportedLangs } from "@/i18n/settings";
import type { SSRProps } from "@/types";

export async function generateMetadata({
    params,
}: SSRProps): Promise<Metadata> {
    const { lang } = await params;
    const { t } = await useServerT(lang);

    return {
        title: t("meta.title"),
        description: t("meta.description"),
    };
}

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
                <Provider>
                    <Header t={t} />
                    {children}
                    <Footer t={t} />
                </Provider>
            </body>
        </html>
    );
}
