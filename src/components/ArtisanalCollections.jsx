import { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from "react-icons/fi";

// Exchanging the basic resin image for an ultra-premium dark macro photograph
import LuxuryResin from "../assets/ArtisanalGallery.png";

const collections = [
  {
    id: "artisanal-gallery",
    title: "The Artisanal Gallery",
    description: "Meticulously handcrafted resin masterpieces, elevating your most cherished memories into eternal art.",
    image: LuxuryResin,
    categories: [
      "Varmala", "Key Chains", "Jewellery", "Car Accessories", "Clock", "Resin Frame", "Bookmarks", "Puja Thali", "Wall Art",
      "Book Holder", "Flower Preservation", "Other Products"
    ]
  }
];

export default function ArtisanalCollections() {
  const [activeCollection] = useState(collections[0].id);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-32 bg-[#FCFBF8] relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Soft, Breathable Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#8A9A83]"></span>
            <span className="text-[#8A9A83] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-semibold font-sans">
              Signature Masterpieces
            </span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#8A9A83]"></span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1A2E1A] font-notoSerif tracking-tight leading-[1.1] mb-5">
            Curated <span className="italic font-light text-[#4B5945]">Collections.</span>
          </h2>

          <p className="text-[#5C6B55] max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed">
            Step into an exclusive exhibition where tradition seamlessly blends with modern luxury.
          </p>
        </motion.div>

        {/* The Main Showcase Container */}
        <div className="relative w-full mx-auto">
          <AnimatePresence mode="wait">
            {collections.map((collection) => (
              collection.id === activeCollection && (
                <CollectionShowcase key={collection.id} collection={collection} />
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CollectionShowcase({ collection }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax background: shifts downwards as you scroll down
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-[#E8EFE5] bg-[#0A0A0A]"
    >
      {/* Deep Background Canvas with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] origin-center">
        {/* Subtle continuous ambient movement instead of interactive card zoom */}
        <img
          src={collection.image}
          alt={`Exclusive Handcrafted ${collection.title} - Premium Resin Art`}
          className="w-full h-full object-cover opacity-70 animate-[pulse_10s_ease-in-out_infinite] scale-105"
        />

        {/* Multi-layered Vignette and Gradient Meshes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0A0A0A] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/40 pointer-events-none" />
      </motion.div>

      {/* Ambient Floating Light Orbs for depth */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4E0CE]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-[3000ms]"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8A9A83]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-40"></div>

      {/* Foreground Content Stack */}
      <div className="relative z-10 w-full h-full min-h-[75vh] md:min-h-[85vh] flex flex-col justify-end p-6 md:p-12 lg:p-16">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 w-full">

          {/* Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl lg:pb-4"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 mb-8 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-[#D4E0CE] animate-pulse"></span>
              <span className="text-white text-[10px] font-bold tracking-widest uppercase">The Artifact Gallery</span>
            </div>

            <h3 className="text-4xl md:text-6xl lg:text-[5rem] font-bold text-white font-notoSerif tracking-tight leading-[1] mb-6 drop-shadow-2xl">
              {collection.title}
            </h3>

            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed drop-shadow-lg max-w-xl">
              {collection.description}
            </p>
          </motion.div>

          {/* Glassmorphic Category Grid */}
          <div className="w-full lg:w-7/12 grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {collection.categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05, ease: "easeOut" }}
              >
                <CategoryButton category={category} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function CategoryButton({ category }) {
  return (
    <Link
      to={`/resin-products?category=${encodeURIComponent(category.toLowerCase().replace(/ /g, '-'))}`}
      aria-label={`Shop premium resin ${category}`}
      className="block focus:outline-none focus:ring-2 focus:ring-[#D4E0CE] rounded-xl h-full"
    >
      <div
        className="
                relative overflow-hidden w-full h-full text-left py-3 px-4 md:py-4 md:px-5 lg:px-3 rounded-xl
                bg-white/10 backdrop-blur-md border border-white/20
                text-white text-xs sm:text-sm md:text-base lg:text-[13px] xl:text-[15px] font-medium tracking-wide
                transition-all duration-300 ease-out cursor-pointer
                hover:bg-white/20 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)]
                hover:border-white/40
                group flex items-center justify-between
            "
      >
        {/* Subtle Inner Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Text Title with high contrast */}
        <span className="relative z-10 leading-tight drop-shadow-md text-white/90 group-hover:text-white transition-colors duration-300">
          {category}
        </span>

        {/* Premium Interactive Icon */}
        <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white transition-all duration-300 shadow-sm ml-2 shrink-0">
          <FiArrowRight className="text-white w-3 h-3 sm:w-4 sm:h-4 group-hover:text-[#1A2E1A] group-hover:-rotate-45 transition-transform duration-300" />
        </div>

        {/* Elegant Hover Sweep Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
      </div>
    </Link>
  );
}
