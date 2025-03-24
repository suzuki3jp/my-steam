import { useServerT } from "@/i18n/server";
import { ApiClient } from "@/steam-api/ApiClient";
import { STEAM_API_SCHEMAS } from "@/steam-api/schemas";
import type { SSRProps } from "@/types";

const CARD_WIDTH = 400;
const CARD_HEIGHT = 150;
const CARD_MARGIN = 10;
const AVAIABLE_WIDTH = CARD_WIDTH - CARD_MARGIN * 2;
const CARD_ICON_WIDTH = 60;
const SPACE_1_PX = 4;
const RECENTLY_PLAYED_GAMES_ARIA_WIDTH =
    AVAIABLE_WIDTH - CARD_ICON_WIDTH - SPACE_1_PX;

export default async function Card({
    searchParams,
    params,
}: CardProps & SSRProps) {
    const { t } = await useServerT((await params).lang);

    const { id } = await searchParams;
    const parsedId = STEAM_API_SCHEMAS.id.parse(id);

    const client = new ApiClient();
    const usersResponse = await client.getSteamUser(parsedId);
    const user = usersResponse.response.players[0];

    // Get recently played games
    const recentlyPlayedGamesRes =
        await client.getRecentlyPlayedGames(parsedId);
    const fullGamePromises = recentlyPlayedGamesRes.response.games.map(
        async (game) => {
            const appId = game.appid.toString();
            const playtime = game.playtime_2weeks;
            const appDetail = (await client.getAppDetails(appId))[appId];

            return {
                id: appId,
                name: appDetail.data.name,
                header: appDetail.data.header_image,
                playtime,
            };
        },
    );
    const fullGames = await Promise.all(fullGamePromises);
    const sortedFullGames = fullGames.sort((a, b) => b.playtime - a.playtime);
    const twoWeeksTotal = Math.floor(
        sortedFullGames.reduce((acc, game) => acc + game.playtime, 0) / 60,
    );

    // Get owned games
    const displayingOwnedGamesLength = 5;
    const ownedGamesRes = await client.getOwnedGames(parsedId);
    const ownedGamesTotal = ownedGamesRes.response.game_count;
    const ownedGames = ownedGamesRes.response.games;
    const sortedOwnedGames = ownedGames.sort(
        (a, b) => b.playtime_forever - a.playtime_forever,
    );
    const displayOwnedGames = sortedOwnedGames.slice(
        0,
        displayingOwnedGamesLength,
    );
    const fullDisplayGamePromises = displayOwnedGames.map(async (game) => {
        const appId = game.appid.toString();
        const playtime = game.playtime_forever;
        const appDetail = (await client.getAppDetails(appId))[appId];

        return {
            id: appId,
            name: appDetail.data.name,
            header: appDetail.data.header_image,
            playtime,
        };
    });
    const fullDisplayGames = await Promise.all(fullDisplayGamePromises);

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
                                            time: twoWeeksTotal,
                                        })}
                                    </p>
                                </div>
                                <div className="flex space-x-1">
                                    {sortedFullGames.map((game) => {
                                        const itemWidth = Math.floor(
                                            (RECENTLY_PLAYED_GAMES_ARIA_WIDTH -
                                                SPACE_1_PX *
                                                    (sortedFullGames.length -
                                                        1)) /
                                                sortedFullGames.length,
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
                                    displaying: displayingOwnedGamesLength,
                                    total: ownedGamesTotal,
                                })}
                            </p>

                            <div className="flex space-x-1">
                                {fullDisplayGames.map((game) => {
                                    const itemWidth =
                                        (AVAIABLE_WIDTH -
                                            SPACE_1_PX *
                                                (fullDisplayGames.length - 1)) /
                                        fullDisplayGames.length;

                                    return (
                                        <img
                                            src={game.header}
                                            key={game.id}
                                            alt={game.name}
                                            style={{ width: `${itemWidth}px` }}
                                        />
                                    );
                                })}
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
    }>;
}
