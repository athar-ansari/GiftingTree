import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import pouringImg from '../assets/pouringImg.png';

export default function BehindTheArt() {
    const containerRef = useRef(null);

    // Track scroll progress strictly within this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // LAYER 1: The Image (Moves up slowly, creating a window effect)
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // LAYER 2: The Darkness/Vignette overlay (Fades in slightly as you scroll down)
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.8]);

    // LAYER 3: The Text (Moves up extremely fast, overtakes the image)
    const textY = useTransform(scrollYProgress, [0, 1], ["50%", "-80%"]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[60vh] md:h-screen min-h-[600px] overflow-hidden bg-[#0A0A0A] flex items-center justify-center font-notoSerif"
        >
            {/* Layer 1: Parallax Image */}
            <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 w-full h-[130%] -top-[15%] z-0"
            >
                <img
                    src={pouringImg}
                    alt="Artisan hand pouring premium clear epoxy resin into a custom floral mold"
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[30%] brightness-[70%]"
                />
            </motion.div>

            {/* Layer 2: Static lighting/gradients & Dynamic Vignette */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#1A2E1A] to-transparent z-[1] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#1A2E1A] to-transparent z-[1] pointer-events-none"></div>

            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-black z-[1] pointer-events-none mix-blend-multiply"
            ></motion.div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] z-[2] pointer-events-none"></div>


            {/* Layer 3: Ultra-Fast Foreground Content */}
            <motion.div
                style={{ y: textY }}
                className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center transform-gpu mt-24"
            >
                {/* Soft floating pill badge */}
                <div
                    className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8 shadow-2xl"
                >
                    <span className="text-[#D4E0CE] text-[9px] sm:text-[11px] tracking-[0.4em] uppercase font-semibold font-sans">
                        Behind The Art
                    </span>
                </div>

                {/* Massive Cinematic Typography - Changed from H2 to H3 for SEO Hierarchy */}
                <h3
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold text-white tracking-tight leading-[1.1] mb-8 drop-shadow-2xl"
                >
                    Every Pour is a Promise. <br />
                    <span className="italic font-light text-[#D4E0CE]">Every Piece a Memory.</span>
                </h3>

                <div
                    className="w-[1px] h-32 md:h-48 bg-gradient-to-b from-white/50 to-transparent mt-4"
                ></div >

            </motion.div>
        </section>
    );
}
