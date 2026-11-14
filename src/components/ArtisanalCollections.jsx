import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import jewelleryImage from "../assets/collections/jewellery.webp";
import flowerPreservationImage from "../assets/collections/flower-preservation-client.webp";
import bouquetImage from "../assets/collections/bouquet.webp";
import trousseauPackingImage from "../assets/collections/trousseau-packing.webp";
import frameImage from "../assets/collections/frame.webp";
import returnFavoursImage from "../assets/collections/return-favours.webp";

const categoriesData = [
  {
    name: "Jewellery",
    desc: "Wearable Handcrafted Art",
    img: jewelleryImage,
    alt: "Pressed-flower resin drop earrings with gold hooks",
  },
  {
    name: "Flower Preservation",
    desc: "Memories Frozen In Time",
    img: flowerPreservationImage,
    alt: "A client's preserved burgundy rose bouquet displayed in a frame beside resin keepsakes",
  },
  {
    name: "Bouquet",
    desc: "The Eternal Blooms",
    img: bouquetImage,
    alt: "A hand-tied blush and ivory rose bouquet with sage ribbon",
  },
  {
    name: "Trousseau Packing",
    desc: "Luxury Royal Gifting",
    img: trousseauPackingImage,
    alt: "A bridal trousseau gift box with a maroon silk saree and gold jewelry",
  },
  {
    name: "Frame",
    desc: "Custom Wall Masterpieces",
    img: frameImage,
    alt: "A clear resin photo frame decorated with pressed flowers and gold leaf",
  },
  {
    name: "Return Favours",
    desc: "Elegant Memorable Tokens",
    img: returnFavoursImage,
    alt: "Floral resin keychain favours in individual cream gift boxes",
  },
];

export default function ArtisanalCollections() {
  return (
    <section className="py-24 md:py-40 bg-[#EAE9E0] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#8A9A83]"></span>
              <span className="text-[#8A9A83] text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
                Signature Masterpieces
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-notoSerif tracking-tight leading-[0.95] text-[#1A2E1A]">
              Curated <br />
              <span className="italic font-light text-[#4B5945]">
                Collections.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-md"
          >
            <p className="text-[#1A2E1A]/60 text-base md:text-lg font-medium leading-relaxed mb-8">
              Explore our meticulously handcrafted divisions where every piece
              tells a story of preservation and artisanal excellence.
            </p>
            <Link
              to="/resin-products"
              className="group inline-flex items-center gap-4 text-[#1A2E1A] font-bold text-sm tracking-widest uppercase border-b-2 border-transparent hover:border-[#4B5945] transition-all duration-300 pb-1"
            >
              View Full Gallery{" "}
              <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Horizontal Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {categoriesData.map((category, index) => (
            <CollectionCard
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col"
    >
      <Link
        to={`/resin-products?category=${encodeURIComponent(category.name.toLowerCase().replace(/ /g, "-"))}`}
        className="block"
      >
        {/* Editorial Image Wrapper */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-[#1A2E1A]/5 shadow-[0_30px_60px_rgba(26,46,26,0.05)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(26,46,26,0.12)] mb-8">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={category.img}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div className="absolute bottom-8 right-8 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-12 h-12 rounded-full bg-white text-[#1A2E1A] flex items-center justify-center shadow-2xl">
              <FiArrowRight className="-rotate-45 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Text Metadata */}
        <div className="px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#8A9A83]">
              0{index + 1}
            </span>
            <span className="w-8 h-[1px] bg-[#8A9A83]/30"></span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-notoSerif text-[#1A2E1A] mb-2 group-hover:text-[#4B5945] transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-[#1A2E1A]/50 text-xs md:text-sm font-medium tracking-tight uppercase">
            {category.desc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
