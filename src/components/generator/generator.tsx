"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useT } from "@/i18n/client";
import type { CARD_SIZE_TYPE } from "@/lib/card/card";
import { OptionsForm } from "./options.form";
import { Preview } from "./preview";
import { ProfileForm } from "./profile.form";

export function Generator() {
    const path = usePathname();
    const lang = path.split("/")[1];
    const { t } = useT(lang);
    const [steamId, setSteamId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [size, setSize] = useState<CARD_SIZE_TYPE>("small");
    const [language, setLanguage] = useState(lang);
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [previewCard, setPreviewCard] = useState("");

    useEffect(() => {
        if (!steamId) {
            setGeneratedUrl("");
            return;
        }

        const baseUrl = "https://my-steam.suzuki3.jp/api/card";
        const params = new URLSearchParams();

        params.append("id", steamId);
        params.append("lang", language);
        params.append("size", size);

        setGeneratedUrl(`${baseUrl}?${params.toString()}`);
    }, [steamId, language, size]);

    return (
        <>
            <div className="space-y-6">
                <ProfileForm
                    t={t}
                    steamId={steamId}
                    setSteamId={setSteamId}
                    isLoading={isLoading}
                    setLoading={setIsLoading}
                    setPreviewCard={setPreviewCard}
                    size={size}
                    language={language}
                />
                <OptionsForm
                    t={t}
                    language={language}
                    setLanguage={setLanguage}
                    size={size}
                    setSize={setSize}
                />
            </div>

            <div className="space-y-6">
                <Preview
                    t={t}
                    steamId={steamId}
                    generatedUrl={generatedUrl}
                    size={size}
                    isLoading={isLoading}
                    previewCard={previewCard}
                />
            </div>
        </>
    );
}
