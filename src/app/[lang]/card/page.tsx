import { z } from "zod";

import { useServerT } from "@/i18n/server";
import { STEAM_API_SCHEMAS } from "@/steam-api/schemas";
import type { SSRProps } from "@/types";
import { getOwnedGames, getRecentlyPlayedGames, getUser } from "./utils";

export const CARD_SIZE_SCHEMA = z.enum(["small", "medium", "large"]);
export type CARD_SIZE_SCHEMA_TYPE = z.infer<typeof CARD_SIZE_SCHEMA>;

export default async function Card({
    searchParams,
    params,
}: CardProps & SSRProps) {
    const { lang } = await params;
    const { t } = await useServerT(lang);
    const { id, size } = await searchParams;
    const parsedId = STEAM_API_SCHEMAS.id.parse(id);
    const parsedSize = size ? CARD_SIZE_SCHEMA.parse(size) : "small";

    const CARD_WIDTH = 400;
    const CARD_HEIGHT =
        parsedSize === "large" ? 490 : parsedSize === "medium" ? 184 : 150;
    const CARD_MARGIN = 10;
    const AVAIABLE_WIDTH = CARD_WIDTH - CARD_MARGIN * 2;
    const CARD_ICON_WIDTH = 60;
    const SPACE_1_PX = 4;
    const RECENTLY_PLAYED_GAMES_ARIA_WIDTH =
        AVAIABLE_WIDTH - CARD_ICON_WIDTH - SPACE_1_PX;

    const user = await getUser(parsedId);
    const { twoWeeksPlaytimeTotal, games } =
        await getRecentlyPlayedGames(parsedId);
    const {
        current,
        total,
        games: ownedGames,
    } = await getOwnedGames(parsedId, parsedSize);
    const ownedGamesChunks = chunkArray(ownedGames, 5);

    return (
        <svg
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            xmlns="http://www.w3.org/2000/svg"
            className="bg-gray-800 rounded-md"
        >
            <title>{`Steam user card for ${user.personaname}`}</title>
            <foreignObject width={CARD_WIDTH} height={CARD_HEIGHT}>
                <div
                    className="flex items-center"
                    style={{
                        margin: `${CARD_MARGIN}px`,
                        width: `${CARD_WIDTH - CARD_MARGIN * 2}px`,
                        height: `${CARD_HEIGHT - CARD_MARGIN * 2}px`,
                    }}
                >
                    <div className="space-y-2">
                        <div className="flex space-x-1">
                            {/* User icon */}
                            <img
                                width={CARD_ICON_WIDTH}
                                src={user.avatarmedium}
                                alt="user icon"
                                className="rounded-md"
                            />

                            {/* Recently played games past 2 weeks */}
                            <div className="w-full flex flex-col space-y-1">
                                <div className="text-white flex justify-between items-end">
                                    <p className="text-sm font-bold">
                                        {user.personaname}
                                    </p>
                                    <p className="text-xs">
                                        {t("playtime-past-2-weeks", {
                                            time: twoWeeksPlaytimeTotal,
                                        })}
                                    </p>
                                </div>
                                <div className="flex space-x-1">
                                    {games.map((game) => {
                                        const itemWidth = Math.floor(
                                            (RECENTLY_PLAYED_GAMES_ARIA_WIDTH -
                                                SPACE_1_PX *
                                                    (games.length - 1)) /
                                                games.length,
                                        );

                                        return (
                                            <img
                                                src={game.header}
                                                key={game.id}
                                                alt={game.name}
                                                style={{
                                                    width: `${itemWidth}px`,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Owned games */}
                        <div className="flex flex-col space-y-1">
                            <p className="text-white text-xs">
                                {t("owned-games", {
                                    displaying: current,
                                    total,
                                })}
                            </p>

                            <div className="space-y-1">
                                {ownedGamesChunks.map((chunk, idx) => (
                                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                    <div key={idx} className="flex space-x-1">
                                        {chunk.map((game) => {
                                            const itemWidth =
                                                (AVAIABLE_WIDTH -
                                                    SPACE_1_PX *
                                                        (chunk.length - 1)) /
                                                chunk.length;

                                            return (
                                                <img
                                                    src={game.header}
                                                    key={game.id}
                                                    alt={game.name}
                                                    style={{
                                                        width: `${itemWidth}px`,
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </foreignObject>
        </svg>
    );
}

interface CardProps {
    searchParams: Promise<{
        id: string;
        size?: string;
    }>;
}

function chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
        array.slice(index * size, (index + 1) * size),
    );
}
