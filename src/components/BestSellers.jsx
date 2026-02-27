import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 font-notoSerif">
      <>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-[#4B5945] text-center mb-4 font-lora"
        >
          Best Seller Products
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-[#66785F] text-center mb-12 -mt-2"
        >
          Premium Handmade Masterpieces
        </motion.p>

        {error ? (
          <div className="text-center py-10">
            <p className="text-xl font-bold text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#4B5945] text-white rounded-lg font-bold hover:bg-[#66785F]"
            >
              Fir se try karein
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              bestSellers.map((product) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                  }}
                  whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={urlFor(product.frontImage).url()}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.name}
                    </h3>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-2xl font-bold text-[#4B5945]">
                        {product.sizes && product.sizes.length > 0 ? `₹${product.sizes[0].price}` : 'Price not available'}
                      </span>
                      <Link
                        to={`/product/${product.slug?.current || product._id}`}
                        className="bg-[#4B5945] text-[#FFFFFF] px-4 py-2 rounded-lg hover:bg-[#66785F] transition-colors font-bold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        <div className="flex justify-center mt-8">
          <Link
            to="/resin-products?category=best-seller"
            className="bg-[#4B5945] text-[#FFFFFF] px-6 py-3 rounded-lg hover:bg-[#66785F] transition-colors font-bold"
          >
            Show More
          </Link>
        </div>
      </>
    </div>
  );
};

export default BestSellers;
