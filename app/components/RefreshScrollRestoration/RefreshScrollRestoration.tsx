"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
    const pathname = usePathname();
    const firstLoad = useRef(true);

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
            window.scrollTo({ top: 0 });
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    return null;
}
