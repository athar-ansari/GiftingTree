import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pouringImg from '../assets/pouring.webp';

gsap.registerPlugin(ScrollTrigger);

export default function BehindTheArt() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    const maskRef = useRef(null);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);
    const topTextRef = useRef(null);
    const bottomTextRef = useRef(null);
    const subtitleRef = useRef(null);

    // 4 corner crosshairs
    const tlH = useRef(null); const tlV = useRef(null);
    const trH = useRef(null); const trV = useRef(null);
    const blH = useRef(null); const blV = useRef(null);
    const brH = useRef(null); const brV = useRef(null);

    // Mouse parallax
    const parallaxX = useRef(null);
    const parallaxY = useRef(null);
    const isImageOpen = useRef(false);

    // ── FIX 1: IMAGE LOADING STATE ──────────────────────────────────────
    // Wait for image to load before initializing GSAP
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = pouringImg;
        img.onload = () => {
            setImageLoaded(true);
            console.log("✅ Image loaded - initializing GSAP");
        };
    }, []);
    // ────────────────────────────────────────────────────────────────────

    useLayoutEffect(() => {
        // ── FIX 2: DON'T RUN UNTIL IMAGE IS LOADED ───────────────────────
        if (!imageLoaded) {
            console.log("⏳ Waiting for image to load...");
            return;
        }
        // ────────────────────────────────────────────────────────────────

        const ctx = gsap.context(() => {

            // ── FIX 3: KILL ALL OLD SCROLLTRIGGERS ───────────────────────
            // This prevents conflicts from previous renders
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === sectionRef.current) {
                    st.kill();
                }
            });
            // ────────────────────────────────────────────────────────────

            // ── FIX 4: REFRESH AFTER A TINY DELAY ────────────────────────
            // Let browser settle layouts, then recalculate
            setTimeout(() => {
                ScrollTrigger.refresh();
                console.log("🔄 ScrollTrigger refreshed");
            }, 100);
            // ────────────────────────────────────────────────────────────

            // Setup parallax quickTo
            parallaxX.current = gsap.quickTo(imageRef.current, "x", {
                duration: 1.2,
                ease: "power3.out"
            });
            parallaxY.current = gsap.quickTo(imageRef.current, "y", {
                duration: 1.2,
                ease: "power3.out"
            });

            // Initial setup for centering to avoid CSS conflict
            gsap.set(imageRef.current, { xPercent: -50, yPercent: -50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=250%",
                    scrub: 1.5,
                    pin: containerRef.current,
                    anticipatePin: 1,
                    // ── FIX 5: ADD MARKERS FOR DEBUGGING ─────────────────
                    // Uncomment to see if triggers are positioned correctly
                    // markers: true,
                    // ────────────────────────────────────────────────────
                    onUpdate: (self) => {
                        isImageOpen.current = self.progress > 0.28;
                        if (!isImageOpen.current) {
                            parallaxX.current(0);
                            parallaxY.current(0);
                        }
                    },
                    // ── FIX 6: FORCE REFRESH ON ENTER ───────────────────
                    onEnter: () => ScrollTrigger.refresh(),
                    onEnterBack: () => ScrollTrigger.refresh(),
                    // ────────────────────────────────────────────────────
                }
            });

            // PHASE 1: Initial pause
            tl.to({}, { duration: 0.3 });

            // PHASE 2: Horizontal slit
            tl.to(maskRef.current, {
                width: "90vw",
                duration: 0.8,
                ease: "power2.inOut"
            });

            // PHASE 3: Vertical expansion + text split
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

            tl.to(maskRef.current, {
                height: isMobile ? "65vh" : isTablet ? "75vh" : "82vh",
                width: isMobile ? "94vw" : isTablet ? "90vw" : "80vw",
                borderRadius: isMobile ? "16px" : "24px",
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
                scale: isMobile ? 1.5 : 1.3,
            }, {
                scale: 1,
                duration: 2.2,
                ease: "power2.inOut"
            }, "open");

            tl.fromTo(overlayRef.current, {
                opacity: 0.8
            }, {
                opacity: 0.1,
                duration: 2.2,
                ease: "power2.inOut"
            }, "open");



            // Crosshairs
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

            // Subtitle
            tl.fromTo(subtitleRef.current, {
                y: 50, x: 20, opacity: 0, rotate: 2
            }, {
                y: 0, x: 0, opacity: 1, rotate: 0,
                duration: 1, ease: "power3.out"
            }, "<0.2");

            // Hold + zoom
            tl.to({}, { duration: 1.5 });
            tl.to(imageRef.current, {
                scale: 1.15,
                ease: "none",
                duration: 1
            });

        }, sectionRef);

        return () => {
            ctx.revert();
            // ── FIX 7: CLEANUP ON UNMOUNT ────────────────────────────────
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === sectionRef.current) {
                    st.kill();
                }
            });
            // ────────────────────────────────────────────────────────────
        };
    }, [imageLoaded]); // ← Re-run only when image loads

    // Mouse parallax
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

    // ── FIX 8: WINDOW RESIZE HANDLER ────────────────────────────────────
    // Refresh ScrollTrigger on window resize
    useEffect(() => {
        const handleResize = () => {
            console.log("📐 Window resized - refreshing ScrollTrigger");
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // ────────────────────────────────────────────────────────────────────

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[350vh] bg-[#030303] overflow-clip"
        >
            <div
                ref={containerRef}
                className="w-full h-screen relative flex items-center justify-center bg-[#030303] overflow-hidden"
            >
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

                {/* MAGIC MASK */}
                <div
                    ref={maskRef}
                    className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center"
                    style={{ width: 0, height: '2px', borderRadius: '2px' }}
                >
                    {/* Image */}
                    <div
                        ref={imageRef}
                        className="absolute w-[110%] h-[110%] top-1/2 left-1/2 bg-cover bg-center origin-center -z-10"
                        style={{ backgroundImage: `url(${pouringImg})` }}
                    />

                    {/* Dark Overlay instead of animating CSS filters on the image itself */}
                    <div ref={overlayRef} className="absolute inset-0 bg-black -z-10" />



                    {/* CROSSHAIRS */}
                    <div ref={tlH} className="absolute top-4 left-4 md:top-8 md:left-8 w-6 h-[1px] bg-white/60 origin-left" style={{ scaleX: 0, opacity: 0 }} />
                    <div ref={tlV} className="absolute top-4 left-4 md:top-8 md:left-8 w-[1px] h-6 bg-white/60 origin-top" style={{ scaleY: 0, opacity: 0 }} />

                    <div ref={trH} className="absolute top-4 right-4 md:top-8 md:right-8 w-6 h-[1px] bg-white/60 origin-right" style={{ scaleX: 0, opacity: 0 }} />
                    <div ref={trV} className="absolute top-4 right-4 md:top-8 md:right-8 w-[1px] h-6 bg-white/60 origin-top" style={{ scaleY: 0, opacity: 0 }} />

                    <div ref={blH} className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-6 h-[1px] bg-white/60 origin-left" style={{ scaleX: 0, opacity: 0 }} />
                    <div ref={blV} className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-[1px] h-6 bg-white/60 origin-bottom" style={{ scaleY: 0, opacity: 0 }} />

                    <div ref={brH} className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-6 h-[1px] bg-white/60 origin-right" style={{ scaleX: 0, opacity: 0 }} />
                    <div ref={brV} className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-[1px] h-6 bg-white/60 origin-bottom" style={{ scaleY: 0, opacity: 0 }} />

                    {/* SUBTITLE */}
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