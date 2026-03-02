import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiArrowLeft, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import ImageGallery from '../components/ImageGallery';
import RelatedProducts from '../components/RelatedProducts';
import { client, urlFor } from '../lib/sanityClient';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

const categoryMapping = {
  'best-seller': 'Best Seller',
  'bookmarks': 'Bookmarks',
  'new-arrival': 'New Arrival',
  'limited-edition': 'Limited Edition',
  'key-chains': 'Key Chains',
  'puja-thali': 'Puja Thali',
  'wall-art': 'Wall Art',
  'book-holder': 'Book Holder',
  'jewellery': 'Jewellery',
  'car-accessories': 'Car Accessories',
  'flower-preservation': 'Flower Preservation',
  'varmala': 'Varmala',
  'clock': 'Clock',
  'resin-frame': 'Resin Frame',
  'other-products': 'Other Products',
};

const faqs = [
  { q: "How many days does it take to make?", a: "Customized items usually take 5-7 working days to craft with care before dispatch." },
  { q: "What are the shipping charges?", a: "Shipping is calculated at checkout based on your location. Standard delivery usually takes 3-5 days." },
  { q: "Can I return a customized product?", a: "Since customized products are made specifically for you, they cannot be returned or exchanged. Please ensure all details are correct before ordering." }
];

const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left focus:outline-none group">
        <span className="font-semibold text-gray-800 transition-colors group-hover:text-[#4B5945]">{q}</span>
        <span className="text-gray-500 transition-transform duration-300">{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pt-3 text-gray-600 text-sm font-lora leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Arre yaar, product ki details laane mein problem ho rahi hai. Internet check karo! 🥺");
      } finally {
        setLoading(false); // End loading on error
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#4B5945] text-white rounded-lg font-bold">Fir se try karein</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product nahi mila ya remove ho gaya hai 😔</h2>
        <button onClick={() => navigate('/resin-products')} className="px-6 py-2 bg-[#4B5945] text-white rounded-lg font-bold">All Products Dekhein</button>
      </div>
    );
  }

  const handleCustomize = () => {
    // Validation: Require size selection if sizes exist
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size first! 📏', {
        style: {
          border: '1px solid #EF4444',
          padding: '16px',
          color: '#7F1D1D',
          fontWeight: 'bold',
          borderRadius: '12px'
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFFAEE',
        },
      });
      return;
    }

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
      <Helmet>
        <title>{product.name} | Gifting Tree</title>
        <meta name="description" content={product.description || `Buy ${product.name} at Gifting Tree. Explore our handcrafted collection.`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={urlFor(product.frontImage).width(800).height(800).url()} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:url" content={`https://gifting-tree.vercel.app/product/${product.slug?.current || product._id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={urlFor(product.frontImage).width(800).height(800).url()} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "${product.name}",
              "image": "${urlFor(product.frontImage).url()}",
              "description": "${product.description ? product.description.replace(/"/g, '&quot;') : `Buy ${product.name} at Gifting Tree.`}",
              "brand": {
                "@type": "Brand",
                "name": "Gifting Tree"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://gifting-tree.vercel.app/product/${product.slug?.current || product._id}",
                "priceCurrency": "INR",
                "price": "${product.basePrice || (product.sizes && product.sizes[0]?.price) || "0"}",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Gifting Tree"
                }
              }
            }
          `}
        </script>
      </Helmet>
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

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Image Gallery - Sticky on Desktop */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-28 h-max z-10">
              <ImageGallery
                images={[urlFor(product.frontImage).url(), ...(product.additionalImages || []).map(img => urlFor(img).url())]}
              />
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-7/12 space-y-6">
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

              {/* Customize Button (Desktop/Tablet) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="hidden sm:block mt-8"
              >
                <motion.button
                  whileHover={product?.sizes && product.sizes.length > 0 && !selectedSize ? {} : { scale: 1.02 }}
                  whileTap={product?.sizes && product.sizes.length > 0 && !selectedSize ? {} : { scale: 0.98 }}
                  onClick={handleCustomize}
                  className={`w-full flex items-center justify-center font-bold px-6 py-4 rounded-xl transition-all shadow-lg
                    ${product?.sizes && product.sizes.length > 0 && !selectedSize
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-[#25D366]/40 hover:shadow-xl'
                    }`}
                >
                  <FaWhatsapp className="mr-2 text-xl" />
                  {product?.sizes && product.sizes.length > 0 && !selectedSize
                    ? 'Select a Size First'
                    : 'Customize on WhatsApp'}
                </motion.button>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 pt-6 border-t border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  {faqs.map((faq, idx) => (
                    <FaqItem key={idx} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sticky Mobile Action Bar */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 pb-6 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] transition-transform duration-300 transform translate-y-0">
            <div className="flex items-center justify-between xl:max-w-7xl mx-auto gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</span>
                <span className={selectedSize || !product.sizes || product.sizes.length === 0 ? "text-xl font-bold text-[#4B5945]" : "text-sm font-medium text-red-500"}>
                  {selectedSize
                    ? `₹${selectedSize.price}`
                    : (!product.sizes || product.sizes.length === 0) && product.basePrice
                      ? `₹${product.basePrice}`
                      : 'Select Size'}
                </span>
              </div>
              <motion.button
                whileTap={product?.sizes && product.sizes.length > 0 && !selectedSize ? {} : { scale: 0.95 }}
                onClick={handleCustomize}
                className={`flex-1 flex items-center justify-center font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg
                  ${product?.sizes && product.sizes.length > 0 && !selectedSize
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-[#25D366]/40 hover:shadow-xl'
                  }`}
              >
                <FaWhatsapp className="mr-2 text-lg" />
                {product?.sizes && product.sizes.length > 0 && !selectedSize
                  ? 'Select Size'
                  : 'Customize'}
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
