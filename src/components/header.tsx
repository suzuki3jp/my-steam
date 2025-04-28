import type { TFunction } from "i18next";
import { Github, Menu } from "lucide-react";
import Link from "next/link";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GITHUB_LINK } from "@/constants";

export interface HeaderProps {
    t: TFunction;
}

export function Header({ t }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                <div className="flex gap-2 items-center text-xl font-bold">
                    <Icon />
                    MySteam
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-4">
                    <Link
                        href="#features"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {t("header.features")}
                    </Link>
                    <Link
                        href="#examples"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {t("header.examples")}
                    </Link>
                    <Link
                        href="#api"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {t("header.api")}
                    </Link>
                    <Link href="https://github.com" target="_blank">
                        <Button variant="ghost" size="icon">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">{t("header.menu")}</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[250px] sm:w-[300px] px-4"
                    >
                        <nav className="flex flex-col gap-4 mt-8">
                            <Link
                                href="#features"
                                className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
                            >
                                {t("header.features")}
                            </Link>
                            <Link
                                href="#examples"
                                className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
                            >
                                {t("header.examples")}
                            </Link>
                            <Link
                                href="#api"
                                className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
                            >
                                {t("header.api")}
                            </Link>
                            <Link
                                href={GITHUB_LINK}
                                target="_blank"
                                className="flex items-center gap-2"
                            >
                                <Github className="h-5 w-5" />
                                {t("header.github")}
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
