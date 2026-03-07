import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pouringImg from '../assets/pouringImg.png';

gsap.registerPlugin(ScrollTrigger);

export default function BehindTheArt() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null); // ← this gets pinned (same as FestiveCollection)

    const maskRef = useRef(null);
    const imageRef = useRef(null);
    const topTextRef = useRef(null);
    const bottomTextRef = useRef(null);
    const subtitleRef = useRef(null);
    const crosshairsRef = useRef([]);

    const addToCrosshairs = (el) => {
        if (el && !crosshairsRef.current.includes(el)) {
            crosshairsRef.current.push(el);
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // ─── KEY FIX (adopted from FestiveCollection) ────────────────────────
            //  BEFORE: pin: true on sectionRef
            //    → GSAP injects a pin-spacer div into the DOM at scroll time
            //    → Adjacent pinned section causes layout recalc → JUMP
            //
            //  AFTER:  pin: containerRef.current (the inner 100vh div)
            //    + section has explicit h-[350vh] in JSX
            //    → Layout is fully known at paint time, no spacer injection needed
            //    → Zero jump on entry, exact same as FestiveCollection
            // ─────────────────────────────────────────────────────────────────────
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=250%",          // EXACT match: h-[350vh] - 100vh pinned = 250vh scroll space
                    scrub: 1.5,             // same smoothness as FestiveCollection
                    pin: containerRef.current, // ← pin INNER container, NOT section
                    anticipatePin: 1,
                }
            });

            // PHASE 1: User lands — sees "Behind The / Artisan" text fully
            tl.to({}, { duration: 0.3 });

            // PHASE 2: Glowing horizontal slit emerges from center
            tl.to(maskRef.current, {
                width: "90vw",
                duration: 0.8,
                ease: "power2.inOut"
            });

            // PHASE 3: Slit tears open vertically + text splits away + image blooms
            tl.to(maskRef.current, {
                height: "85vh",
                borderRadius: "24px",
                duration: 1.5,
                ease: "power3.inOut"
            }, "open");

            tl.to(topTextRef.current, {
                y: "-25vh",
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut"
            }, "open");

            tl.to(bottomTextRef.current, {
                y: "25vh",
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut"
            }, "open");

            tl.fromTo(imageRef.current, {
                scale: 1.8,
                filter: "brightness(0.2) grayscale(100%)"
            }, {
                scale: 1.25,
                filter: "brightness(0.9) grayscale(20%)",
                duration: 2.2,
                ease: "power2.inOut"
            }, "open");

            // PHASE 4: Industrial crosshairs + subtitle card reveal
            tl.fromTo(crosshairsRef.current, {
                opacity: 0,
                scale: 0
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.5)"
            }, "-=0.2");

            tl.fromTo(subtitleRef.current, {
                y: 50,
                x: 20,
                opacity: 0,
                rotate: 2
            }, {
                y: 0,
                x: 0,
                opacity: 1,
                rotate: 0,
                duration: 1,
                ease: "power3.out"
            }, "<");

            // PHASE 5: Hold — user admires the artwork
            // Pin releases after this → next section scrolls in
            tl.to({}, { duration: 1.5 });

            // Slow ambient zoom for the remainder (same as FestiveCollection step 6)
            tl.to(imageRef.current, {
                scale: 1.15,
                ease: "none",
                duration: 1
            });

            // ── SCROLL UP = automatic reverse ─────────────────────────────────────
            // scrub: 1.5 reverses timeline on scroll-up:
            //   subtitle hides → crosshairs vanish → slit closes → text reappears
            // ─────────────────────────────────────────────────────────────────────

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        // ← Explicit 350vh height (same pattern as FestiveCollection)
        //   This tells the browser the layout upfront — no GSAP pin-spacer injection needed
        <section
            ref={sectionRef}
            className="relative w-full h-[350vh] bg-[#030303] overflow-clip"
        >
            {/* Pinned inner container — only this div gets pinned by GSAP */}
            <div
                ref={containerRef}
                className="w-full h-screen relative flex items-center justify-center bg-[#030303] overflow-hidden"
            >
                {/* Background ambient lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

                {/* TOP TEXT */}
                <div
                    ref={topTextRef}
                    className="absolute top-0 w-full h-1/2 flex justify-center items-end pb-1 md:pb-4 z-10"
                >
                    <h2 className="text-[12vw] leading-none tracking-[0.05em] uppercase font-light text-white/80 m-0">
                        Behind The
                    </h2>
                </div>

                {/* BOTTOM TEXT */}
                <div
                    ref={bottomTextRef}
                    className="absolute bottom-0 w-full h-1/2 flex justify-center items-start pt-1 md:pt-4 z-10"
                >
                    <h2 className="text-[14vw] leading-none tracking-tight uppercase font-serif italic text-white/90 m-0 drop-shadow-2xl">
                        Artisan
                    </h2>
                </div>

                {/* THE MAGIC MASK — starts as a thin horizontal slit */}
                <div
                    ref={maskRef}
                    className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center"
                    style={{ width: 0, height: '2px', borderRadius: '2px' }}
                >
                    {/* Image inside mask */}
                    <div
                        ref={imageRef}
                        className="absolute w-[100vw] h-[100vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cover bg-[center_10%] origin-center -z-10"
                        style={{ backgroundImage: `url(${pouringImg})` }}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/20 -z-10" />

                    {/* Crosshairs — top-left */}
                    <div ref={addToCrosshairs} className="absolute top-4 left-4 md:top-8 md:left-8 w-6 h-[1px] bg-white/50" />
                    <div ref={addToCrosshairs} className="absolute top-4 left-4 md:top-8 md:left-8 w-[1px] h-6 bg-white/50" />
                    {/* Crosshairs — bottom-right */}
                    <div ref={addToCrosshairs} className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-6 h-[1px] bg-white/50 origin-right" />
                    <div ref={addToCrosshairs} className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-[1px] h-6 bg-white/50 origin-bottom" />

                    {/* Subtitle card */}
                    <div
                        ref={subtitleRef}
                        className="absolute bottom-6 right-6 md:bottom-16 md:right-16 bg-black/60 backdrop-blur-xl p-6 md:p-12 border border-white/10 rounded-2xl max-w-xs sm:max-w-sm text-center shadow-2xl z-30"
                    >
                        <div className="flex items-center justify-center gap-3 mb-6 opacity-80">
                            <div className="w-6 h-[1px] bg-[#D4E0CE]" />
                            <span className="text-[9px] tracking-[0.4em] uppercase text-[#D4E0CE] font-bold">
                                Layer By Layer
                            </span>
                            <div className="w-6 h-[1px] bg-[#D4E0CE]" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-light text-white leading-relaxed">
                            Every Pour is a Promise.<br />
                            <span className="italic font-serif text-[#D4E0CE] mt-2 block">
                                Every Piece a Memory.
                            </span>
                        </h3>
                    </div>
                </div>

            </div>
        </section>
    );
}