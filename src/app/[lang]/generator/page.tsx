import type { SSRProps } from "@/types";

import { Generator } from "@/components/generator/generator";

export default async function ({ params }: SSRProps) {
    return (
        <main className="flex-1 py-8 md:py-12 flex items-center justify-center min-h-screen">
            <div className="container px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                    <Generator />
                </div>
            </div>
        </main>
    );
}
