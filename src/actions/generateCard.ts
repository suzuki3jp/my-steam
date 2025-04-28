"use server";
import { type CARD_SIZE_TYPE, Card } from "@/lib/card/card";

export async function generateCard(
    id: string,
    lang: string,
    size: CARD_SIZE_TYPE,
) {
    const card = new Card({
        id,
        lang,
        size,
    });
    const svg = await card.render();

    return svg;
}
