import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../lib/sanityClient';
import SkeletonLoader from '../components/SkeletonLoader';
import Loader from '../components/Loader';
import { festiveConfig } from '../lib/festivals';

function FestivalProducts() {
    const [products, setProducts] = useState([]);
    const [activeFestival, setActiveFestival] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [minTimePassed, setMinTimePassed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimePassed(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchFestivalAndProducts = async () => {
            try {
                // 1. Fetch active festival from Sanity
                const settings = await client.fetch('*[_type == "festivalSettings"][0]');
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
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
                <p className="text-xl font-bold text-red-400">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-6 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">Try Again</button>
            </div>
        );
    }

    const festivalStyle = activeFestival?.accentStyle || {
        textHighlight: "text-white",
        bg: "bg-white/5",
        buttonGradient: "from-gray-700 to-gray-900",
        border: "border-white/10"
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pt-32 pb-24 selection:bg-white selection:text-black">
            <Helmet>
                <title>{activeFestival ? `${activeFestival.name} Collection` : 'Festival Collection'} | Gifting Tree</title>
            </Helmet>

            <AnimatePresence>
                {(!minTimePassed || loading) && <Loader key="loader" />}
            </AnimatePresence>

            {minTimePassed && !loading && activeFestival && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Festival Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <span className={`text-xs uppercase tracking-[0.4em] font-bold mb-6 mr-3 block ${festivalStyle.textHighlight}`}>
                            {activeFestival.accentIcon} Special Collection
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight mb-8 font-notoSerif">
                            {activeFestival.title.split(activeFestival.name)[0]}
                            <span className={`italic font-serif font-thin px-2 ${festivalStyle.textHighlight}`}>
                                {activeFestival.name}
                            </span>
                            {activeFestival.title.split(activeFestival.name)[1]}
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                            {activeFestival.subtitle}
                        </p>
                    </motion.div>

                    {/* Products Grid */}
                    {products.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
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
                                        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                    className="group"
                                >
                                    <Link to={`/product/${product.slug?.current || product._id}`} className="block">
                                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/5 mb-8 border border-white/5 group-hover:border-white/20 transition-all duration-700 shadow-2xl">
                                            <img
                                                src={urlFor(product.frontImage).url()}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                                            {/* Quick view button overlay */}
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-bold text-xs uppercase tracking-wider shadow-xl">
                                                    View Item <FiArrowRight />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-2">
                                            <h3 className="text-2xl font-bold font-notoSerif mb-2 text-white/90 group-hover:text-white transition-colors">
                                                {product.name}
                                            </h3>
                                            <div className="flex justify-between items-center py-4 border-t border-white/10">
                                                <span className="text-sm font-medium text-white/50 tracking-wide uppercase">Handcrafted</span>
                                                <span className={`text-xl font-bold ${festivalStyle.textHighlight}`}>
                                                    {product.sizes && product.sizes.length > 0
                                                        ? `₹${Math.min(...product.sizes.map(size => size.price))}`
                                                        : 'Handmade'}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-32 border border-dashed border-white/10 rounded-[3rem]">
                            <FiShoppingBag className="w-12 h-12 mx-auto mb-6 text-white/20" />
                            <h2 className="text-2xl font-bold mb-2">Collection Coming Soon</h2>
                            <p className="text-white/40">We are currently preparing our exclusive {activeFestival.name} masterpieces.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FestivalProducts;
