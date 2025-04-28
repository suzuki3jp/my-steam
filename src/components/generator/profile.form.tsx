"use client";

import type { TFunction } from "i18next";
import { RefreshCw } from "lucide-react";

import { generateCard } from "@/actions/generateCard";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CARD_SIZE_TYPE } from "@/lib/card/card";

export interface ProfileFormProps {
    t: TFunction;
    steamId: string;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    setSteamId: (id: string) => void;
    setPreviewCard: (card: string) => void;
    size: CARD_SIZE_TYPE;
    language: string;
}

export function ProfileForm({
    t,
    steamId,
    setSteamId,
    isLoading,
    setLoading,
    setPreviewCard,
    language,
    size,
}: ProfileFormProps) {
    async function handleSubmit() {
        setLoading(true);
        const card = await generateCard(steamId, language, size);
        setPreviewCard(card);
        setLoading(false);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("generator.profile-form.title")}</CardTitle>
                <CardDescription>
                    {t("generator.profile-form.description")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="steam-id">
                        {t("generator.profile-form.steam-id.label")}
                    </Label>
                    <Input
                        id="steam-id"
                        placeholder={t(
                            "generator.profile-form.steam-id.placeholder",
                        )}
                        value={steamId}
                        onChange={(e) => setSteamId(e.target.value)}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={!steamId || isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            {t("generator.profile-form.generating")}
                        </>
                    ) : (
                        t("generator.profile-form.generate")
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
