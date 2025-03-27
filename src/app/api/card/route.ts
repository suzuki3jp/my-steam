import chromium from "@sparticuz/chromium";
import { type NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export async function GET(request: NextRequest) {
    try {
        const browser = await puppeteer.launch({
            headless: chromium.headless,
            defaultViewport: chromium.defaultViewport,
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            ignoreDefaultArgs: true,
        });
        const page = await browser.newPage();

        await page.setViewport({
            width: 400,
            height: 150,
            deviceScaleFactor: 2,
        });

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");
        const lang = searchParams.get("lang");
        const size = searchParams.get("size");

        const url = new URL(request.url);
        const origin = url.origin;
        let cardUrl = origin;
        if (lang) cardUrl = `${cardUrl}/${lang}`;
        cardUrl = `${cardUrl}/card`;
        if (id) cardUrl = `${cardUrl}?id=${id}`;
        if (size) cardUrl = `${cardUrl}&size=${size}`;
        console.log(cardUrl);

        // Navigate to the card page
        await page.goto(cardUrl, {
            waitUntil: "networkidle0",
        });

        const imageBuffer = await page.screenshot({
            type: "png",
            omitBackground: true,
        });

        await browser.close();

        return new NextResponse(imageBuffer, {
            headers: {
                "Content-Type": "image/png",
            },
        });
    } catch (error) {
        console.error("Error converting to JPEG:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
