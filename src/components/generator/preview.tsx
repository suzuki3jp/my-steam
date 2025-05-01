"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CARD_SIZE_TYPE } from "@/lib/card/card";
import type { TFunction } from "i18next";
import { Icon } from "../icon";
import { Button } from "../ui/button";

export interface PreviewProps {
    t: TFunction;
    steamId: string;
    generatedUrl: string;
    size: CARD_SIZE_TYPE;
    isLoading: boolean;
    previewCard: string;
}

export function Preview({
    t,
    steamId,
    generatedUrl,
    size,
    isLoading,
    previewCard,
}: PreviewProps) {
    async function downloadViaImage() {
        try {
            const dataUrl = await clientSvgToPng();
            const response = await fetch(dataUrl);
            const blob = await response.blob();

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `mysteam-${steamId}-${size}.png`;
            a.style.display = "none";

            document.body.appendChild(a);
            a.click();

            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading PNG:", error);
        }
    }

    return (
        <div className="space-y-6">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>{t("generator.preview.title")}</CardTitle>
                    <CardDescription>
                        {t("generator.preview.description")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center">
                    {steamId ? (
                        <div className="w-full max-w-md mx-auto">
                            {isLoading ? (
                                <div
                                    className="relative w-full overflow-hidden rounded-lg border bg-background shadow-md"
                                    style={{
                                        height:
                                            size === "small"
                                                ? 150
                                                : size === "medium"
                                                  ? 184
                                                  : size === "large"
                                                    ? 490
                                                    : undefined,
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-muted" />
                                </div>
                            ) : (
                                <div
                                    id="preview-card"
                                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                    dangerouslySetInnerHTML={{
                                        __html: previewCard,
                                    }}
                                />
                            )}

                            <div className="mt-6 space-y-4">
                                {!isLoading ? (
                                    <div className="space-y-2">
                                        <Label>
                                            {t(
                                                "generator.preview.download-img",
                                            )}
                                        </Label>
                                        <Button onClick={downloadViaImage}>
                                            {t("generator.preview.download")}
                                        </Button>
                                    </div>
                                ) : null}
                                <div className="space-y-2">
                                    <Label>{t("generator.preview.url")}</Label>
                                    <div className="flex">
                                        <Input
                                            readOnly
                                            value={generatedUrl}
                                            className="font-mono text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>
                                        {t("generator.preview.markdown")}
                                    </Label>
                                    <Input
                                        readOnly
                                        value={
                                            generatedUrl
                                                ? `![MySteam Profile](${generatedUrl})`
                                                : ""
                                        }
                                        className="font-mono text-xs"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>{t("generator.preview.html")}</Label>
                                    <Input
                                        readOnly
                                        value={
                                            generatedUrl
                                                ? `<img src="${generatedUrl}" alt="MySteam Profile" />`
                                                : ""
                                        }
                                        className="font-mono text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Icon className="h-16 w-16 mx-auto text-muted-foreground/50" />
                            <p className="mt-4 text-muted-foreground">
                                {t("generator.preview.before-enter")}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

async function clientSvgToPng(): Promise<string> {
    return new Promise((resolve, reject) => {
        const svg = document.body
            .querySelector("#preview-card")
            ?.getElementsByTagName("svg")[0];

        if (!svg) {
            reject(new Error("SVG not found"));
            return;
        }

        // なぜか space 系のクラスが適用されないので、手動でスタイルを追加
        // Tailwindのスタイルをインライン化
        const spaceStyles = `
            .space-x-1 > * + * { margin-left: 4px !important; }
            .space-y-1 > * + * { margin-top: 4px !important; }
            .space-y-2 > * + * { margin-top: 0.5rem !important; }
        `;

        // SVGにスタイルを追加
        const styleElement = document.createElement("style");
        styleElement.textContent = spaceStyles;
        svg.appendChild(styleElement);

        // SVGをUTF-8対応のbase64エンコードされたデータURLに変換
        const svgData = new XMLSerializer().serializeToString(svg);

        // スタイル要素を削除（元のSVGを元に戻す）
        svg.removeChild(styleElement);

        const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)));
        const svgDataUrl = `data:image/svg+xml;base64,${svgDataBase64}`;

        // ...existing code...
        const canvas = document.createElement("canvas");
        canvas.width = Number.parseInt(svg.getAttribute("width") || "1200");
        canvas.height = Number.parseInt(svg.getAttribute("height") || "630");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };

        img.onerror = () => {
            reject(new Error("Failed to load SVG"));
        };

        img.src = svgDataUrl;
    });
}
