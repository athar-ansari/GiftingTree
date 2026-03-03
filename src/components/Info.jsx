import React from 'react'
import { motion } from "framer-motion";
import { FiTruck, FiPackage, FiMap } from "react-icons/fi";

const Info = () => {
    return (
        <section className="w-full bg-[#F4F5F0] py-16 lg:py-24 border-t border-[#E8EFE5]/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#1A2E1A]/10">

                    {/* Brand Promise 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="group flex items-center justify-center gap-5 w-full md:w-1/3 pt-6 md:pt-0 pb-6 md:pb-0 cursor-default"
                    >
                        <div className="relative w-12 h-12 rounded-full border border-[#1A2E1A]/10 flex items-center justify-center bg-white shadow-sm group-hover:bg-[#1A2E1A] transition-colors duration-500 ease-out shrink-0">
                            <FiTruck className="w-5 h-5 text-[#4B5945] group-hover:text-white transition-colors duration-500 ease-out group-hover:scale-110 transform-gpu" />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-base sm:text-lg font-bold font-notoSerif text-[#1A2E1A] leading-tight">All India Delivery</h3>
                            <p className="mt-1 text-[10px] sm:text-xs tracking-widest uppercase text-[#8A9A83] font-sans font-semibold">
                                Fast & Secure Shipping
                            </p>
                        </div>
                    </motion.div>

                    {/* Brand Promise 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="group flex items-center justify-center gap-5 w-full md:w-1/3 pt-6 md:pt-0 pb-6 md:pb-0 cursor-default"
                    >
                        <div className="relative w-12 h-12 rounded-full border border-[#1A2E1A]/10 flex items-center justify-center bg-white shadow-sm group-hover:bg-[#1A2E1A] transition-colors duration-500 ease-out shrink-0">
                            <FiPackage className="w-5 h-5 text-[#4B5945] group-hover:text-white transition-colors duration-500 ease-out group-hover:scale-110 transform-gpu" />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-base sm:text-lg font-bold font-notoSerif text-[#1A2E1A] leading-tight">Custom Orders</h3>
                            <p className="mt-1 text-[10px] sm:text-xs tracking-widest uppercase text-[#8A9A83] font-sans font-semibold">
                                Personalized Artwork
                            </p>
                        </div>
                    </motion.div>

                    {/* Brand Promise 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="group flex items-center justify-center gap-5 w-full md:w-1/3 pt-6 md:pt-0 pb-6 md:pb-0 cursor-default"
                    >
                        <div className="relative w-12 h-12 rounded-full border border-[#1A2E1A]/10 flex items-center justify-center bg-white shadow-sm group-hover:bg-[#1A2E1A] transition-colors duration-500 ease-out shrink-0">
                            <FiMap className="w-5 h-5 text-[#4B5945] group-hover:text-white transition-colors duration-500 ease-out group-hover:scale-110 transform-gpu" />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-base sm:text-lg font-bold font-notoSerif text-[#1A2E1A] leading-tight">Premium Quality</h3>
                            <p className="mt-1 text-[10px] sm:text-xs tracking-widest uppercase text-[#8A9A83] font-sans font-semibold">
                                Handcrafted with Love
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default Info