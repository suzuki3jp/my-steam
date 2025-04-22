import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Roboto } from "next/font/google";

export const fontMono = GeistMono;
export const fontSans = GeistSans;
export const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});
