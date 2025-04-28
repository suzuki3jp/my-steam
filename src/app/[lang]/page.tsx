import type { SSRProps } from "@/types";

import { FeaturesSection } from "@/components/home-sections/features.section";
import { HeroSection } from "@/components/home-sections/hero.section";
import { useServerT } from "@/i18n/server";

export default async function Home({ params }: SSRProps) {
    const { lang } = await params;
    const { t } = await useServerT(lang);

    return (
        <main>
            <HeroSection t={t} />
            <FeaturesSection t={t} />
        </main>
    );
}
