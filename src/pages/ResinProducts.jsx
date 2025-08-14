import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { client, urlFor } from '../lib/sanityClient';
import Preloader from '../components/Loader';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";


//  categories list
const categories = [
    "All",
    "Best Seller",
    "New Arrival",
    "Limited Edition",
    "Key Chains", "Jewellery", "Car Accessories", "Clock", "Resin Frame", "Bookmarks", "Puja Thali", "Wall Art",
    "Book Holder", "Flower Preservation", "Varmala", "Other Products"
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
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchProducts = async () => {
            const query = '*[_type == "product" && count((category[])[@ in $allowed]) > 0] | order(_createdAt desc)'; // Only allowed categories
            const params = { allowed: allowedCategorySlugs };
            const products = await client.fetch(query, params);
            setProducts(products);
            setLoading(false);
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

    const indexOfLastItem = currentPage * itemsPerPage; const indexOfFirstItem = indexOfLastItem - itemsPerPage; const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem); const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); }; const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            {loading ? (
                <Preloader />
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search Section */}
                    <div className="mb-8">
                        <div className="relative max-w-lg mx-auto">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="text"
                                placeholder="Search for your perfect gift..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg focus:ring-4 focus:ring-[#66785F]/20 focus:border-[#66785F] focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Category Buttons */}
                    <div className="mb-10">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {categories.map(category => (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-[#4B5945] to-[#66785F] text-white shadow-xl transform scale-105'
                                        : 'bg-white/90 backdrop-blur-sm text-gray-600 border-2 border-gray-200 hover:bg-white hover:border-[#66785F]/50 hover:text-[#4B5945] hover:shadow-xl'
                                        }`}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
                                >
                                    <img
                                        src={urlFor(product.frontImage).url()}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-[#4B5945]">
                                                {product.sizes && product.sizes.length > 0 ? `₹${product.sizes[0].price}` : 'Price not available'}
                                            </span>
                                            <Link
                                                to={`/product/${product.slug?.current || product._id}`}
                                                className="bg-gradient-to-r from-[#4B5945] to-[#66785F] text-white px-6 py-3 rounded-xl hover:from-[#66785F] hover:to-[#4B5945] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-2xl font-bold text-gray-500">No products found.</p>
                                <p className="text-gray-400 mt-2">Try adjusting your search or category filter</p>
                            </div>
                        )}
                    </div>
                    {/* Pagination */}
                    {filteredProducts.length > itemsPerPage && (
                        <nav className="mt-12 flex justify-center items-center gap-x-2" aria-label="Pagination">
                            <button
                                type="button"
                                className="min-h-[44px] min-w-[44px] py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-xl text-gray-700 hover:bg-white hover:shadow-lg focus:outline-none focus:bg-white disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                                aria-label="Previous"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                <MdChevronLeft className='text-[#4B5945] text-xl' />
                                <span className="font-semibold text-[#66785F]">Previous</span>
                            </button>
                            <div className="flex items-center gap-x-2">
                                {getPageNumbers().map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={`min-h-[44px] min-w-[44px] flex justify-center items-center py-3 px-4 text-sm rounded-xl focus:outline-none transition-all duration-200 ${currentPage === pageNumber
                                            ? 'bg-gradient-to-r from-[#4B5945] to-[#66785F] text-white font-bold shadow-lg'
                                            : 'text-gray-700 hover:bg-white hover:shadow-lg'
                                            }`}
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="min-h-[44px] min-w-[44px] py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-xl text-gray-700 hover:bg-white hover:shadow-lg focus:outline-none focus:bg-white disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                                aria-label="Next"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <span className="font-semibold text-[#4B5945]">Next</span>
                                <MdChevronRight className='text-[#66785F] text-xl' />
                            </button>
                        </nav>
                    )}

                </div>
            )}
        </div>
    );
}

export default ResinProducts;