"use client";

import type { TFunction } from "i18next";
import type React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { CARD_SIZE_TYPE } from "@/lib/card/card";

export interface OptionsFormProps {
    t: TFunction;
    language: string;
    setLanguage: (lang: string) => void;
    size: CARD_SIZE_TYPE;
    setSize: (size: CARD_SIZE_TYPE) => void;
}

export function OptionsForm({
    t,
    language,
    setLanguage,
    size,
    setSize,
}: OptionsFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("generator.options.title")}</CardTitle>
                <CardDescription>
                    {t("generator.options.description")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>{t("generator.options.language.label")}</Label>
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                            <SelectValue
                                placeholder={t(
                                    "generator.options.language.description",
                                )}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ja">日本語</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>{t("generator.options.size.label")}</Label>
                    <Select value={size} onValueChange={setSize}>
                        <SelectTrigger>
                            <SelectValue
                                placeholder={t(
                                    "generator.options.size.description",
                                )}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="small">
                                {t("generator.options.size.small")}
                            </SelectItem>
                            <SelectItem value="medium">
                                {t("generator.options.size.medium")}
                            </SelectItem>
                            <SelectItem value="large">
                                {t("generator.options.size.large")}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
