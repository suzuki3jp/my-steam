import type { TFunction } from "i18next";
import Link from "next/link";

import { GITHUB_LINK } from "@/constants";

export interface FooterProps {
    t: TFunction;
}

export function Footer({ t }: FooterProps) {
    return (
        <footer className="w-full border-t py-6 md:py-0 flex items-center justify-center">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} suzuki3jp. All rights
                    reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href={GITHUB_LINK}
                        target="_blank"
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                        GitHub
                    </Link>
                </div>
            </div>
        </footer>
    );
}
