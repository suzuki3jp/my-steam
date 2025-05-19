import { FadeIn } from "@playlistwizard/shared-ui";
import type { TFunction } from "i18next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";

import LargeImage from "@/assets/large.png";
import { Button } from "@/components/ui/button";
import { GITHUB_LINK } from "@/constants";

export interface HeroSectionProps {
    t: TFunction;
}

export function HeroSection({ t }: HeroSectionProps) {
    return (
        // Adjust lg:py-32
        <section className="w-full py-12 lg:py-32 bg-gradient-to-b from-background to-background/90 flex items-center justify-center">
            <div className="container px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_500px]">
                    <FadeIn
                        direction="left"
                        className="flex flex-col justify-center space-y-4"
                        delay={0.1}
                    >
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                                <Trans
                                    i18nKey={"hero-section.title"}
                                    components={{
                                        1: (
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500" />
                                        ),
                                    }}
                                    t={t}
                                />
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-xl">
                                {t("hero-section.description")}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/generator"
                                className="w-full sm:w-auto"
                            >
                                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                                    {t("hero-section.get-started")}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link
                                href={GITHUB_LINK}
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    {t("hero-section.view-source")}
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>

                    <FadeIn
                        direction="right"
                        delay={0.3}
                        className="mx-auto flex items-center justify-center w-full max-w-[400px] lg:max-w-[600px]"
                    >
                        <div className="relative w-full rounded-lg border bg-background p-2 shadow-xl">
                            <Image
                                src={LargeImage}
                                width={400}
                                height={490}
                                alt="MySteam Profile example"
                                className="rounded border bg-muted w-full h-auto"
                            />
                            <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full border bg-background" />
                            <div className="absolute -bottom-3 -right-3 h-6 w-6 rounded-full border bg-background" />
                            <div className="absolute -top-3 -left-3 h-6 w-6 rounded-full border bg-background" />
                            <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full border bg-background" />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
