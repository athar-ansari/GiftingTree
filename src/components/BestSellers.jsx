import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import { client, urlFor } from '../lib/sanityClient';
import SkeletonLoader from './SkeletonLoader';

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const query = '*[_type == "product" && "best-seller" in category] | order(_createdAt desc) [0...6]';
        const products = await client.fetch(query);
        setBestSellers(products);
      } catch (err) {
        console.error("Error fetching best sellers:", err);
        setError("Bhai, products load nahi ho paye, internet check karlo! 😅");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="relative z-10 w-full bg-[#EAE9E0] py-20 lg:py-32 overflow-hidden border-t border-[#E8EFE5]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-[#E8EFE5] text-[#66785F] text-xs sm:text-sm font-semibold mb-6 font-sans tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-[#4B5945]"></span>
            Curated Selection
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#2C3E20] font-notoSerif tracking-tight leading-tight mb-6 max-w-4xl"
          >
            Our Most <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A9A83] to-[#4B5945] italic font-light">Adored</span> Masterpieces
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl font-sans"
          >
            A definitive collection of our finest handcrafted resin art, beloved by collectors and chosen for perfect moments.
          </motion.p>
        </div>

        {error ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-red-100">
            <p className="text-xl font-bold text-red-500 font-sans">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-8 py-3 bg-[#4B5945] text-white rounded-full font-bold hover:bg-[#2C3E20] transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-y-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            {loading ? (
              <SkeletonLoader count={3} />
            ) : (
              bestSellers.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 50, damping: 20, delay: index * 0.15 }}
                  className="group flex flex-col items-center"
                >
                  {/* Floating Glass Image Container */}
                  <Link
                    to={`/product/${product.slug?.current || product._id}`}
                    aria-label={`View details for our best-selling ${product.name} resin art`}
                    className="block relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#1A2E1A] mb-8 border   shadow-[0_20px_50px_rgba(0,0,0,0.5)]  border-white/5 transition-all duration-700 [transition-timing-function:] group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_-15px_rgba(44,62,32,0.15)] cursor-pointer"
                  >

                    {/* Inner Image Mask (creates the floating glass rim effect) */}
                    <div className="absolute inset-1.5 sm:inset-[0.45rem] rounded-[2.2rem] overflow-hidden bg-[#F4F5F0]/50">
                      {product.frontImage ? (
                        <img
                          src={urlFor(product.frontImage).width(600).height(750).quality(80).url()}
                          alt={`Premium Handcrafted Resin Art: ${product.name} - Best Seller`}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform [transition-duration:] [transition-timing-function:] group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay Ambient Flare */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"></div>

                    {/* Minimalist Reveal Quick View Button */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all [transition-duration:] [transition-timing-function:] z-10">
                      <div className="bg-[#2C3E20]/90 backdrop-blur-md text-white py-3 px-8 rounded-full font-sans font-semibold text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-2 border border-white/10 hover:bg-[#1A2E1A] transition-colors duration-300">
                        View Details
                      </div>
                    </div>
                  </Link>

                  {/* Refined Text Container */}
                  <div className="px-4 text-center w-full max-w-[90%] transition-transform duration-700 [transition-timing-function:] group-hover:-translate-y-2">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#1A2E1A] font-notoSerif mb-2 tracking-tight line-clamp-1 group-hover:text-[#4B5945] transition-colors duration-300">
                      <Link to={`/product/${product.slug?.current || product._id}`}>
                        {product.name}
                      </Link>
                    </h3>


                  </div>

                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Premium Call To Action Bottom */}
        <div className="flex justify-center mt-20 lg:mt-32">
          <Link
            to="/resin-products?category=best-seller"
            className="group relative focus:outline-none focus:ring-4 focus:ring-[#D4E0CE] rounded-full inline-block transform-gpu transition-transform duration-500 [transition-timing-function:] hover:-translate-y-1.5"
          >
            {/* Base Shadow Layer */}
            <div className="absolute inset-0 rounded-full bg-[#2C3E20] shadow-[0_8px_20px_rgba(44,62,32,0.3)] transition-opacity duration-500 ease-in-out group-hover:opacity-0 pointer-events-none"></div>

            {/* Hover Shadow Layer */}
            <div className="absolute inset-0 rounded-full bg-[#2C3E20] shadow-[0_15px_35px_rgba(44,62,32,0.5)] ring-1 ring-[#1A2E1A]/50 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 pointer-events-none"></div>

            {/* Inner Content Layer with Overflow Hidden */}
            <div className="relative flex items-center overflow-hidden rounded-full w-full h-full px-2 py-2 transform-gpu">

              {/* Subtle Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4B5945]/60 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform [transition-duration:] ease-in-out pointer-events-none z-0"></div>

              {/* Text Content */}
              <span className="relative z-10 px-8 sm:px-12 text-white font-semibold text-sm sm:text-base tracking-wide whitespace-nowrap drop-shadow-sm font-sans">
                View Entire Gallery
              </span>

              {/* Elegant Glass Icon Container */}
              <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#F4F5F0] rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white transition-colors duration-500 [transition-timing-function:] shadow-sm shrink-0">
                <FiArrowRight className="text-[#1A2E1A] group-hover:-rotate-45 transition-transform duration-500 [transition-timing-function:] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
