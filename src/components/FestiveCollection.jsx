import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { festiveConfig } from '../lib/festivals';
import { Link } from 'react-router-dom';
import { client } from '../lib/sanityClient';

gsap.registerPlugin(ScrollTrigger);

const FestiveCollection = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const bgTextRef = useRef(null);
    const imageMaskRef = useRef(null);
    const imageRef = useRef(null);
    const contentOverlayRef = useRef(null);
    const textContentRefs = useRef([]);
    const [activeId, setActiveId] = useState(festiveConfig.activeFestival);

    useEffect(() => {
        const fetchActiveFestival = async () => {
            try {
                const settings = await client.fetch('*[_id == "festivalSettings"][0]');
                if (settings?.activeFestival) {
                    setActiveId(settings.activeFestival);
                }
            } catch (err) {
                console.error("Error fetching active festival:", err);
            }
        };
        fetchActiveFestival();
    }, []);

    const festivalData = festiveConfig.festivals[activeId];

    // Store refs to the text elements for staggered animation
    const addToRefs = (el) => {
        if (el && !textContentRefs.current.includes(el)) {
            textContentRefs.current.push(el);
        }
    };

    useLayoutEffect(() => {
        // Awwwards-level GSAP Timeline
        const ctx = gsap.context(() => {

            // We create a master timeline tied to the scroll of the 300vh section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top", // When the top of the section hits the top of the viewport
                    end: "+=250%",    // End after scrolling 250% of the viewport height (effectively pinning it)
                    scrub: 1.5,       // Smooth scrubbing (1.5 seconds to catch up to scroll position)
                    pin: containerRef.current, // Pin the 100vh container while we scroll the 300vh section
                    anticipatePin: 1,
                }
            });

            // --- SEQUENCE 1: The Expanding Window & Dissolving Background ---

            // 1. Zoom the massive background text in and fade it out
            tl.to(bgTextRef.current, {
                scale: 1.5,
                opacity: 0,
                ease: "power2.inOut",
                duration: 1
            }, 0); // start at 0

            // 2. Expand the masked window from a small pill to full screen
            // Assuming initial CSS sets it to the small pill state
            tl.to(imageMaskRef.current, {
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                ease: "power2.inOut",
                duration: 2 // Takes twice as long as the text fade
            }, 0);

            // 3. Counter-Parallax the Image INSIDE the mask
            // Image starts zoomed in and scales down to its natural size as the window expands
            tl.fromTo(imageRef.current, {
                scale: 1.6
            }, {
                scale: 1.05, // Keeps a tiny bit of zoom for a slow continued burn at the end
                ease: "power2.inOut",
                duration: 2
            }, 0);

            // --- SEQUENCE 2: Content Reveal ---

            // 4. Fade in the dark gradient overlay over the image to make text readable
            tl.to(contentOverlayRef.current, {
                opacity: 0.7,
                ease: "power1.inOut",
                duration: 1
            }, 1.5); // Starts slightly before the window finishes expanding

            // 5. Staggered reveal of the text content (eyebrow, title, desc, button)
            // The text elements start pushed down (y: 60) and invisible
            tl.fromTo(textContentRefs.current, {
                y: 80,
                opacity: 0,
                clipPath: "inset(0 0 100% 0)" // Initial clipping from the bottom
            }, {
                y: 0,
                opacity: 1,
                clipPath: "inset(0 0 0% 0)", // Reveal full element
                duration: 1.5,
                stagger: 0.2, // 0.2s delay between each element animating
                ease: "power3.out"
            }, 1.8); // Starts right as the overlay kicks in

            // 6. Very slow ambient zoom on the image for the remainder of the scroll
            tl.to(imageRef.current, {
                scale: 1, // Final zoom level
                ease: "none",
                duration: 1
            }, 2); // Starts after expansion

        }, sectionRef);

        return () => ctx.revert(); // Cleanup GSAP on unmount
    }, []);

    if (!festivalData) return null;

    return (
        // 350vh total scrolling space to allow the scrub animation to play out slowly
        <section ref={sectionRef} className="relative w-full h-[350vh] bg-[#050505] font-notoSerif text-white overflow-clip">

            {/* Pinned Container (Stays fixed on screen while the section is scrolled) */}
            <div ref={containerRef} className="w-full h-screen overflow-hidden flex items-center justify-center relative">

                {/* Background Ambient Text */}
                <div
                    ref={bgTextRef}
                    className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none"
                >
                    <h2
                        className="text-[14vw] leading-none font-bold text-transparent tracking-tighter"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
                    >
                        THE EDIT
                    </h2>
                    <div className="mt-8 flex flex-col items-center gap-4 opacity-50">
                        <div className="w-[1px] h-12 bg-white" />
                        <p className="text-[10px] tracking-[0.5em] font-sans uppercase">Scroll to View</p>
                    </div>
                </div>

                {/* The Magic Masking Window (Starts small via CSS, GSAP expands it) */}
                <div
                    ref={imageMaskRef}
                    className="relative z-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)] flex items-center justify-center"
                    style={{ width: '25vw', height: '40vh', borderRadius: '200px' }} // Initial state before scroll
                >

                    {/* The Hero Image Cover */}
                    <div
                        ref={imageRef}
                        className="absolute inset-0 w-full h-full bg-cover bg-center origin-center"
                        style={{ backgroundImage: `url(${festivalData.heroImage})` }}
                    />

                    {/* The Content Overlay (Starts invisible) */}
                    <div
                        ref={contentOverlayRef}
                        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#050505]/95 opacity-0"
                    />

                    {/* Foreground Text Container (Centered in the screen) */}
                    <div className="relative z-20 w-full max-w-5xl mx-auto px-6 h-full flex flex-col justify-center text-center items-center">

                        {/* Eyebrow Label */}
                        <div ref={addToRefs} className="flex items-center gap-4 text-[10px] sm:text-xs tracking-[0.5em] uppercase font-sans font-bold text-white/60 mb-8">
                            <span className={`w-12 h-[1px] bg-gradient-to-r ${festivalData.accentStyle.buttonGradient}`} />
                            <span>{festivalData.name} Masterpieces</span>
                            <span className={`w-12 h-[1px] bg-gradient-to-l ${festivalData.accentStyle.buttonGradient}`} />
                        </div>

                        {/* Festival Title */}
                        <h3 ref={addToRefs} className="text-4xl sm:text-6xl lg:text-[6.5rem] font-light leading-[1.15] tracking-tight text-white mb-8 pb-2">
                            {festivalData.title.split(festivalData.name)[0]}
                            <span className="italic font-serif font-thin text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/30 px-2 lg:px-4">
                                {festivalData.name}
                            </span>
                            {festivalData.title.split(festivalData.name)[1]}
                        </h3>

                        {/* Subtitle / Description */}
                        <p ref={addToRefs} className="text-base lg:text-xl font-light text-white/70 leading-relaxed max-w-2xl mb-14">
                            {festivalData.subtitle}
                        </p>

                        {/* Premium Button */}
                        <div ref={addToRefs}>
                            <Link
                                to="/festival"
                                className="group relative inline-flex items-center justify-center"
                            >
                                {/* Back Glowing Blur */}
                                <div className={`absolute inset-0 w-full h-full bg-gradient-to-r ${festivalData.accentStyle.buttonGradient} blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-700`} />

                                {/* The Button Body */}
                                <div className="relative z-10 flex items-center justify-center px-12 py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl overflow-hidden transition-colors duration-700 group-hover:border-white/50">
                                    {/* Base Text */}
                                    <span className="relative z-10 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-white transition-colors duration-500 group-hover:text-black">
                                        Explore Collection
                                    </span>

                                    {/* Fill Animation on Hover */}
                                    <div className="absolute inset-0 w-full h-full bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 [transition-timing-function:] z-0" />
                                </div>
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default FestiveCollection;
