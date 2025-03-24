import { z } from "zod";
import { STEAM_API_RESPONSE_SCHEMAS } from "./schemas";

const steamApiKeySchema = z.string().regex(/^[0-9A-Z]{32}$/, {
    message: "Steam API key must be exactly 32 alphanumeric characters",
});

export class ApiClient {
    private key: string;

    constructor() {
        this.key = steamApiKeySchema.parse(process.env.STEAM_API_KEY);
    }

    /**
     * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_(v0002)
     * @param steamId
     * @returns
     */
    async getSteamUser(steamId: string | string[]) {
        const url = this.makeUrl("/ISteamUser/GetPlayerSummaries/v2/", {
            key: this.key,
            steamids: Array.isArray(steamId) ? steamId.join(",") : steamId,
        });
        console.log(url);
        const response = await fetch(url);
        return STEAM_API_RESPONSE_SCHEMAS.GetPlayerSummariesResponse.parse(
            await response.json(),
        );
    }

    /**
     * https://developer.valvesoftware.com/wiki/Steam_Web_API#GetRecentlyPlayedGames_(v0001)
     * @param steamId
     * @returns
     */
    async getRecentlyPlayedGames(steamId: string) {
        const url = this.makeUrl("/IPlayerService/GetRecentlyPlayedGames/v1/", {
            key: this.key,
            steamid: steamId,
        });
        const response = await fetch(url);
        return STEAM_API_RESPONSE_SCHEMAS.GetRecentlyPlayedGamesResponse.parse(
            await response.json(),
        );
    }

    async getAppDetails(appId: string) {
        const url = `https://store.steampowered.com/api/appdetails?appids=${
            appId
        }`;
        const response = await fetch(url);
        return STEAM_API_RESPONSE_SCHEMAS.AppDetailsResponse.parse(
            await response.json(),
        );
    }

    async getOwnedGames(steamId: string) {
        const url = this.makeUrl("/IPlayerService/GetOwnedGames/v1/", {
            key: this.key,
            steamid: steamId,
        });
        const response = await fetch(url);
        return STEAM_API_RESPONSE_SCHEMAS.GetOwnedGamesResponse.parse(
            await response.json(),
        );
    }

    /**
     * Make a URL with the given parameters
     * @param url
     * @param params
     * @returns
     */
    private makeUrl(url: string, params: Record<string, string>): string {
        const fullUrl = new URL(`https://api.steampowered.com${url}`);
        for (const [key, value] of Object.entries(params)) {
            fullUrl.searchParams.append(key, value);
        }
        return fullUrl.toString();
    }
}
