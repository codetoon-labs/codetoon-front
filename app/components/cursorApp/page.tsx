'use client';
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function App() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring configuration
    const springConfig = { damping: 15, stiffness: 500, mass: 0.5 };
    const circleX = useSpring(mouseX, springConfig);
    const circleY = useSpring(mouseY, springConfig);

    useEffect(() => {
        function handleMove(e: PointerEvent) {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        }

        window.addEventListener("pointermove", handleMove);
        return () => {
            window.removeEventListener("pointermove", handleMove);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            data-cursor-follower
            className="cursor-follower-element"
            style={{
                position: "fixed",
                background:
                    "linear-gradient(211deg, rgba(251, 241, 184, 0.6) , rgba(158, 198, 227, 0.6) )",
                borderRadius: "50%",
                x: circleX,
                y: circleY,
                translateX: "-50%",
                translateY: "-50%",
                pointerEvents: "none",
                filter: "blur(50px)",
                width: 200,
                height: 200,
                zIndex: 2,
                willChange: "transform",
            }}
        />
    );
}
