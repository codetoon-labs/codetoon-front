'use client';
import { useState, useEffect, useRef } from "react";

export default function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(1);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        function handleMove(e: PointerEvent) {
            setPosition({ x: e.clientX, y: e.clientY });

            // Calculate opacity based on main footer content position
            const footer = document.querySelector('footer');

            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const cursorY = e.clientY;

                // لو الماوس داخل الفوتر
                if (cursorY >= footerRect.top && cursorY <= footerRect.bottom) {
                    setOpacity(0);
                } else {
                    setOpacity(1);
                }
            }
        }
        window.addEventListener("pointermove", handleMove);
        return () => window.removeEventListener("pointermove", handleMove);
    }, []);

    useEffect(() => {
        function animate() {
            setCirclePos((prev) => {
                const dx = position.x - prev.x;
                const dy = position.y - prev.y;
                return {
                    x: prev.x + dx * 0.99, // speed of cursor
                    y: prev.y + dy * 0.99,
                };
            });
            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [position]);

    return (
        <div
            style={{
                position: "fixed",
                background:
                    "linear-gradient(211deg, rgba(251, 241, 184, 0.6) , rgba(158, 198, 227, 0.6) )",
                borderRadius: "50%",
                transform: `translate(${circlePos.x}px, ${circlePos.y}px)`,
                pointerEvents: "none",
                filter: "blur(50px)",
                left: -100,
                top: -100,
                width: 200,
                height: 200,
                opacity: opacity,
            }}
        />
    );
}