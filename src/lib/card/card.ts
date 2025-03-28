import * as d3 from "d3";
import { JSDOM } from "jsdom";
import { z } from "zod";

import { useServerT } from "@/i18n/server";
import { STEAM_API_SCHEMAS } from "@/steam-api/schemas";
import { getOwnedGames, getRecentlyPlayedGames, getUser } from "./utils";

export class Card {
    private readonly id: string;
    private readonly lang: string;
    private readonly size: CARD_SIZE_TYPE;
    constructor({ id, lang = "en", size = "small" }: CardOptions) {
        this.id = STEAM_API_SCHEMAS.id.parse(id);
        this.lang = lang;
        this.size = CARD_SIZE_SCHEMA.parse(size);
    }

    /**
     * Calculate the dimensions of the card based on the size
     * @returns Dimensions in pixels
     */
    private getDimensions(): { width: number; height: number } {
        return {
            width: 400,
            height:
                this.size === "large"
                    ? 490
                    : this.size === "medium"
                      ? 184
                      : 150,
        };
    }

    private getHowManyGamesToShow(): number {
        return this.size === "large" ? 50 : this.size === "medium" ? 10 : 5;
    }

    private chunkArray<T>(arr: T[], chunkSize: number): T[][] {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }

    private async fetchDataForCard() {
        const user = await getUser(this.id);
        const recentlyGames = await getRecentlyPlayedGames(this.id);
        const ownedGames = await getOwnedGames(
            this.id,
            this.getHowManyGamesToShow(),
        );
        return { user, recentlyGames, ownedGames };
    }

    private renderDom(
        data: Awaited<ReturnType<Card["fetchDataForCard"]>> & {
            t: Awaited<ReturnType<typeof useServerT>>["t"];
        },
    ): string {
        const { t, user, recentlyGames, ownedGames } = data;
        const { width, height } = this.getDimensions();
        const chunkedOwnedGames = this.chunkArray(ownedGames.games, 5);

        const CARD_MARGIN = 10;
        const AVAILABLE_WIDTH = width - CARD_MARGIN * 2;
        const CARD_ICON_WIDTH = 60;
        const SPACE_1_PX = 4;
        const RECENTLY_PLAYED_GAMES_ARIA_WIDTH =
            AVAILABLE_WIDTH - CARD_ICON_WIDTH - SPACE_1_PX;

        // > use fake dom let us can get html element
        // https://github.com/vn7n24fzkq/github-profile-summary-cards/blob/257eb2caef4019d7aaf9b67e276f1f88f3e8b723/src/templates/card.ts#L18
        // I don't know why
        const fakeDom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
        const body = d3.select(fakeDom.window.document).select("body");

        // Render the card frame
        const svg = body
            .append("div")
            .attr("class", "container")
            .append("svg")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "bg-gray-800 rounded-md");

        svg.append("title").text(`Steam user card for ${user.personaname}`);

        const foreign = svg
            .append("foreignObject")
            .attr("width", width)
            .attr("height", height);

        // Add classes from tailwindcss
        foreign.append("style").text(`
            * {
                font-family: "Yu Gothic UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            }

            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .items-center { align-items: center; }
            .items-end { align-items: flex-end; }
            .space-x-1 > * + * { margin-left: 4px; }
            .space-y-1 > * + * { margin-top: 4px; }
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .rounded-md { border-radius: 0.375rem; }
            .bg-gray-800 { background-color: rgb(31 41 55); }
            .text-white { color: white; }
            .text-sm { font-size: 0.875rem; }
            .text-xs { font-size: 0.75rem; }
            .font-bold { font-weight: 700; }
            .justify-between { justify-content: space-between; }
            .w-full { width: 100%; }
            .h-full { height: 100%; }
            p { margin: 0 0 0 0; }
            `);

        const container = foreign
            .append("div")
            .attr("xmlns", "http://www.w3.org/1999/xhtml")
            .attr("class", "flex items-center")
            .style("margin", `${CARD_MARGIN}px`)
            .style("width", `${width - CARD_MARGIN * 2}px`)
            .style("height", `${height - CARD_MARGIN * 2}px`)
            .append("div")
            .attr("class", "space-y-2 h-full");

        const topContainer = container
            .append("div")
            .attr("class", "flex space-x-1");

        // Render the card user icon
        topContainer
            .append("img")
            .attr("width", CARD_ICON_WIDTH)
            .attr("src", user.avatarmedium)
            .attr("alt", "User icon")
            .attr("class", "rounded-md");

        // Render the card user name and recently played games
        const topRightContainer = topContainer
            .append("div")
            .attr("class", "w-full flex flex-col space-y-1");

        const topRightTextContainer = topRightContainer
            .append("div")
            .attr("class", "text-white flex justify-between items-end")
            .style("height", "20px");

        topRightTextContainer
            .append("p")
            .attr("class", "text-sm font-bold")
            .text(user.personaname);
        topRightTextContainer
            .append("p")
            .attr("class", "text-xs")
            .text(
                t("playtime-past-2-weeks", {
                    time: recentlyGames.twoWeeksPlaytimeTotal,
                }),
            );

        const topRightImageContainer = topRightContainer
            .append("div")
            .attr("class", "flex space-x-1")
            .style("height", "35px");

        for (const game of recentlyGames.games) {
            const itemWidth = Math.floor(
                (RECENTLY_PLAYED_GAMES_ARIA_WIDTH -
                    SPACE_1_PX * (recentlyGames.games.length - 1)) /
                    recentlyGames.games.length,
            );

            topRightImageContainer
                .append("img")
                .attr("src", game.header)
                .attr("key", game.id)
                .attr("alt", game.name)
                .style("width", `${itemWidth}px`);
        }

        // Render the owned games
        const bottomContainer = container
            .append("div")
            .attr("class", "flex flex-col space-y-1")
            .style("height", "54px");

        bottomContainer
            .append("p")
            .attr("class", "text-white text-xs")
            .text(
                t("owned-games", {
                    displaying: ownedGames.current,
                    total: ownedGames.total,
                }),
            );

        const bottomImageContainer = bottomContainer
            .append("div")
            .attr("class", "space-y-1");

        for (const chunk of chunkedOwnedGames) {
            const chunkContainer = bottomImageContainer
                .append("div")
                .attr("class", "flex space-x-1");

            for (const game of chunk) {
                const itemWidth =
                    (AVAILABLE_WIDTH - SPACE_1_PX * (chunk.length - 1)) /
                    chunk.length;

                chunkContainer
                    .append("img")
                    .attr("src", game.header)
                    .attr("key", game.id)
                    .attr("alt", game.name)
                    .style("width", `${itemWidth}px`);
            }
        }

        return body.select(".container").html();
    }

    public async render(): Promise<string> {
        const { t } = await useServerT(this.lang);
        const data = await this.fetchDataForCard();
        return this.renderDom({ ...data, t });
    }
}

export interface CardOptions {
    id: string;
    lang?: string;
    size?: string;
}

export const CARD_SIZE_SCHEMA = z.enum(["small", "medium", "large"]);
export type CARD_SIZE_TYPE = z.infer<typeof CARD_SIZE_SCHEMA>;
