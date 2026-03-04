import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import ImageGallery from '../components/ImageGallery';
import RelatedProducts from '../components/RelatedProducts';
import { client, urlFor } from '../lib/sanityClient';
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
    <div className="border-b border-[#1A2E1A]/10 py-5">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left focus:outline-none group">
        <span className="font-bold text-[#1A2E1A] transition-colors group-hover:text-[#4B5945] font-notoSerif text-lg">{q}</span>
        <span className="text-[#1A2E1A]/40 transition-transform duration-500 group-hover:text-[#1A2E1A]">{isOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }} exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }} className="overflow-hidden">
            <p className="pt-4 text-[#1A2E1A]/70 text-sm md:text-base font-medium leading-relaxed font-sans">{a}</p>
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
      setSelectedSize(null); // Reset size on new product load
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#4B5945] text-white rounded-lg font-bold">Fir se try karein</button>
      </div>
    );
  }

  if (!loading && !product) {
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
      {product && (
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
            }
          `}
          </script>
        </Helmet>
      )}

      {loading && (
        <div className="min-h-screen bg-[#F4F5F0] py-12 md:py-20 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button Skeleton */}
            <div className="mb-8 md:mb-12 w-32 h-10 bg-[#1A2E1A]/10 rounded-full animate-pulse"></div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
              {/* Image Gallery Skeleton */}
              <div className="w-full lg:w-5/12 h-[60vh] lg:h-[80vh] bg-[#1A2E1A]/10 rounded-[2rem] animate-pulse"></div>

              {/* Product Info Skeleton */}
              <div className="w-full lg:w-7/12 flex flex-col pt-4">
                <div className="w-3/4 h-12 bg-[#1A2E1A]/10 rounded-lg animate-pulse mb-6"></div>
                <div className="w-full h-4 bg-[#1A2E1A]/10 rounded animate-pulse mb-3"></div>
                <div className="w-5/6 h-4 bg-[#1A2E1A]/10 rounded animate-pulse mb-3"></div>
                <div className="w-4/6 h-4 bg-[#1A2E1A]/10 rounded animate-pulse mb-8"></div>

                <div className="w-32 h-8 bg-[#1A2E1A]/10 rounded animate-pulse mb-8"></div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="h-24 bg-[#1A2E1A]/5 rounded-xl animate-pulse"></div>
                  <div className="h-24 bg-[#1A2E1A]/5 rounded-xl animate-pulse"></div>
                </div>

                <div className="w-full h-14 bg-[#1A2E1A]/10 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-[#F4F5F0] py-12 md:py-20 font-sans selection:bg-[#1A2E1A] selection:text-[#F4F5F0]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="mb-8 md:mb-12 inline-flex items-center text-[#1A2E1A]/60 bg-white border border-[#1A2E1A]/10 px-5 py-2.5 rounded-full shadow-sm text-sm font-bold uppercase tracking-widest hover:text-[#1A2E1A] hover:border-[#1A2E1A]/30 hover:shadow-md transition-all duration-300 group"
            >
              <FiArrowLeft className="mr-2.5 text-lg group-hover:-translate-x-1 transition-transform" />
              Back to Gallery
            </motion.button>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
              {/* Image Gallery - Sticky on Desktop */}
              <div className="w-full lg:w-5/12 lg:sticky lg:top-28 h-max z-10">
                <ImageGallery
                  images={[urlFor(product.frontImage).url(), ...(product.additionalImages || []).map(img => urlFor(img).url())]}
                />
              </div>

              {/* Product Details */}
              <div className="w-full lg:w-7/12 flex flex-col justify-start pb-24 lg:pb-0">
                {/* Product Title */}
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-5xl lg:text-5xl font-bold font-notoSerif text-[#1A2E1A] tracking-tight leading-tight mb-4"
                >
                  {product.name}
                </motion.h1>

                {/* Product Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[#1A2E1A]/70 text-base md:text-lg mb-6 leading-relaxed font-medium"
                >
                  {product.description}
                </motion.p>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {product.category && product.category.length > 0 && product.category.map((cat, index) => (
                    <span key={index} className="inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] bg-white border border-[#1A2E1A]/10 text-[#1A2E1A] shadow-sm">
                      <span className="w-1.5 h-1.5 inline-block rounded-full bg-[#4B5945]"></span>
                      {categoryMapping[cat] || cat}
                    </span>
                  ))}
                </div>
                {/* Specifications */}
                {product.specifications && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
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
                    className="mb-8"
                  >
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-lg font-bold text-[#1A2E1A] font-notoSerif">Select Dimensions</h3>
                      {!selectedSize && <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">Required *</span>}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {product.sizes.map((size, index) => (
                        <motion.button
                          key={size.size}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedSize(size)}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 group ${selectedSize?.size === size.size
                            ? 'border-[#1A2E1A] bg-[#1A2E1A] text-white shadow-[0_10px_20px_rgba(26,46,26,0.15)] transform scale-[1.02]'
                            : 'border-[#1A2E1A]/10 bg-white hover:border-[#1A2E1A]/40 text-[#1A2E1A] hover:bg-[#F4F5F0] hover:shadow-sm'
                            }`}
                        >
                          <div className={`text-sm font-bold tracking-wide ${selectedSize?.size === size.size ? 'text-white' : 'text-[#1A2E1A]/70 group-hover:text-[#1A2E1A]'}`}>{size.size}</div>
                          <div className={`text-xl font-black tracking-tight ${selectedSize?.size === size.size ? 'text-[#F4F5F0]' : 'text-[#4B5945]'}`}>₹{size.price}</div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Price Display */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  {!product.sizes && (
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#1A2E1A]/40 uppercase font-black tracking-[0.2em] mb-1">Total Price</span>
                      <span className="text-4xl font-bold text-[#4B5945] tracking-tight">₹{product.basePrice}</span>
                    </div>
                  )}
                </motion.div>

                {/* Information Note */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white border border-[#1A2E1A]/10 rounded-[1.5rem] p-6 text-[#1A2E1A]/80 shadow-sm relative overflow-hidden mb-8"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1A2E1A]/20"></div>
                  <h4 className="font-bold text-[#1A2E1A] mb-2 uppercase tracking-widest text-xs">Important Note</h4>
                  <p className="font-medium text-sm leading-relaxed text-[#1A2E1A]/70">
                    Customized items are crafted strictly for you and cannot be returned or exchanged. Please verify all details before confirming. <br className="hidden md:block" />
                    <span className="text-[#1A2E1A] font-bold mt-2 inline-flex items-center gap-2">
                      <span className="flex w-2 h-2 rounded-full bg-red-500"></span> Cash On Delivery is not available for custom pieces.
                    </span>
                  </p>
                </motion.div>

                {/* Customize Button (Desktop/Tablet) */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="hidden sm:block mt-8"
                >
                  <motion.button
                    whileTap={product?.sizes && product.sizes.length > 0 && !selectedSize ? {} : { scale: 0.98 }}
                    onClick={handleCustomize}
                    className={`relative group overflow-hidden w-full flex items-center justify-center font-bold px-8 py-5 rounded-3xl transition-all duration-500
                    ${product?.sizes && product.sizes.length > 0 && !selectedSize
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        : 'bg-[#1A2E1A] border border-[#1A2E1A]/20 text-white shadow-[0_8px_30px_rgba(26,46,26,0.15)] hover:shadow-[0_15px_40px_rgba(26,46,26,0.25)] hover:bg-[#2C3E20]'
                      }`}
                  >
                    {/* Subtle Glow Layer */}
                    {!(product?.sizes && product.sizes.length > 0 && !selectedSize) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#25D366]/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform [transition-duration:] ease-in-out pointer-events-none z-0"></div>
                    )}

                    <span className={`relative z-10 flex items-center text-sm tracking-[0.2em] uppercase font-bold drop-shadow-sm font-sans shrink-0 ${product?.sizes && product.sizes.length > 0 && !selectedSize ? 'text-[#1A2E1A]/40' : 'text-white'}`}>
                      <FaWhatsapp className={`mr-3 text-2xl group-hover:scale-110 transition-transform duration-300 ${product?.sizes && product.sizes.length > 0 && !selectedSize ? 'text-[#1A2E1A]/40' : 'text-[#25D366]'}`} />
                      {product?.sizes && product.sizes.length > 0 && !selectedSize
                        ? 'Select Dimensions First'
                        : 'Customize on WhatsApp'}
                    </span>
                  </motion.button>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-12 pt-8 border-t border-[#1A2E1A]/10"
                >
                  <h3 className="text-2xl font-bold font-notoSerif text-[#1A2E1A] mb-8 tracking-tight">Frequently Asked Questions</h3>
                  <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-[#1A2E1A]/5 relative overflow-hidden">
                    {/* Decorative faint watermark corner */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F4F5F0] rounded-full blur-2xl opacity-60"></div>
                    <div className="relative z-10">
                      {faqs.map((faq, idx) => (
                        <FaqItem key={idx} q={faq.q} a={faq.a} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Sticky Mobile Action Bar */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#1A2E1A]/10 p-4 pb-6 shadow-[0_-10px_30px_rgba(26,46,26,0.06)] transition-transform duration-300">
              <div className="flex items-center justify-between w-full max-w-7xl mx-auto gap-3">
                <div className="flex flex-col min-w-[30%]">
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#1A2E1A]/40 mb-1">Total</span>
                  <span className={selectedSize || !product.sizes || product.sizes.length === 0 ? "text-xl font-bold text-[#4B5945] tracking-tight" : "text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1"}>
                    {selectedSize
                      ? `₹${selectedSize.price}`
                      : (!product.sizes || product.sizes.length === 0) && product.basePrice
                        ? `₹${product.basePrice}`
                        : 'Size Req.'}
                  </span>
                </div>
                <motion.button
                  whileTap={product?.sizes && product.sizes.length > 0 && !selectedSize ? {} : { scale: 0.95 }}
                  onClick={handleCustomize}
                  className={`flex-1 relative overflow-hidden flex items-center justify-center font-bold px-4 py-4 rounded-2xl transition-all shadow-sm
                  ${product?.sizes && product.sizes.length > 0 && !selectedSize
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : 'bg-[#1A2E1A] text-white hover:bg-[#2C3E20] border border-[#1A2E1A]/20 shadow-[0_4px_15px_rgba(26,46,26,0.2)]'
                    }`}
                >
                  <span className={`relative z-10 flex items-center text-[10px] sm:text-xs tracking-widest uppercase truncate shrink-0 ${product?.sizes && product.sizes.length > 0 && !selectedSize ? 'text-[#1A2E1A]/40' : 'text-white'}`}>
                    <FaWhatsapp className={`mr-2 text-lg ${product?.sizes && product.sizes.length > 0 && !selectedSize ? 'text-[#1A2E1A]/40' : 'text-[#25D366]'}`} />
                    {product?.sizes && product.sizes.length > 0 && !selectedSize
                      ? 'Select Size'
                      : 'Customize'}
                  </span>
                </motion.button>
              </div>
            </div>


            {/* Related Products */}
            <RelatedProducts currentProduct={product} />

          </div>
        </motion.div>
      )
      }


      {/* Info Section */}
      <Footer />
    </>
  );
}

export default ProductDetails;
