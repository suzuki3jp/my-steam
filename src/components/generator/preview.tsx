"use client";
import type { TFunction } from "i18next";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

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
import { Icon } from "../icon";

export interface PreviewProps {
    t: TFunction;
    steamId: string;
    generatedUrl: string;
    size: CARD_SIZE_TYPE;
    isLoading: boolean;
    previewCard: string;
}

export function Preview({
    t,
    steamId,
    generatedUrl,
    size,
    isLoading,
    previewCard,
}: PreviewProps) {
    return (
        <div className="space-y-6">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>{t("generator.preview.title")}</CardTitle>
                    <CardDescription>
                        {t("generator.preview.description")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center">
                    {steamId ? (
                        <div className="w-full max-w-md mx-auto">
                            {isLoading ? (
                                <div
                                    className="relative w-full overflow-hidden rounded-lg border bg-background shadow-md"
                                    style={{
                                        height:
                                            size === "small"
                                                ? 150
                                                : size === "medium"
                                                  ? 184
                                                  : size === "large"
                                                    ? 490
                                                    : undefined,
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-muted" />
                                </div>
                            ) : (
                                <div
                                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                    dangerouslySetInnerHTML={{
                                        __html: previewCard,
                                    }}
                                />
                            )}

                            <div className="mt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label>{t("generator.preview.url")}</Label>
                                    <div className="flex">
                                        <Input
                                            readOnly
                                            value={generatedUrl}
                                            className="font-mono text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>
                                        {t("generator.preview.markdown")}
                                    </Label>
                                    <Input
                                        readOnly
                                        value={
                                            generatedUrl
                                                ? `![MySteam Profile](${generatedUrl})`
                                                : ""
                                        }
                                        className="font-mono text-xs"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>{t("generator.preview.html")}</Label>
                                    <Input
                                        readOnly
                                        value={
                                            generatedUrl
                                                ? `<img src="${generatedUrl}" alt="MySteam Profile" />`
                                                : ""
                                        }
                                        className="font-mono text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Icon className="h-16 w-16 mx-auto text-muted-foreground/50" />
                            <p className="mt-4 text-muted-foreground">
                                {t("generator.preview.before-enter")}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
