import { Card } from "@/lib/card/card";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const lang = searchParams.get("lang") ?? undefined;
    const size = searchParams.get("size") ?? undefined;

    if (!id) {
        return new Response("Missing required parameter: id", {
            status: 400,
        });
    }

    const card = new Card({
        id,
        lang,
        size,
    });
    const svg = await card.render();

    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
