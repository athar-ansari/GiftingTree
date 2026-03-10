import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import weddingImg from '../assets/wedding.jpg';
import nameplateImg from '../assets/nameplateImg.png';
import flatlayImg from '../assets/flatlayImg.png';

const guideCategories = [
    {
        id: 1,
        title: 'For Weddings',
        subtitle: 'Varmala & Timeless Keepsakes',
        image: weddingImg,
        link: '/resin-products?category=varmala'
    },
    {
        id: 2,
        title: 'Home & Living',
        subtitle: 'Elevating Everyday Spaces',
        image: flatlayImg,
        link: '/resin-products'
    },
    {
        id: 3,
        title: 'Corporate Identity',
        subtitle: 'Bespoke Nameplates',
        image: nameplateImg,
        link: '/resin-products'
    },
];

export default function GiftingGuide() {
    return (
        <section className="w-full bg-[#EAE9E0] py-24 lg:py-32 overflow-hidden border-t border-[#E8EFE5]/50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Minimalist Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
                >
                    <div>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#8A9A83]"></span>
                            <span className="text-[#8A9A83] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-semibold font-sans">
                                Gifting Concierge
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2E1A] font-notoSerif tracking-tight leading-[1.1]">
                            The Art of <span className="italic font-light text-[#4B5945]">Giving.</span>
                        </h2>
                    </div>

                    <p className="text-[#5C6B55] max-w-sm text-sm md:text-base font-light leading-relaxed">
                        Allow us to guide you to the perfect piece. Handcrafted luxury tailored for every beautiful milestone in life.
                    </p>
                </motion.div>

                {/* The Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {guideCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                to={category.link}
                                aria-label={`Shop premium resin gifts for ${category.title} - ${category.subtitle}`}
                                className="group block w-full h-[60vh] sm:h-[400px] lg:h-[500px] relative rounded-[2rem] overflow-hidden cursor-pointer shadow-lg"
                            >

                                {/* Background Image with Zoom on Hover */}
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={category.image}
                                        alt={`Premium Resin ${category.title} Gift - ${category.subtitle}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform [transition-duration:] [transition-timing-function:] group-hover:scale-105"
                                    />
                                    {/* Deep luxury gradient overlay for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-90"></div>
                                </div>

                                {/* Content Area */}
                                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                                    {/* Magnetic Arrow button moving on hover */}
                                    <div className="mb-4 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-white transition-colors duration-500 ease-out transform group-hover:-translate-y-2">
                                        <FiArrowRight className="text-white group-hover:text-[#1A2E1A] w-5 h-5 group-hover:-rotate-45 transition-transform duration-500 ease-out" />
                                    </div>

                                    <span className="text-[#D4E0CE] text-[10px] tracking-[0.3em] uppercase mb-2 font-medium font-sans transform transition-transform duration-700 group-hover:-translate-y-2">
                                        {category.subtitle}
                                    </span>

                                    <h3 className="text-3xl md:text-4xl font-bold font-notoSerif text-white leading-none transform transition-transform duration-700 ease-out group-hover:text-[#D4E0CE] group-hover:-translate-y-2">
                                        {category.title}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
