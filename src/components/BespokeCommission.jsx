import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import bespokeImg from '../assets/bespokeImg.webp';

export default function BespokeCommission() {
  return (
    <section className="relative w-full bg-[#1A2E1A] overflow-hidden py-24 md:py-32 border-t border-[#2C3E20]">
      {/* Dark Texture Overlay */}
      <div className="absolute inset-0 opacity-20 hover:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4B5945] via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Column: Premium Imagery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative group"
          >
            {/* Aspect container for the bespoke image */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#2C3E20]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-8 border-white/5">
              <img
                src={bespokeImg}
                alt="Bespoke Varmala Preservation in Premium Resin Art - Custom Wedding Keepsake Table"
                loading="lazy"
                className="w-full h-full object-cover transition-transform [transition-duration:] [transition-timing-function:] group-hover:scale-105"
              />

              {/* Glassmorphic overlay badge */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-black/40 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-[#D4E0CE] text-[10px] uppercase tracking-[0.3em] font-medium font-sans">
                  Custom Orders
                </span>
              </div>
            </div>

            {/* Ambient Shadow glow beneath the image */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[30px] bg-black/60 blur-xl rounded-full pointer-events-none"></div>
          </motion.div>

          {/* Right Column: Typography & Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 text-left"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#8A9A83]"></span>
              <span className="text-[#8A9A83] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-semibold font-sans">
                The Bespoke Experience
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#F4F5F0] font-notoSerif tracking-tight leading-[1.1] mb-8">
              Your Memory, <br />
              <span className="text-[#8A9A83] italic font-light">Eternalized.</span>
            </h2>

            <p className="text-[#A5B49E] text-base md:text-lg font-light leading-relaxed mb-6 max-w-lg">
              We believe that true luxury lies in the deeply personal. Our bespoke service offers a one-on-one consultation to preserve your most sacred moments—be it a wedding Varmala or a cherished keepsake—into an architectural resin masterpiece.
            </p>

            <p className="text-[#A5B49E] text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg">
              Every detail is tailored to your aesthetic, ensuring your story is captured with the highest level of artisanal integrity.
            </p>

            {/* High-End Magnetic CTA Button */}
            <button
              onClick={() => {
                const message = "Hi, I am interested in inquiring about a Bespoke Custom Order!";
                window.open(`https://wa.me/917001967279?text=${encodeURIComponent(message)}`, '_blank');
              }}
              aria-label="Inquire about a custom bespoke resin order via WhatsApp"
              className="group relative inline-flex items-center gap-6 focus:outline-none"
            >
              {/* Text part */}
              <div className="relative overflow-hidden pt-1 pb-1">
                <span className="block text-[#F4F5F0] text-sm md:text-base tracking-[0.2em] uppercase font-bold transition-transform duration-500 group-hover:-translate-y-[150%]">
                  INQUIRE NOW
                </span>
                <span className="block text-[#D4E0CE] text-sm md:text-base tracking-[0.2em] uppercase font-bold absolute left-0 top-0 translate-y-[150%] transition-transform duration-500 group-hover:translate-y-[4px]">
                  INQUIRE NOW
                </span>
                <div className="w-full h-[1px] bg-[#4B5945] mt-1 absolute bottom-0 left-0 transition-transform duration-500 origin-left scale-x-100 group-hover:scale-x-0"></div>
                <div className="w-full h-[1px] bg-[#D4E0CE] mt-1 absolute bottom-0 left-0 transition-transform duration-500 origin-right scale-x-0 group-hover:scale-x-100"></div>
              </div>

              {/* Cirular Arrow Icon */}
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#4B5945] flex items-center justify-center bg-transparent group-hover:bg-[#F4F5F0] transition-colors duration-500 [transition-timing-function:]">
                <FiArrowRight className="text-[#D4E0CE] group-hover:text-[#1A2E1A] w-5 h-5 group-hover:-rotate-45 transition-all duration-500 [transition-timing-function:] transform-gpu" />
              </div>
            </button>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
