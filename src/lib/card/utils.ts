import { ApiClient } from "@/steam-api/ApiClient";

export async function getUser(id: string) {
    const client = new ApiClient();
    const usersResponse = await client.getSteamUser(id);
    return usersResponse.response.players[0];
}

export async function getRecentlyPlayedGames(id: string) {
    const client = new ApiClient();
    const recentlyPlayedGamesResponse = await client.getRecentlyPlayedGames(id);
    const fullGamePromises = recentlyPlayedGamesResponse.response.games.map(
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
    const games = fullGames.sort((a, b) => b.playtime - a.playtime);
    const twoWeeksPlaytimeTotal = Math.floor(
        games.reduce((acc, game) => acc + game.playtime, 0) / 60,
    );

    return { twoWeeksPlaytimeTotal, games };
}

export async function getOwnedGames(id: string, count: number) {
    const client = new ApiClient();
    const ownedGamesRes = await client.getOwnedGames(id);
    const total = ownedGamesRes.response.game_count;
    const ownedGames = ownedGamesRes.response.games;
    const sortedOwnedGames = ownedGames.sort(
        (a, b) => b.playtime_forever - a.playtime_forever,
    );
    const returningOwnedGames = sortedOwnedGames.slice(0, count);
    const fullReturingGamePromises = returningOwnedGames.map(async (game) => {
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
    const games = await Promise.all(fullReturingGamePromises);

    return { current: count, total, games };
}
