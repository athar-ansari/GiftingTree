import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { client, urlFor } from '../lib/sanityClient';
import Preloader from '../components/Loader';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";


//  categories list
const categories = [
  "All",
  "Best Seller",
  "New Arrival",
  "Limited Edition",
  "Key Chains",
  "Jewelry",
  "Birthday Frame",
  "Couple Frame",
  "Religious Frame",
  "Car Accessories",
  "Clock",
  "Bookmarks",
  "Puja Thali",
  "Wall Art",
  "Book Holder",
  "Flower Preservation",
  "Pen",
  "Mirror",
  "Dupatta",
  "Register",
  "Thumb Frame",
  "Nikah Frame",
  "Wedding Boards",
  "Nikah Favours",
  "Mehar Box",
  "Platter"
];

function Products() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchProducts = async () => {
      const query = '*[_type == "product"] | order(_createdAt desc)'; // Sorting by creation date
      const products = await client.fetch(query);
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
      setSelectedCategory(categoryFromUrl.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase()));
    }
  }, [location]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchesCategory = selectedCategory === "All" || (product.category && product.category.map(cat => cat.toLowerCase()).includes(selectedCategory.replace(/\s+/g, '-').toLowerCase()));
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
    <div className="min-h-screen bg-gray-50 py-8">
      {loading ? (
        <Preloader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={urlFor(product.frontImage).url()}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-2xl font-bold text-indigo-600">
                        {product.sizes && product.sizes.length > 0 ? `₹${product.sizes[0].price}` : 'Price not available'}
                      </span>
                      <Link
                        to={`/product/${product.slug.current}`}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-bold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="font-bold text-2xl">No products found.</p>
            )}
          </div>
          {/* Pagination */}
          {filteredProducts.length > itemsPerPage && (
            <nav className="mt-8 flex justify-center items-center gap-x-1" aria-label="Pagination">
              <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Previous"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <MdChevronLeft className='text-indigo-700 ' />
                <span className="font-bold text-indigo-700">Previous</span>
              </button>
              <div className="flex items-center gap-x-1">
                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none ${currentPage === pageNumber
                      ? 'bg-gray-300 text-gray-800 font-bold focus:bg-gray-300'
                      : 'text-gray-800 hover:bg-gray-200 focus:bg-gray-200'
                      }`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Next"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <span className="font-bold text-indigo-700 ">Next</span>
                <MdChevronRight className='text-indigo-700 ' />
              </button>
            </nav>
          )}

        </div>
      )}
    </div>
  );
}

export default Products;
