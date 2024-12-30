import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
            *[_type == "product" && category == "best sellers"] | order(_updatedAt desc)[0...6] {
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
      <h2 className="text-3xl font-bold text-indigo-700 text-center py-14">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
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
    </div>
  );
}

export default RelatedProducts;
