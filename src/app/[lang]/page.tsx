import { useServerT } from "@/i18n/server";

export default async function Home({
    params: { lang },
}: { params: { lang: string } }) {
    const { t } = await useServerT(lang);

    return <h1 style={{ fontWeight: "bold" }}>{t("coming-soon")}</h1>;
}
