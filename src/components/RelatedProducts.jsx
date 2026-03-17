import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from "react-icons/fi";
import { client, urlFor } from '../lib/sanityClient';

function RelatedProducts({ currentProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch related products, ordered by creation or update date
        const relatedQuery = `
          *[_type == "product" && _id != $currentId] | order(_updatedAt desc)[0...6] {
            _id, name, slug, frontImage, category, basePrice, sizes
          }
        `;
        let relatedProducts = await client.fetch(relatedQuery, { currentId: currentProduct._id });

        // If no related products, fetch "best sellers"
        if (relatedProducts.length === 0) {
          const bestSellersQuery = `
            *[_type == "product" && "best-seller" in category] | order(_updatedAt desc)[0...6] {
              _id, name, slug, frontImage, category, basePrice, sizes
            }
          `;
          relatedProducts = await client.fetch(bestSellersQuery);
        }

        setProducts(relatedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentProduct]);

  if (loading) {
    return <div className="text-center py-6">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-6">No products found.</div>;
  }

  return (
    <div className="py-8 font-notoSerif">
      <hr className='bg-black h-0 ' />
      <h2 className="text-3xl font-bold text-[#4B5945] text-center py-14">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="group flex flex-col cursor-pointer"
          >
            <Link to={`/product/${product.slug?.current || product._id}`} className="flex flex-col h-full w-full">

              {/* Gallery Image Container */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-[#1A2E1A] rounded-[2.5rem] mb-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-700 relative group-hover:shadow-[0_30px_60px_-15px_rgba(44,62,32,0.15)] group-hover:-translate-y-4">
                {/* Inner Image Mask */}
                <div className="absolute inset-1.5 sm:inset-[0.45rem] rounded-[2.2rem] overflow-hidden bg-[#F4F5F0]/50 z-0">
                  <img
                    src={urlFor(product.frontImage).width(600).height(750).quality(80).url()}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform [transition-duration:] [transition-timing-function:] group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Minimalist Top Badge */}
                <div className="absolute top-5 left-5 z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <span className="bg-[#2C3E20]/90 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-md border border-white/10">
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
                    <div className="group/btn relative focus:outline-none rounded-full inline-block transform-gpu transition-transform duration-500 [transition-timing-function:] hover:-translate-y-1">
                      {/* Base Shadow Layer */}
                      <div className="absolute inset-0 rounded-full bg-[#1A2E1A] shadow-[0_4px_15px_rgba(26,46,26,0.15)] transition-opacity duration-500 ease-in-out group-hover/btn:opacity-0 pointer-events-none"></div>

                      {/* Hover Shadow Layer */}
                      <div className="absolute inset-0 rounded-full bg-[#1A2E1A] shadow-[0_8px_25px_rgba(26,46,26,0.25)] ring-1 ring-[#1A2E1A]/30 opacity-0 transition-opacity duration-500 ease-in-out group-hover/btn:opacity-100 pointer-events-none"></div>

                      {/* Inner Content Layer with Overflow Hidden */}
                      <div className="relative flex items-center overflow-hidden rounded-full w-full h-full p-1.5 transform-gpu">

                        {/* Subtle Ambient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4B5945]/60 to-transparent translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform [transition-duration:] ease-in-out pointer-events-none z-0"></div>

                        {/* Text Content */}
                        <span className="relative z-10 px-4 sm:px-5 text-white font-semibold text-[10px] sm:text-xs tracking-wide whitespace-nowrap drop-shadow-sm font-sans uppercase">
                          View Details
                        </span>

                        {/* Elegant Glass Icon Container */}
                        <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center border border-white/20 group-hover/btn:bg-white transition-colors duration-500 [transition-timing-function:] shadow-sm shrink-0">
                          <FiArrowRight className="text-[#1A2E1A] group-hover/btn:-rotate-45 transition-transform duration-500 [transition-timing-function:] w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
