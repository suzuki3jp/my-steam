import { z } from "zod";

/**
 * Docs: https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_(v0002)
 */
export const STEAM_API_SCHEMAS = {
    /**
     * Steam ID
     * 64bit SteamID of the user
     * @example "76561199481414497"
     */
    id: z.string().regex(/^\d{17}$/, {
        message: "Steam ID must be exactly 17 digits",
    }),

    /**
     * Steam user name
     */
    name: z.string(),

    /**
     * URL
     * For profile URL, avatar URL, etc.
     */
    url: z.string().url(),

    /**
     * Integer
     * For integer values
     */
    int: z.number().int(),
};

export const STEAM_API_RESPONSE_SCHEMAS = {
    /**
     * This schema will define minimum required fields for the app
     * This schema will NOT define all fields available in the response
     */
    GetPlayerSummariesResponse: z.object({
        response: z.object({
            players: z.array(
                z.object({
                    steamid: STEAM_API_SCHEMAS.id,
                    personaname: STEAM_API_SCHEMAS.name,
                    profileurl: STEAM_API_SCHEMAS.url,
                    avatar: STEAM_API_SCHEMAS.url,
                    avatarmedium: STEAM_API_SCHEMAS.url,
                    avatarfull: STEAM_API_SCHEMAS.url,
                }),
            ),
        }),
    }),

    /**
     * This schema will define minimum required fields for the app
     * This schema will NOT define all fields available in the response
     */
    GetRecentlyPlayedGamesResponse: z.object({
        response: z.object({
            total_count: STEAM_API_SCHEMAS.int,
            games: z.array(
                z.object({
                    appid: STEAM_API_SCHEMAS.int,
                    name: STEAM_API_SCHEMAS.name,
                    playtime_2weeks: STEAM_API_SCHEMAS.int,
                    playtime_forever: STEAM_API_SCHEMAS.int,
                }),
            ),
        }),
    }),

    /**
     * This schema will define minimum required fields for the app
     * This schema will NOT define all fields available in the response
     */
    GetOwnedGamesResponse: z.object({
        response: z.object({
            game_count: STEAM_API_SCHEMAS.int,
            games: z.array(
                z.object({
                    appid: STEAM_API_SCHEMAS.int,
                    playtime_forever: STEAM_API_SCHEMAS.int,
                }),
            ),
        }),
    }),

    /**
     * This schema will define minimum required fields for the app
     * This schema will NOT define all fields available in the response
     */
    AppDetailsResponse: z.record(
        z.string(),
        z.object({
            data: z.object({
                name: STEAM_API_SCHEMAS.name,
                header_image: STEAM_API_SCHEMAS.url,
            }),
        }),
    ),
};
