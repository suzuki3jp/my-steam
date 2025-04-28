import Image, { type ImageProps } from "next/image";

import IconImage from "@/assets/icon.png";

export interface IconProps extends Omit<ImageProps, "src" | "alt"> {}

export function Icon(props: IconProps) {
    return (
        <Image
            {...props}
            src={IconImage}
            alt="MySteam icon"
            width={40}
            height={40}
        />
    );
}
