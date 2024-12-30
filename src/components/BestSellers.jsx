import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import Preloader from './Loader';

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      const query = '*[_type == "product" && "best-seller" in category] | order(_createdAt desc) [0...6]';
      const products = await client.fetch(query);
      setBestSellers(products);
      setLoading(false);
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 font-notoSerif">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-indigo-700 text-center mb-4 font-lora"
          >
            Best Seller Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 text-center mb-12 -mt-2"
          >
            Premium Handmade Masterpieces
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
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
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              to="/products?category=best-seller"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-bold"
            >
              Show More
            </Link>

          </div>
        </>
      )}
    </div>
  );
};

export default BestSellers;
