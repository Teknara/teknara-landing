import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StickySection({
    children,
    className = "",
    zIndex = 1,
    scaleEffect = true,
    dimEffect = true,
    scrollDistance = "h-[150vh]" // Adjusts how long the section stays pinned
}) {
    const containerRef = useRef(null);

    // Track the scroll progress of this specific container wrapper
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // As the user scrolls past this section, scale it down slightly (1 -> 0.92)
    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        scaleEffect ? [1, 0.92] : [1, 1]
    );

    // Dim the outgoing section so the incoming section pops (opacity 1 -> 0.4)
    const opacity = useTransform(
        scrollYProgress,
        [0, 1],
        dimEffect ? [1, 0.4] : [1, 1]
    );

    // Add a subtle blur to the background section as it gets covered
    const blur = useTransform(
        scrollYProgress,
        [0, 1],
        scaleEffect ? ["0px", "10px"] : ["0px", "0px"]
    );

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${scrollDistance} ${className}`}
            style={{ zIndex }}
        >
            <motion.div
                style={{ scale, opacity, filter: `blur(${blur})` }}
                className="sticky top-0 h-screen w-full overflow-hidden origin-top shadow-[0_-10px_50px_rgba(0,0,0,0.8)]"
            >
                {children}
            </motion.div>
        </div>
    );
}