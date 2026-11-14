import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

import weddingImg   from '../assets/weddingGuide.webp';
import nameplateImg from '../assets/nameplateCorporate.webp';
import flatlayImg   from '../assets/homeLivingGuide.webp';

const guideCategories = [
  {
    id: '01',
    title: 'Weddings',
    subtitle: 'The Varmala Collection',
    description:
      'Preserving your most sacred unions in eternal, crystal-clear resin art — from varmala to bridal bouquets.',
    image: weddingImg,
    link: '/resin-products?category=varmala',
    position: 'top',
    accent: '#D4CEC5',
  },
  {
    id: '02',
    title: 'Home & Living',
    subtitle: 'Artistic Living Decor',
    description:
      'Functional masterpieces that transform everyday living spaces with memory and artisanal beauty.',
    image: flatlayImg,
    link: '/resin-products',
    position: 'bottom',
    accent: '#C8D5C0',
  },
  {
    id: '03',
    title: 'Corporate',
    subtitle: 'Bespoke Nameplates',
    description:
      'Bespoke resin identity solutions for the modern professional — nameplates that command presence.',
    image: nameplateImg,
    link: '/resin-products',
    position: 'top',
    accent: '#C5CAD4',
  },
];

export default function GiftingGuide() {
  return (
    <section className="w-full bg-[#EAE9E0] py-24 md:py-40 overflow-hidden relative border-t border-[#D4E0CE]/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 md:mb-32"
        >
          <div>
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#8A9A83]" />
              <span className="text-[#8A9A83] text-[10px] md:text-xs uppercase tracking-[0.45em] font-bold">
                Gifting Concierge
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-[#1A2E1A] font-notoSerif tracking-tight leading-[1]">
              The Art of{' '}
              <span className="italic font-light text-[#4B5945]">Kindness.</span>
            </h2>
          </div>

          <div className="max-w-xs">
            <p className="text-[#1A2E1A]/50 text-base md:text-lg leading-relaxed font-light mb-6">
              A curated guide to the perfect expression of sentiment for life's most cherished milestones.
            </p>
            <Link
              to="/resin-products"
              className="group inline-flex items-center gap-3 text-[#1A2E1A] font-bold text-xs tracking-[0.2em] uppercase"
            >
              <span className="border-b border-[#1A2E1A]/30 pb-0.5 group-hover:border-[#4B5945] group-hover:text-[#4B5945] transition-all duration-300">
                Browse All Collections
              </span>
              <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

        {/* ── Staggered Editorial Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16">
          {guideCategories.map((category, index) => (
            <div
              key={category.id}
              className={`flex flex-col ${
                category.position === 'bottom' ? 'md:mt-24 lg:mt-36' : ''
              }`}
            >
              <GuideCard category={category} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────── */
function GuideCard({ category, index }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax: image drifts upward as card scrolls into view
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link to={category.link} className="block">

        {/* ── Image wrapper ── */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] lg:rounded-[2.5rem] mb-8 bg-[#1A2E1A]/5 shadow-[0_20px_60px_rgba(26,46,26,0.06)] transition-shadow duration-700 group-hover:shadow-[0_40px_80px_rgba(26,46,26,0.13)]">

          {/* Parallax image */}
          <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[6%] w-full h-[112%]">
            <img
              src={category.image}
              alt={category.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
            />
          </motion.div>

          {/* Bottom gradient vignette */}
          <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Hover CTA that slides up from bottom */}
          <div className="absolute bottom-0 left-0 w-full p-7 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md text-[#1A2E1A] px-5 py-3 rounded-full shadow-xl">
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Explore</span>
              <div className="w-6 h-6 rounded-full bg-[#1A2E1A] flex items-center justify-center">
                <FiArrowRight className="w-3 h-3 text-white -rotate-45" />
              </div>
            </div>
          </div>

          {/* Top-left numbering badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5">
            <span className="text-white text-[10px] font-bold tracking-[0.25em] uppercase">{category.id}</span>
          </div>
        </div>

        {/* ── Text meta ── */}
        <div className="px-1">

          {/* Subtle tag line */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.accent }}
            />
            <span className="text-[#8A9A83] text-[10px] font-bold tracking-[0.3em] uppercase">
              {category.subtitle}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl lg:text-[2.25rem] font-bold font-notoSerif text-[#1A2E1A] leading-tight mb-1 group-hover:text-[#4B5945] transition-colors duration-400">
            {category.title}
          </h3>

          {/* Animated underline */}
          <div className="h-[1.5px] w-0 bg-[#4B5945]/20 group-hover:w-full transition-all duration-700 ease-out mb-5 mt-2" />

          {/* Description */}
          <p className="text-[#1A2E1A]/45 text-sm font-light leading-relaxed group-hover:text-[#1A2E1A]/65 transition-colors duration-400">
            {category.description}
          </p>

        </div>
      </Link>
    </motion.article>
  );
}
