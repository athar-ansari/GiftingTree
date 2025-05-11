import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import ImageGallery from '../components/ImageGallery';
import RelatedProducts from '../components/RelatedProducts';
import { client, urlFor } from '../lib/sanityClient';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

const categoryMapping = {
  'best-seller': 'Best Seller',
  'new-arrival': 'New Arrival',
  'limited-edition': 'Limited Edition',
  'key-chains': 'Key Chains',
  'jewellery': 'Jewellery',
  'car-accessories': 'Car Accessories',
  'clock': 'Clock',
  'bookmarks': 'Bookmarks',
  'puja-thali': 'Puja Thali',
  'wall-art': 'Wall Art',
  'book-holder': 'Book Holder',
  'flower-preservation': 'Flower Preservation',
  'pen': 'Pen',
  'mirror': 'Mirror',
  'dupatta': 'Dupatta',
  'register': 'Register',
  'thumb-frame': 'Thumb Frame',
  'resin-frame': 'Resin Frame',
  'nikah-frame': 'Nikah Frame',
  'nikah-favours': 'Nikah Favours',
  'mehar-box': 'Mehar Box',
  'platter': 'Platter',
  'varmala': 'Varmala',
  'wedding-cards': 'Wedding Cards',
  'others': 'Others',
  'other-products': 'Other Products',

};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("No ID provided");
        return;
      }

      setLoading(true); // Start loading
      try {
        const query = `*[_type == "product" && slug.current == $slug][0]`;
        const params = { slug: id };
        const product = await client.fetch(query, params);
        // console.log("Fetched Product:", product); // Check the fetched product
        setProduct(product);
        setLoading(false); // End loading
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false); // End loading on error
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div className='  font-bold text-2xl'>Product not found</div>;
  }

  const handleCustomize = () => {
    const productName = encodeURIComponent(`Hi, I'm interested in:\n\nProduct Name: ${product.name}\n`);
    const price = encodeURIComponent(`Price: ₹${selectedSize ? selectedSize.price : product.basePrice}\n`);
    const size = selectedSize ? encodeURIComponent(`Size: ${selectedSize.size}\n`) : '';
    const productUrl = encodeURIComponent(`Product URL: ${window.location.href}`);

    const message = `${productName}${price}${size}${productUrl}`;
    const whatsappUrl = `https://wa.me/917001967279?text=${message}`;

    const openWhatsApp = (retryCount = 0) => {
      try {
        const newWindow = window.open(whatsappUrl, '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
          if (retryCount < 3) {
            // Retry opening the link after a short delay
            setTimeout(() => openWhatsApp(retryCount + 1), 500);
          } else {
            throw new Error('Failed to open WhatsApp link after multiple attempts');
          }
        }
      } catch (error) {
        console.error("Failed to open WhatsApp link. Please check your browser settings.", error);
        alert("Unable to open WhatsApp. Please check your browser settings and allow pop-ups.");
      }
    };

    openWhatsApp();
  };


  return (
    <>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 py-8 font-notoSerif"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center  text-[#66785F] text-xl font-bold"
          >
            <FiArrowLeft className="mr-2 " />
            Back
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <ImageGallery
              images={[urlFor(product.frontImage).url(), ...(product.additionalImages || []).map(img => urlFor(img).url())]}
            />

            {/* Product Details */}
            <div className="space-y-6">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-bold text-gray-900"
              >
                {product.name}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: -20, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 text-sm font-lora"
              >
                {product.description}
              </motion.p>
              {/* Categories */}
              <div className="flex flex-wrap gap-2 font-lora">
                {product.category && product.category.length > 0 && product.category.map((cat, index) => (
                  <span key={index} className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
                    <span className="size-1.5 inline-block rounded-full bg-blue-800 dark:bg-blue-500"></span>
                    {categoryMapping[cat]}
                  </span>
                ))}
              </div>
              {/* Specifications */}
              {product.specifications && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold mb-3">Specifications : </h3>
                  <ul className="list-disc list-inside space-y-2 ">
                    {product.specifications.map((spec, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="text-gray-600"
                      >
                        {spec}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-3">Select Size:</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {product.sizes.map((size, index) => (
                      <motion.button
                        key={size.size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 rounded-lg border-2 transition-colors ${selectedSize?.size === size.size
                          ? 'border-[#4B5945] bg-indigo-50'
                          : 'border-gray-200 hover:border-[#4B5945]'
                          }`}
                      >
                        <div className="text-sm font-medium">{size.size}</div>
                        <div className="text-lg font-bold text-[#4B5945]">₹{size.price}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Price */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-[#4B5945]"
              >
                {!product.sizes && `₹${product.basePrice}`}
              </motion.div>

              {/* Default Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 font-bold"
              >
                NOTE: Customized items are made specifically for you and cannot be returned or exchanged. Make sure all details are correct before finalizing your order. Thank You! <br /> <span className='mt-4 block'> 🚫 No Cash On Delivery 🚚.</span>
              </motion.div>

              {/* Customize Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCustomize}
                className="w-full flex items-center justify-center font-bold bg-[#4B5945] text-white px-6 py-3 rounded-lg hover:bg-[#66785F] transition-colors"
              >
                <FiShoppingCart className="mr-2" />
                Customize on WhatsApp
              </motion.button>
            </div>
          </div>


          {/* Related Products */}
          <RelatedProducts currentProduct={product} />

        </div>
      </motion.div>


      {/* Info Section */}
      <Footer />
    </>
  );
}

export default ProductDetails;
