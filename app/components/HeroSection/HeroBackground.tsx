import Image from "next/image";

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 bottom-[15%] sm:bottom-[5%] lg:top-[12%] flex items-center justify-center pointer-events-none z-0">
            <div className="relative w-[430px] h-[430px] lg:w-[620px] lg:h-[620px]">
                <Image
                    src="/hero-logo.webp"
                    alt="hero-background"
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