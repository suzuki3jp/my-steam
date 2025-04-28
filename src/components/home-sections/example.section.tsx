import type { TFunction } from "i18next";
import Image from "next/image";

import LargeImage from "@/assets/large.png";
import MediumImage from "@/assets/medium.png";
import SmallImage from "@/assets/small.png";

export interface ExampleSectionProps {
    t: TFunction;
}

export function ExampleSection({ t }: ExampleSectionProps) {
    return (
        <section id="examples" className="w-full py-12 md:py-24 lg:py-32">
            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                            {t("examples-section.word")}
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            {t("examples-section.title")}
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {t("examples-section.description")}
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 py-12 sm:grid-cols-2">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="overflow-hidden rounded-lg border bg-background p-2 shadow-lg w-full">
                                <Image
                                    src={SmallImage}
                                    width={400}
                                    height={200}
                                    alt="Small steam profile card"
                                    className="rounded w-full h-auto"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold">
                                    {t("examples-section.small.title")}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {t("examples-section.small.description")}
                                </p>
                                <div className="mt-2 overflow-x-auto">
                                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm">
                                        https://my-steam.suzuki3.jp/api/card?id=YOUR_STEAM_ID&size=small
                                    </code>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-lg border bg-background p-2 shadow-lg w-full">
                            <Image
                                src={MediumImage}
                                width={400}
                                height={200}
                                alt="Medium steam profile card"
                                className="rounded w-full h-auto"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold">
                                {t("examples-section.medium.title")}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {t("examples-section.medium.description")}
                            </p>
                            <div className="mt-2 overflow-x-auto">
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm">
                                    https://my-steam.suzuki3.jp/api/card?id=YOUR_STEAM_ID&size=medium{" "}
                                </code>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="overflow-hidden rounded-lg border bg-background p-2 shadow-lg w-full">
                            <Image
                                src={LargeImage}
                                width={400}
                                height={200}
                                alt="Large steam profile card"
                                className="rounded w-full h-auto"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold">
                                {t("examples-section.large.title")}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {t("examples-section.large.description")}
                            </p>
                            <div className="mt-2 overflow-x-auto">
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm">
                                    https://my-steam.suzuki3.jp/api/card?id=YOUR_STEAM_ID&size=large
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
