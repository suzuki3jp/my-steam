import { useServerT } from "@/i18n/server";
import type { SSRProps } from "@/types";

export default async function Home({ params }: SSRProps) {
    const { lang } = await params;
    const { t } = await useServerT(lang);

    return <h1>{t("coming-soon")}</h1>;
}
