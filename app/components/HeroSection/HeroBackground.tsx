"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/provider";

export default function HeroBackground() {
    const { t } = useI18n();
    return (
        <div className="absolute inset-0 bottom-[15%] sm:bottom-[5%] lg:top-[12%] flex items-center justify-center pointer-events-none z-0">
            <div className="relative w-[430px] h-[430px] lg:w-[620px] lg:h-[620px]">
                <Image
                    src="/hero-logo.webp"
                    alt={t.home.hero.backgroundAlt}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 430px, (max-width: 1200px) 620px, 620px"
                    className="object-contain select-none hero-bg-float"
                />
            </div>
        </div>
    );
}