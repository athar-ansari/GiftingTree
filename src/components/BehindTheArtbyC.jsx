import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pouringImg from '../assets/pouringImg.png';

gsap.registerPlugin(ScrollTrigger);

export default function BehindTheArt() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    const maskRef = useRef(null);
    const imageRef = useRef(null);
    const topTextRef = useRef(null);
    const bottomTextRef = useRef(null);
    const subtitleRef = useRef(null);
    const scanLineRef = useRef(null);

    // 4 corner crosshairs — H + V bar each = 8 refs
    const tlH = useRef(null); const tlV = useRef(null);
    const trH = useRef(null); const trV = useRef(null);
    const blH = useRef(null); const blV = useRef(null);
    const brH = useRef(null); const brV = useRef(null);

    // Mouse parallax — quickTo refs + open state flag
    const parallaxX = useRef(null);
    const parallaxY = useRef(null);
    const isImageOpen = useRef(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Setup quickTo for mouse parallax (buttery smooth, no jank)
            parallaxX.current = gsap.quickTo(imageRef.current, "x", { duration: 1.2, ease: "power3.out" });
            parallaxY.current = gsap.quickTo(imageRef.current, "y", { duration: 1.2, ease: "power3.out" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=250%",
                    scrub: 1.5,
                    pin: containerRef.current,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Image is "open" from ~28% scroll progress onward
                        isImageOpen.current = self.progress > 0.28;
                        // Reset parallax offset when image is closed on scroll-up
                        if (!isImageOpen.current) {
                            parallaxX.current(0);
                            parallaxY.current(0);
                        }
                    }
                }
            });

            // PHASE 1: User lands — sees full "Behind The / Artisan" typography
            tl.to({}, { duration: 0.3 });

            // PHASE 2: Glowing horizontal slit emerges from center
            tl.to(maskRef.current, {
                width: "90vw",
                duration: 0.8,
                ease: "power2.inOut"
            });

            // PHASE 3: Slit tears open + text splits away + image blooms
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

            // ── FEATURE 1: SCAN LINE ──────────────────────────────────────────────
            // A white laser beam sweeps top→bottom exactly as the slit opens —
            // sells the illusion that the beam is physically cutting the image open.
            tl.fromTo(scanLineRef.current,
                { y: "-50vh", opacity: 1 },
                { y: "50vh", opacity: 0, duration: 1.2, ease: "power1.inOut" },
                "open+=0.1");
            // ─────────────────────────────────────────────────────────────────────

            // ── FEATURE 2: ALL 4 CORNER CROSSHAIRS ───────────────────────────────
            // H bars scale in from their respective outer edge (origin-left / origin-right)
            // V bars scale in from top or bottom (origin-top / origin-bottom)
            // Slight stagger between corners gives a "scanning corners" feel.
            tl.fromTo(
                [tlH.current, trH.current, blH.current, brH.current],
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out" },
                "-=0.4");

            tl.fromTo(
                [tlV.current, trV.current, blV.current, brV.current],
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out" },
                "<0.05");
            // ─────────────────────────────────────────────────────────────────────

            // PHASE 4: Subtitle card reveals after corners settle
            tl.fromTo(subtitleRef.current, {
                y: 50, x: 20, opacity: 0, rotate: 2
            }, {
                y: 0, x: 0, opacity: 1, rotate: 0,
                duration: 1, ease: "power3.out"
            }, "<0.2");

            // PHASE 5: Hold + slow ambient zoom
            tl.to({}, { duration: 1.5 });
            tl.to(imageRef.current, { scale: 1.15, ease: "none", duration: 1 });

            // SCROLL UP = scrub auto-reverses everything cleanly

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── FEATURE 3: MOUSE PARALLAX ────────────────────────────────────────────
    // Only fires when image is fully open (progress > 28%).
    // Max shift: ±18px X, ±12px Y — subtle depth, not distracting.
    // quickTo makes it lag beautifully behind cursor (power3.out, 1.2s).
    useEffect(() => {
        const onMouseMove = (e) => {
            if (!isImageOpen.current) return;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            parallaxX.current(((e.clientX - cx) / cx) * 18);
            parallaxY.current(((e.clientY - cy) / cy) * 12);
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);
    // ─────────────────────────────────────────────────────────────────────────

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[350vh] bg-[#030303] overflow-clip"
        >
            {/* Pinned inner container */}
            <div
                ref={containerRef}
                className="w-full h-screen relative flex items-center justify-center bg-[#030303] overflow-hidden"
            >
                {/* Ambient radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

                {/* TOP TEXT */}
                <div ref={topTextRef} className="absolute top-0 w-full h-1/2 flex justify-center items-end pb-1 md:pb-4 z-10">
                    <h2 className="text-[12vw] leading-none tracking-[0.05em] uppercase font-light text-white/80 m-0">
                        Behind The
                    </h2>
                </div>

                {/* BOTTOM TEXT */}
                <div ref={bottomTextRef} className="absolute bottom-0 w-full h-1/2 flex justify-center items-start pt-1 md:pt-4 z-10">
                    <h2 className="text-[14vw] leading-none tracking-tight uppercase font-serif italic text-white/90 m-0 drop-shadow-2xl">
                        Artisan
                    </h2>
                </div>

                {/* ── MAGIC MASK ── */}
                <div
                    ref={maskRef}
                    className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center"
                    style={{ width: 0, height: '2px', borderRadius: '2px' }}
                >
                    {/* Parallax image */}
                    <div
                        ref={imageRef}
                        className="absolute w-[100vw] h-[100vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cover bg-[center_10%] origin-center -z-10"
                        style={{ backgroundImage: `url(${pouringImg})` }}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/20 -z-10" />

                    {/* ── SCAN LINE ── */}
                    <div
                        ref={scanLineRef}
                        className="absolute left-0 w-full pointer-events-none z-20"
                        style={{
                            height: '2px',
                            opacity: 0,
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 20%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.85) 80%, transparent 100%)',
                            boxShadow: '0 0 16px 4px rgba(255,255,255,0.55), 0 0 40px 8px rgba(255,255,255,0.18)',
                        }}
                    />

                    {/* ── 4 CORNER CROSSHAIRS ── */}

                    {/* Top-Left */}
                    <div ref={tlH} className="absolute top-4 left-4 md:top-8 md:left-8 w-6 h-[1px] bg-white/60 origin-left" style={{ scaleX: 0, opacity: 0 }} />
                    <div ref={tlV} className="absolute top-4 left-4 md:top-8 md:left-8 w-[1px] h-6 bg-white/60 origin-top" style={{ scaleY: 0, opacity: 0 }} />

                    {/* Top-Right */}
                    <div ref={trH} className="absolute top-4 right-4 md:top-8 md:right-8 w-6 h-[1px] bg-white/60 origin-right" style={{ scaleX: 0, opacity: 0 }} />
                    <div ref={trV} className="absolute top-4 right-4 md:top-8 md:right-8 w-[1px] h-6 bg-white/60 origin-top" style={{ scaleY: 0, opacity: 0 }} />

                    {/* Bottom-Left */}
                    <div ref={blH} className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-6 h-[1px] bg-white/60 origin-left" style={{ scaleX: 0, opacity: 0 }} />
                    <div ref={blV} className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-[1px] h-6 bg-white/60 origin-bottom" style={{ scaleY: 0, opacity: 0 }} />

                    {/* Bottom-Right */}
                    <div ref={brH} className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-6 h-[1px] bg-white/60 origin-right" style={{ scaleX: 0, opacity: 0 }} />
                    <div ref={brV} className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-[1px] h-6 bg-white/60 origin-bottom" style={{ scaleY: 0, opacity: 0 }} />

                    {/* Subtitle card */}
                    <div
                        ref={subtitleRef}
                        className="absolute bottom-6 right-6 md:bottom-16 md:right-16 bg-black/60 backdrop-blur-xl p-6 md:p-12 border border-white/10 rounded-2xl max-w-xs sm:max-w-sm text-center shadow-2xl z-30"
                        style={{ opacity: 0 }}
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
