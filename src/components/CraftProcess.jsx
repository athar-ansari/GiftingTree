import { motion } from 'framer-motion';
import Design from "../assets/selective.gif";
import Material from "../assets/material.gif";
import Handcrafting from "../assets/Handcrafting.gif";
import QualityCheck from "../assets/QualityCheck.gif";

const steps = [
  {
    num: "01",
    image: Design,
    title: "Design",
    description: "Choose from our curated collection or request a custom design crafted entirely to your vision."
  },
  {
    num: "02",
    image: Material,
    title: "Materials",
    description: "Premium, enduring elements ethically chosen to ensure lasting beauty and structural integrity."
  },
  {
    num: "03",
    image: Handcrafting,
    title: "Crafting",
    description: "Our master artisans painstakingly bring your vision to life through days of meticulous pouring."
  },
  {
    num: "04",
    image: QualityCheck,
    title: "Perfection",
    description: "Rigorous studio-lit inspection guarantees a flawless, premium finish before arriving to you."
  }
];

const CraftProcess = () => {
  return (
    <div className="w-full bg-[#F4F5F0] py-24 lg:py-32 border-t border-[#E8EFE5]/50 flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Minimalist Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-[0.65rem] sm:text-xs font-bold text-gray-400 uppercase tracking-[0.3em] font-sans">
              The Artisan's Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A2E1A] font-notoSerif tracking-tight leading-tight">
              Meticulous Attention <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B5945] to-[#8A9A83] italic font-light">to Detail</span>
            </h2>
          </motion.div>
        </div>

        {/* Unboxed Editorial Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 lg:gap-y-0">

          {/* Subtle Desktop Connector Line */}
          <div className="hidden lg:block absolute top-[5rem] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-[#D4E0CE] to-transparent z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 1, 0.5, 1]
              }}
              className="relative flex flex-col items-center text-center group z-10"
            >

              {/* Step Number Title */}
              <div className="text-xl font-notoSerif italic text-[#8A9A83] mb-6 font-medium transition-colors duration-500 group-hover:text-[#4B5945]">
                {step.num}.
              </div>

              {/* Delicate Image Circle */}
              <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full mb-8 transform group-hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-[#D4E0CE] group-hover:border-[#8A9A83] transition-colors duration-700 scale-[1.12] opacity-50"></div>

                {/* Inner Image Container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-sm ring-4 ring-[#F4F5F0] relative z-10">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />

                  {/* Subtle Image Wash Overlay */}
                  <div className="absolute inset-0 bg-[#4B5945]/0 group-hover:bg-[#4B5945]/10 transition-colors duration-700 pointer-events-none"></div>
                </div>
              </div>

              {/* Minimalist Text */}
              <div className="flex flex-col flex-grow w-full max-w-[220px]">
                <h3 className="text-lg lg:text-xl font-bold text-[#1A2E1A] font-notoSerif mb-3 tracking-tight group-hover:text-[#4B5945] transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-[0.85rem] sm:text-sm text-gray-500 font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CraftProcess;
