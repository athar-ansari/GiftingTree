import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../lib/sanityClient';
import Loader from '../components/Loader';
import { festiveConfig } from '../lib/festivals';
import SEO from '../components/SEO';

function FestivalProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [activeFestival, setActiveFestival] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [minTimePassed, setMinTimePassed] = useState(false);

    useEffect(() => {
        // Force scroll to top on every mount (direct link, back button, or navigation)
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            setMinTimePassed(true);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchFestivalAndProducts = async () => {
            try {
                // 1. Fetch active festival from Sanity using singleton ID
                const settings = await client.fetch('*[_id == "festivalSettings"][0]');
                const activeId = settings?.activeFestival || festiveConfig.activeFestival;

                const festivalData = festiveConfig.festivals[activeId];
                setActiveFestival(festivalData);

                // 2. Fetch products for this festival
                const query = `*[_type == "product" && $festival in festivals] | order(_createdAt desc)`;
                const params = { festival: activeId };
                const fetchedProducts = await client.fetch(query, params);

                setProducts(fetchedProducts);
            } catch (err) {
                console.error("Error fetching festival products:", err);
                setError("Unable to load the festival collection. 🥺");
            } finally {
                setLoading(false);
            }
        };

        fetchFestivalAndProducts();
    }, []);

    if (error && minTimePassed) {
        return (
            <div className="min-h-screen bg-[#EAE9E0] text-[#1A2E1A] flex flex-col items-center justify-center p-4">
                <p className="text-xl font-bold text-red-500">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-6 px-8 py-3 bg-[#1A2E1A] text-white rounded-full font-bold hover:bg-[#4B5945] transition-colors shadow-xl">Try Again</button>
            </div>
        );
    }

    const festivalStyle = activeFestival?.accentStyle || {
        textHighlight: "text-white",
        bg: "bg-white/5",
        buttonGradient: "from-gray-700 to-gray-900",
        border: "border-white/10"
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard ✨', {
                duration: 3000,
                style: {
                    border: '1px solid rgba(26,46,26,0.1)',
                    padding: '12px 20px',
                    color: '#1A2E1A',
                    fontWeight: '600',
                    fontSize: '14px',
                    borderRadius: '100px',
                    background: '#ffffff',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                },
                iconTheme: {
                    primary: '#1A2E1A',
                    secondary: '#ffffff',
                },
            });
        } catch (err) {
            console.error('Failed to copy link:', err);
            toast.error('Failed to copy link 😔');
        }

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile && navigator.share) {
            try {
                await navigator.share({
                    title: `${activeFestival?.name || 'Festival'} Collection | Gifting Tree`,
                    text: `Explore the exclusive ${activeFestival?.name || 'Festival'} collection at Gifting Tree!`,
                    url: window.location.href,
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#EAE9E0] text-[#1A2E1A] font-sans pt-12 pb-24 selection:bg-[#1A2E1A] selection:text-[#F4F5F0] relative overflow-hidden w-full flex flex-col items-center justify-start z-0">
                {/* Soft Ambient Background Elements */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#4B5945]/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#1A2E1A]/5 rounded-full blur-[120px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <SEO 
                    title={activeFestival ? `${activeFestival.name} Collection` : 'Festival Collection'}
                    description={activeFestival?.subtitle || 'Explore our exclusive festival collection at Gifting Tree.'}
                    image={activeFestival?.heroImage}
                    url="/festival"
                />

                <AnimatePresence>
                    {(loading || !minTimePassed) ? (
                        <Loader key="loader" />
                    ) : (
                        activeFestival && (
                            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">

                        {/* Navigation Controls */}
                        <div className="flex justify-between items-center mb-8 md:mb-16 relative z-20">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/')}
                                className="inline-flex items-center text-[#1A2E1A]/70 bg-transparent hover:bg-white border border-transparent hover:border-[#1A2E1A]/10 px-3 md:px-4 py-2 md:py-2.5 rounded-full hover:shadow-[0_4px_20px_rgba(26,46,26,0.05)] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group"
                            >
                                <div className="bg-white group-hover:bg-[#EAE9E0] border border-[#1A2E1A]/10 shadow-sm rounded-full p-2 mr-3 transition-colors duration-300">
                                    <FiArrowLeft className="text-sm text-[#1A2E1A] group-hover:-translate-x-0.5 transition-transform" />
                                </div>
                                Back to Home
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleShare}
                                className="relative overflow-hidden inline-flex items-center gap-2 md:gap-3 text-[#1A2E1A] bg-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(26,46,26,0.06)] hover:shadow-[0_10px_30px_rgba(26,46,26,0.12)] border border-[#1A2E1A]/10 hover:border-[#1A2E1A]/30 transition-all duration-400 group focus:outline-none"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></span>
                                <FiShare2 className="text-base relative z-10 text-[#4B5945] group-hover:text-[#1A2E1A] group-hover:-translate-y-0.5 group-hover:rotate-12 transition-all duration-300" />
                                <span className="hidden sm:inline relative z-10 text-[#1A2E1A]/70 group-hover:text-[#1A2E1A] transition-colors duration-300">Share Page</span>
                                <span className="sm:hidden relative z-10 text-[#1A2E1A]/70 group-hover:text-[#1A2E1A] transition-colors duration-300">Share</span>
                            </motion.button>
                        </div>

                        {/* Festival Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center mb-20 md:mb-28 relative flex flex-col items-center"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white shadow-[0_2px_15px_rgba(26,46,26,0.05)] mb-8 md:mb-10 group relative overflow-hidden">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] animate-shimmer" style={{ animationDuration: '3s' }}></span>
                                <span className="text-[14px] leading-none relative z-10">{activeFestival.accentIcon}</span>
                                <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] text-[#1A2E1A]/80 flex items-center pt-[2px] relative z-10">Exclusive Collection</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1] mb-6 md:mb-8 font-notoSerif text-[#1A2E1A] max-w-5xl mx-auto">
                                {activeFestival.title.split(activeFestival.name)[0]}
                                <span className="italic font-light text-[#4B5945] px-2 md:px-4 relative inline-block">
                                    {activeFestival.name}
                                    <span className="absolute bottom-2 md:bottom-3 left-0 w-full h-[1px] bg-[#4B5945]/30"></span>
                                </span>
                                {activeFestival.title.split(activeFestival.name)[1]}
                            </h1>
                            <p className="text-base md:text-[1.1rem] text-[#1A2E1A]/60 max-w-2xl mx-auto font-medium leading-[1.8]">
                                {activeFestival.subtitle}
                            </p>
                        </motion.div>

                        {/* Products Grid */}
                        {products.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16"
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                }}
                            >
                                {products.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                        }}
                                        className="group flex flex-col cursor-pointer"
                                    >
                                        <Link to={`/product/${product.slug?.current || product._id}`} className="flex flex-col h-full w-full">

                                            {/* Gallery Image Container */}
                                            <div className="w-full aspect-[4/5] overflow-hidden bg-[#1A2E1A] rounded-[2.5rem] mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-700 relative group-hover:shadow-[0_30px_60px_-15px_rgba(75,89,69,0.3)] group-hover:-translate-y-4">
                                                {/* Glow Behind the image on Hover */}
                                                <div className="absolute inset-0 bg-[#4B5945]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen z-10 blur-xl"></div>
                                                
                                                {/* Inner Image Mask */}
                                                <div className="absolute inset-1.5 sm:inset-[0.45rem] rounded-[2.2rem] overflow-hidden bg-[#EAE9E0]/50 z-0">
                                                    {product.frontImage ? (
                                                        <img
                                                            src={urlFor(product.frontImage).url()}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[#1A2E1A]/40">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Minimalist Top Badge */}
                                                <div className="absolute top-5 left-5 z-20 transition-opacity duration-300 group-hover:opacity-0">
                                                    <span className="bg-white/80 backdrop-blur-md text-[#1A2E1A] text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-md border border-white/50">
                                                        {activeFestival.name}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Floating Metadata */}
                                            <div className="flex flex-col px-2">
                                                <h3 className="text-xl md:text-2xl font-bold font-notoSerif text-[#1A2E1A] leading-tight mb-2 group-hover:text-[#4B5945] transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>

                                                <div className="flex justify-between items-end mt-2 border-t border-[#1A2E1A]/10 pt-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-[#1A2E1A]/40 uppercase font-black tracking-[0.2em] mb-1">Starting From</span>
                                                        <span className="text-xl md:text-2xl font-bold text-[#4B5945] tracking-tight">
                                                            {product.sizes && product.sizes.length > 0
                                                                ? `₹${Math.min(...product.sizes.map(size => size.price))}`
                                                                : 'Handcrafted'}
                                                        </span>
                                                    </div>

                                                    {/* Premium Call To Action Bottom - Matched to ResinProducts */}
                                                    <div className="w-full flex justify-end mt-4">
                                                        <div className="group/btn relative focus:outline-none rounded-full inline-block transform-gpu transition-transform duration-500 ease-in-out hover:-translate-y-1">
                                                            {/* Base Shadow Layer */}
                                                            <div className="absolute inset-0 rounded-full bg-[#1A2E1A] shadow-[0_4px_15px_rgba(26,46,26,0.15)] transition-opacity duration-500 ease-in-out group-hover/btn:opacity-0 pointer-events-none"></div>

                                                            {/* Hover Shadow Layer */}
                                                            <div className="absolute inset-0 rounded-full bg-[#1A2E1A] shadow-[0_8px_25px_rgba(26,46,26,0.25)] ring-1 ring-[#1A2E1A]/30 opacity-0 transition-opacity duration-500 ease-in-out group-hover/btn:opacity-100 pointer-events-none"></div>

                                                            {/* Inner Content Layer with Overflow Hidden */}
                                                            <div className="relative flex items-center overflow-hidden rounded-full w-full h-full p-1.5 transform-gpu bg-[#1A2E1A]">

                                                                {/* Subtle Ambient Glow */}
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4B5945]/60 to-transparent translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-0"></div>

                                                                {/* Text Content */}
                                                                <span className="relative z-10 px-4 sm:px-5 text-white font-semibold text-[10px] sm:text-xs tracking-wide whitespace-nowrap drop-shadow-sm font-sans uppercase">
                                                                    View Details
                                                                </span>

                                                                {/* Elegant Glass Icon Container */}
                                                                <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center border border-white/20 group-hover/btn:bg-white transition-colors duration-500 ease-in-out shadow-sm shrink-0">
                                                                    <FiArrowRight className="text-[#1A2E1A] group-hover/btn:-rotate-45 transition-transform duration-500 ease-in-out w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center text-center py-24 px-4 relative max-w-3xl mx-auto group"
                            >
                                <div className="absolute inset-0 bg-[#4B5945]/5 rounded-[3rem] blur-xl animate-pulse"></div>
                                <div className="w-24 h-24 rounded-full bg-white/60 backdrop-blur-md border border-white/80 flex items-center justify-center shadow-[0_8px_32px_rgba(26,46,26,0.08)] relative z-10 mb-8 group-hover:scale-105 transition-transform duration-500">
                                    <span className="text-4xl leading-none">{activeFestival.accentIcon}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-notoSerif tracking-tight text-[#1A2E1A] z-10 relative">Crafting specifically for {activeFestival.name}...</h2>
                                <p className="text-[#1A2E1A]/70 font-medium max-w-md mx-auto text-sm md:text-base leading-relaxed z-10 relative">
                                    Our artists are busy bringing the exclusive {activeFestival.name} masterpieces to life. Please check back very soon!
                                </p>
                            </motion.div>
                        )}
                    </div>
                        )
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default FestivalProducts;
