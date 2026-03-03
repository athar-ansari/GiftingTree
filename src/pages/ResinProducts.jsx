import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../lib/sanityClient';
import { CATEGORIES } from '../lib/constants';
import SkeletonLoader from '../components/SkeletonLoader';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Categories list
const categories = [
    "All",
    "Best Seller",
    "Bookmarks",
    "New Arrival",
    "Limited Edition",
    "Key Chains",
    "Puja Thali",
    "Wall Art",
    "Book Holder",
    "Jewellery",
    "Car Accessories",
    "Flower Preservation",
    "Varmala",
    "Clock",
    "Resin Frame",
    "Other Products",
];
// Build allowed category slugs from the above list (excluding "All")
const allowedCategorySlugs = categories
    .filter((c) => c !== "All")
    .map((c) => c.toLowerCase().replace(/\s+/g, '-'));

// Helper: robust slugify for matching regardless of spaces/hyphens/case
function toSlug(value) {
    if (!value || typeof value !== 'string') return '';
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function ResinProducts() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = '*[_type == "product" && count((category[])[@ in $allowed]) > 0] | order(_createdAt desc)'; // Only allowed categories
                const params = { allowed: allowedCategorySlugs };
                const products = await client.fetch(query, params);
                setProducts(products);
            } catch (err) {
                console.error("Error fetching resin products:", err);
                setError("Unable to load products. Please check your internet connection! 🥺");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Extract category from URL
        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get('category');
        if (categoryFromUrl) {
            const match = categories.find((c) => toSlug(c) === toSlug(categoryFromUrl));
            setSelectedCategory(match || "All");
        }
    }, [location]);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const selectedSlug = toSlug(selectedCategory);
        const productCategorySlugs = Array.isArray(product.category)
            ? product.category.map((cat) => toSlug(cat))
            : [];
        const matchesCategory = selectedCategory === "All" || productCategorySlugs.includes(selectedSlug);
        return matchesSearch && matchesCategory;
    });

    // Reset to page 1 when category or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

    const maxPagesToShow = 4;

    const getPageNumbers = () => {
        const pages = [];
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

        let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        let endPage = startPage + maxPagesToShow - 2;

        // Ensure the last pages are visible if currentPage is near the end
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="min-h-screen bg-[#F4F5F0] text-[#1A2E1A] font-sans selection:bg-[#1A2E1A] selection:text-[#F4F5F0] pt-32 pb-24">
            <Helmet>
                <title>Premium Resin Products & Customized Gifts | Gifting Tree</title>
                <meta name="description" content="Shop beautiful handcrafted resin masterpieces at Gifting Tree. Explore our collection of custom keychains, preserved varmala frames, bookmarks, and personalized wedding gifts." />
                <meta name="keywords" content="resin products, customized gifts, varmala preservation, resin keychains, custom bookmarks, wedding gifts, handmade art" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Premium Resin Products & Customized Gifts | Gifting Tree" />
                <meta property="og:description" content="Shop beautiful handcrafted resin masterpieces at Gifting Tree. Explore our collection of custom keychains, preserved varmala frames, bookmarks, and personalized wedding gifts." />
                <meta property="og:url" content="https://gifting-tree.vercel.app/resin-products" />
                <meta property="og:image" content="https://gifting-tree.vercel.app/android-chrome-512x512.png" />
                <meta property="og:image:width" content="512" />
                <meta property="og:image:height" content="512" />
                <meta property="og:image:type" content="image/png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Premium Resin Products & Customized Gifts | Gifting Tree" />
                <meta name="twitter:description" content="Shop beautiful handcrafted resin masterpieces at Gifting Tree. Explore our collection of custom keychains, preserved varmala frames, bookmarks, and personalized wedding gifts." />
                <meta name="twitter:image" content="https://gifting-tree.vercel.app/android-chrome-512x512.png" />
            </Helmet>

            {error ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 flex flex-col items-center justify-center">
                    <p className="text-xl font-bold text-red-500">{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-6 px-8 py-3 bg-[#1A2E1A] text-white rounded-full font-bold hover:bg-[#4B5945] transition-colors duration-300">Try Again</button>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Premium Header */}
                    <div className="text-center mb-12 flex flex-col items-center">
                        <span className="text-[#8A9A83] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
                            Our Collection
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1] font-notoSerif text-[#1A2E1A]">
                            Resin <span className="italic font-light text-[#4B5945]">Masterpieces.</span>
                        </h1>
                    </div>

                    {/* Search Section */}
                    <div className="mb-10">
                        <div className="relative max-w-xl mx-auto group">
                            <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#1A2E1A]/40 text-lg group-focus-within:text-[#1A2E1A] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search the collection..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 rounded-full border border-[#1A2E1A]/10 bg-white shadow-sm hover:shadow-md focus:shadow-md focus:border-[#1A2E1A]/20 focus:outline-none transition-all duration-300 text-[#1A2E1A] placeholder-[#1A2E1A]/40 font-medium"
                            />
                        </div>
                    </div>

                    {/* Category Buttons */}
                    <div className="mb-16">
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map(category => {
                                const isActive = selectedCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${isActive
                                            ? 'bg-[#1A2E1A] text-white shadow-md transform scale-105'
                                            : 'bg-white text-[#1A2E1A]/60 border border-[#1A2E1A]/10 hover:border-[#1A2E1A]/30 hover:text-[#1A2E1A] hover:shadow-sm'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {loading ? (
                            <SkeletonLoader count={6} />
                        ) : currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
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
                                        <div className="w-full aspect-[4/5] overflow-hidden bg-white rounded-[2rem] mb-6 shadow-sm group-hover:shadow-[0_20px_40px_rgba(26,46,26,0.08)] transition-all duration-700 relative">
                                            <img
                                                src={urlFor(product.frontImage).url()}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                            />
                                            {/* Minimalist Top Badge */}
                                            <div className="absolute top-5 left-5 z-10 transition-opacity duration-300 group-hover:opacity-0">
                                                <span className="bg-white/95 backdrop-blur-md text-[#1A2E1A] text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-sm">
                                                    {product.category?.[0] || 'Resin'}
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
                                                            : 'Sold Out'}
                                                    </span>
                                                </div>

                                                {/* Premium Call To Action Bottom - Matched to BestSellers */}
                                                <div className="w-full flex justify-end mt-4">
                                                    <div className="group/btn relative focus:outline-none rounded-full inline-block transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1">
                                                        {/* Base Shadow Layer */}
                                                        <div className="absolute inset-0 rounded-full bg-[#1A2E1A] shadow-[0_4px_15px_rgba(26,46,26,0.15)] transition-opacity duration-500 ease-in-out group-hover/btn:opacity-0 pointer-events-none"></div>

                                                        {/* Hover Shadow Layer */}
                                                        <div className="absolute inset-0 rounded-full bg-[#1A2E1A] shadow-[0_8px_25px_rgba(26,46,26,0.25)] ring-1 ring-[#1A2E1A]/30 opacity-0 transition-opacity duration-500 ease-in-out group-hover/btn:opacity-100 pointer-events-none"></div>

                                                        {/* Inner Content Layer with Overflow Hidden */}
                                                        <div className="relative flex items-center overflow-hidden rounded-full w-full h-full p-1.5 transform-gpu">

                                                            {/* Subtle Ambient Glow */}
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4B5945]/60 to-transparent translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out pointer-events-none z-0"></div>

                                                            {/* Text Content */}
                                                            <span className="relative z-10 px-4 sm:px-5 text-white font-semibold text-[10px] sm:text-xs tracking-wide whitespace-nowrap drop-shadow-sm font-sans uppercase">
                                                                View Details
                                                            </span>

                                                            {/* Elegant Glass Icon Container */}
                                                            <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center border border-white/20 group-hover/btn:bg-white transition-colors duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] shadow-sm shrink-0">
                                                                <FiArrowRight className="text-[#1A2E1A] group-hover/btn:-rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-16 h-16 rounded-full bg-white border border-[#1A2E1A]/10 flex items-center justify-center mb-6 shadow-sm">
                                    <FiSearch className="text-[#1A2E1A]/30 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold font-notoSerif text-[#1A2E1A] mb-2">No masterpieces found</h3>
                                <p className="text-[#1A2E1A]/60 mb-6 font-medium">Try searching for something else or adjusting filters.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                                    className="bg-[#1A2E1A] text-white px-8 py-3 rounded-full font-bold hover:bg-[#4B5945] transition-colors shadow-md"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* Pagination */}
                    {!loading && !error && filteredProducts.length > itemsPerPage && (
                        <nav className="mt-20 flex justify-center items-center gap-x-3" aria-label="Pagination">
                            <button
                                type="button"
                                className="min-h-[44px] min-w-[44px] py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-full bg-white border border-[#1A2E1A]/10 text-[#1A2E1A]/60 hover:text-[#1A2E1A] hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 font-semibold shadow-sm"
                                aria-label="Previous"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                <MdChevronLeft className='text-xl' />
                                <span className="hidden sm:inline">Prev</span>
                            </button>

                            <div className="flex items-center gap-x-2">
                                {getPageNumbers().map((pageNumber) => {
                                    const isActive = currentPage === pageNumber;
                                    return (
                                        <button
                                            key={pageNumber}
                                            type="button"
                                            className={`w-11 h-11 flex justify-center items-center text-sm font-bold rounded-full focus:outline-none transition-all duration-300 ${isActive
                                                ? 'bg-[#1A2E1A] text-white shadow-md'
                                                : 'bg-white border border-[#1A2E1A]/10 text-[#1A2E1A]/60 hover:text-[#1A2E1A] hover:bg-gray-50 shadow-sm'
                                                }`}
                                            onClick={() => setCurrentPage(pageNumber)}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                className="min-h-[44px] min-w-[44px] py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-full bg-white border border-[#1A2E1A]/10 text-[#1A2E1A]/60 hover:text-[#1A2E1A] hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 font-semibold shadow-sm"
                                aria-label="Next"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <span className="hidden sm:inline">Next</span>
                                <MdChevronRight className='text-xl' />
                            </button>
                        </nav>
                    )}

                </div>
            )}
        </div>
    );
}

export default ResinProducts;
