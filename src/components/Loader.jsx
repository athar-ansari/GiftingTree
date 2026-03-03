import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1A2E1A] z-[9999] font-notoSerif overflow-hidden">

      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4B5945] via-transparent to-transparent pointer-events-none"></div>

      <div className="relative flex flex-col items-center justify-center">

        {/* Cinematic Animated Mask Reveal */}
        <div className="overflow-hidden relative pb-2">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1], // Cinematic easing
            }}
            className="text-[#F4F5F0] text-3xl md:text-5xl lg:text-7xl tracking-[0.2em] font-light uppercase text-center"
          >
            Gifting <span className="font-bold italic text-[#8A9A83]">Tree.</span>
          </motion.h1>
        </div>

        {/* Elegant tracking animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4E0CE] to-transparent mt-4 origin-center"
        />

        {/* Tiny slow-fading subtitle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-6 text-[#8A9A83] text-[10px] sm:text-xs tracking-[0.4em] uppercase font-sans font-medium"
        >
          Preparing the Gallery
        </motion.div>

      </div>
    </div>
  );
};

export default Loader;