import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import collageImg from "../assets/Hero.png";

const Hero = () => {
    return (
        <section className="relative w-full bg-[#F4F5F0] overflow-hidden pt-36 pb-16 lg:pt-36 lg:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                    {/* Text Column - Elegant, Bright, Clear Typography */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-[#E8EFE5] text-[#66785F] text-xs sm:text-sm font-semibold mb-4 mx-auto lg:mx-0 w-fit"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#4B5945]"></span>
                            Premium Handcrafted Gifts
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-[#2C3E20] leading-[1.15] mb-5 tracking-tight font-notoSerif">
                            Turn your special <br className="hidden lg:block" />
                            moments into <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B5945] to-[#8A9A83]">Timeless Art</span>.
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Discover exquisite resin masterpieces, from beautifully preserved Varmalas to customized wedding gifts tailored just for you.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mt-6">
                            <Link
                                to="/resin-products"
                                aria-label="Explore our full collection of premium handcrafted resin gifts"
                                className="group relative focus:outline-none focus:ring-4 focus:ring-[#D4E0CE] rounded-full inline-block transform-gpu transition-transform duration-500 [transition-timing-function:] hover:-translate-y-1.5"
                            >
                                {/* Base Shadow Layer (Active when NOT hovered) */}
                                <div className="absolute inset-0 rounded-full bg-[#2C3E20] shadow-[0_8px_20px_rgba(44,62,32,0.3)] transition-opacity duration-500 ease-in-out group-hover:opacity-0 pointer-events-none"></div>

                                {/* Hover Shadow Layer (Active when Hovered) */}
                                <div className="absolute inset-0 rounded-full bg-[#2C3E20] shadow-[0_15px_35px_rgba(44,62,32,0.5)] ring-1 ring-[#1A2E1A]/50 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 pointer-events-none"></div>

                                {/* Inner Content Layer with Overflow Hidden (for the sweeping light) */}
                                <div className="relative flex items-center overflow-hidden rounded-full w-full h-full px-2 py-2 transform-gpu">

                                    {/* Subtle Ambient Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4B5945]/60 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform [transition-duration:] ease-in-out pointer-events-none z-0"></div>

                                    {/* Text Content */}
                                    <span className="relative z-10 px-6 sm:px-8 text-white font-semibold text-sm sm:text-base tracking-wide whitespace-nowrap drop-shadow-sm">
                                        Explore Collection
                                    </span>

                                    {/* Elegant Icon Container */}
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-[#F4F5F0] rounded-full flex items-center justify-center shrink-0 z-10 shadow-inner">
                                        <FiArrowRight className="text-[#1A2E1A] w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 [transition-timing-function:] group-hover:-rotate-45" />
                                    </div>

                                </div>
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F4F5F0] bg-gray-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Customer" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-600">Loved by 1000+ happy customers</span>
                        </div>
                    </motion.div>

                    {/* Image Column - Single Collage Card */}
                    <div className="w-full lg:w-1/2 h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[68vh] max-w-[400px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-none mx-auto mt-8 md:mt-12 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="relative w-full h-full rounded-[2rem] shadow-2xl group border-[6px] border-white bg-white"
                        >
                            <div className="w-full h-full rounded-[1.75rem] overflow-hidden relative">
                                <img
                                    src={collageImg}
                                    alt="Luxury Handcrafted Resin Art and Varmala Preservation Masterpieces"
                                    loading="eager"
                                    fetchpriority="high"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Ultra-Premium Glass & Gold Rotating Authenticity Seal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute -bottom-10 -right-6 sm:-bottom-14 sm:-right-14 w-36 h-36 sm:w-44 sm:h-44 rounded-full z-30 flex items-center justify-center cursor-pointer group/seal"
                            >
                                {/* The Base: Thick Frosted Glass with a soft, expansive glow */}
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/50 group-hover/seal:border-white/80 transition-colors duration-500"></div>

                                {/* Deep Emerald Text Track (provides high contrast for text) */}
                                <div className="absolute inset-2 sm:inset-2.5 bg-[#1A2E1A]/90 backdrop-blur-md rounded-full shadow-inner border border-black/20"></div>

                                {/* Beautifully tracked, slowly rotating text ring in Champagne White */}
                                <div className="absolute inset-3 sm:inset-3.5 animate-[spin_25s_linear_infinite] group-hover/seal:animate-[spin_10s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                        <defs>
                                            <path id="ultraSealPath" d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
                                        </defs>
                                        <text className="text-[9px] sm:text-[10.5px] font-bold uppercase tracking-[0.25em] fill-[#F5F5F0]">
                                            <textPath href="#ultraSealPath" startOffset="0%">
                                                100% HANDCRAFTED • ARTISANAL GALLERY •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>

                                {/* The Core: A pristine white center with a sleek bespoke star */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-[#F4F5F0] shadow-[0_4px_10px_rgba(0,0,0,0.1)] relative z-10">
                                        {/* Elegant 4-Point Star (Sparkle) that elegantly rotates on hover */}
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A2E1A] group-hover/seal:rotate-[135deg] transition-transform [transition-duration:] [transition-timing-function:]" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C12.3333 7 17 11.6667 22 12C17 12.3333 12.3333 17 12 22C11.6667 17 7 12.3333 2 12C7 11.6667 11.6667 7 12 2Z" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
