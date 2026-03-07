import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Hide scrollbar while Loader is active
    document.body.style.overflow = "hidden";

    // We want the counter to hit exactly 100 within 2000ms
    const duration = 2000;
    const intervalTime = 25; // ms per tick
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setCounter(progress);

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    // Keep it slightly bouncy initially, then smooth out
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Premium cubic-bezier easing commonly used in Awwwards sites
  const premiumEase = [0.76, 0, 0.24, 1];

  return (
    <motion.div
      initial={{ y: "0%" }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: premiumEase } }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#111A11] text-[#F4F5F0] overflow-hidden px-6 py-10 md:px-12 md:py-16 font-notoSerif shadow-2xl"
    >
      {/* Texture Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>

      {/* Top Header - Micro Typography */}
      <div className="flex justify-between items-start text-[9px] md:text-xs uppercase tracking-[0.4em] font-sans opacity-60 relative z-10 w-full">
        <span>Gifting Tree</span>
        <span>© 2026</span>
      </div>

      {/* Center Huge Typography - Kinetic Reveal */}
      <div className="flex flex-col items-center justify-center flex-1 relative w-full h-full">
        <div className="overflow-hidden mb-[-2vw]">
          <motion.h1
            initial={{ y: "100%", rotate: 4, opacity: 0 }}
            animate={{ y: "0%", rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: premiumEase, delay: 0.1 }}
            className="text-[12vw] md:text-[8rem] lg:text-[11rem] font-light tracking-tighter leading-none"
          >
            GIFTING
          </motion.h1>
        </div>
        <div className="overflow-hidden flex items-end">
          <motion.h1
            initial={{ y: "100%", rotate: -4, opacity: 0 }}
            animate={{ y: "0%", rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: premiumEase, delay: 0.25 }}
            className="text-[12vw] md:text-[8rem] lg:text-[11rem] font-bold italic tracking-tighter leading-none text-transparent"
            style={{ WebkitTextStroke: '2px rgba(138, 154, 131, 0.8)' }}
          >
            TREE.
          </motion.h1>
        </div>

        {/* Soft Ambient Glow Behind Text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#D4E0CE] to-transparent rounded-full blur-[100px] pointer-events-none -z-10"
        ></motion.div>
      </div>

      {/* Bottom Footer Info */}
      <div className="flex justify-between items-end relative z-10 w-full border-b border-[#F4F5F0]/10 pb-4">
        {/* Subtitles */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-sans opacity-40">Collection</span>
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-sans text-[#8A9A83]">Bespoke Collectibles</span>
        </div>

        {/* Live Percentage Counter */}
        <div className="flex items-start tracking-tighter tabular-nums font-light drop-shadow-lg">
          <span className="text-5xl md:text-7xl lg:text-8xl leading-none">{counter}</span>
          <span className="text-xl md:text-3xl lg:text-4xl mt-1 md:mt-2 opacity-50">%</span>
        </div>
      </div>

      {/* Perfect Physical Progress Bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.1, ease: "linear" }}
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4E0CE] to-[#8A9A83]"
      />
    </motion.div>
  );
};

export default Loader;