import type { TFunction } from "i18next";
import {
    Code,
    Database,
    Github,
    ImageIcon,
    LineChart,
    Zap,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export interface FeaturesSectionProps {
    t: TFunction;
}

export function FeaturesSection({ t }: FeaturesSectionProps) {
    return (
        <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
            <div className="container px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                            {t("features-section.word")}
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            {t("features-section.title")}
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {t("features-section.description")}
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <ImageIcon className="h-10 w-10 text-purple-600" />
                            <CardTitle className="mt-4">
                                {t("features-section.profile-card-gen.title")}
                            </CardTitle>
                            <CardDescription>
                                {t(
                                    "features-section.profile-card-gen.description",
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                {t("features-section.profile-card-gen.content")}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Code className="h-10 w-10 text-blue-500" />
                            <CardTitle className="mt-4">
                                {t("features-section.dynamic-svg.title")}
                            </CardTitle>
                            <CardDescription>
                                {t("features-section.dynamic-svg.description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{t("features-section.dynamic-svg.content")}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Github className="h-10 w-10" />
                            <CardTitle className="mt-4">
                                {t("features-section.open-source.title")}
                            </CardTitle>
                            <CardDescription>
                                {t("features-section.open-source.description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{t("features-section.open-source.content")}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
