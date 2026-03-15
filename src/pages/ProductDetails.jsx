import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiChevronDown, FiChevronUp, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import ImageGallery from '../components/ImageGallery';
import RelatedProducts from '../components/RelatedProducts';
import { client, urlFor } from '../lib/sanityClient';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

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
    <div className="border-b border-[#1A2E1A]/10 py-5 group last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left focus:outline-none">
        <span className={`font-bold transition-colors duration-400 font-sans text-sm md:text-base tracking-wide ${isOpen ? 'text-[#4B5945]' : 'text-[#1A2E1A] group-hover:text-[#4B5945]'}`}>
          {q}
        </span>
        <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-400 shrink-0 ${isOpen ? 'bg-[#1A2E1A] text-white rotate-180' : 'bg-transparent text-[#1A2E1A]/40 group-hover:bg-[#EAE9E0] group-hover:text-[#1A2E1A]'}`}>
          <FiChevronDown className="text-lg" />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } }} exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }} className="overflow-hidden">
            <p className="pt-5 pb-2 text-[#1A2E1A]/60 text-sm md:text-[15px] font-medium leading-[1.8] font-sans pr-10">{a}</p>
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

  const handleBack = () => {
    // If user arrived directly (e.g. via shared link), history stack is small.
    // We send them to homepage instead of trying to go back to an external app/empty tab.
    if (window.history.length <= 2) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const handleShare = async () => {
    // Both Desktop & Mobile: Copy link to clipboard and show toast
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard ✨', {
        duration: 3000,
        style: {
          border: '1px solid rgba(26,46,26,0.1)',
          padding: '12px 20px',
          color: '#1A2E1A',
          fontWeight: '600',
          fontSize: '14px',
          borderRadius: '100px',
          background: '#ffffff',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
        },
        iconTheme: {
          primary: '#1A2E1A',
          secondary: '#ffffff',
        },
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast.error('Failed to copy link 😔');
    }

    // Immediately trigger native share if mobile (setTimeout blocks navigator.share as it requires user gesture)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} | Gifting Tree`,
          text: `Check out this amazing ${product.name} on Gifting Tree!`,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }
  };

  return (
    <>
      {product && (
        <>
          <SEO 
            title={product.name}
            description={product.description || `Buy ${product.name} at Gifting Tree. Explore our handcrafted collection.`}
            image={urlFor(product.frontImage).width(1200).height(630).url()}
            url={`/product/${product.slug?.current || product._id}`}
            type="product"
            keywords={`${product.name}, Gifting Tree, resin art, handmade, customized gift`}
          />
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": product.name,
                "image": urlFor(product.frontImage).url(),
                "description": product.description || `Buy ${product.name} at Gifting Tree. Explore our handcrafted collection.`,
                "brand": { "@type": "Brand", "name": "Gifting Tree" },
                "offers": {
                  "@type": "Offer",
                  "url": "https://gifting-tree.vercel.app/product/" + (product.slug?.current || product._id),
                  "priceCurrency": "INR",
                  "price": product.basePrice || (product.sizes && product.sizes[0]?.price) || "0",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@type": "Organization", "name": "Gifting Tree" }
                }
              })}
            </script>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(({ q, a }) => ({
                  "@type": "Question",
                  "name": q,
                  "acceptedAnswer": { "@type": "Answer", "text": a }
                }))
              })}
            </script>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://gifting-tree.vercel.app/" },
                  { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://gifting-tree.vercel.app/resin-products" },
                  { "@type": "ListItem", "position": 3, "name": product.name, "item": "https://gifting-tree.vercel.app/product/" + (product.slug?.current || product._id) }
                ]
              })}
            </script>
          </Helmet>
        </>
      )}

      {loading && (
        <div className="min-h-screen bg-[#EAE9E0] py-12 md:py-20 font-sans">
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
          className="min-h-screen bg-[#EAE9E0] py-12 md:py-20 font-sans selection:bg-[#1A2E1A] selection:text-[#F4F5F0]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8 md:mb-10 relative z-20">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBack}
                className="inline-flex items-center text-[#1A2E1A]/70 bg-transparent hover:bg-white border border-transparent hover:border-[#1A2E1A]/10 px-3 md:px-4 py-2 md:py-2.5 rounded-full hover:shadow-[0_4px_20px_rgba(26,46,26,0.05)] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group"
              >
                <div className="bg-white group-hover:bg-[#EAE9E0] border border-[#1A2E1A]/10 shadow-sm rounded-full p-2 mr-3 transition-colors duration-300">
                  <FiArrowLeft className="text-sm text-[#1A2E1A] group-hover:-translate-x-0.5 transition-transform" />
                </div>
                Back to Gallery
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="hidden sm:inline-flex relative overflow-hidden items-center gap-2 md:gap-3 text-[#1A2E1A] bg-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(26,46,26,0.06)] hover:shadow-[0_10px_30px_rgba(26,46,26,0.12)] border border-[#1A2E1A]/10 hover:border-[#1A2E1A]/30 transition-all duration-400 group focus:outline-none"
              >
                {/* Shiny overlay effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></span>
                <FiShare2 className="text-base relative z-10 text-[#4B5945] group-hover:text-[#1A2E1A] group-hover:-translate-y-0.5 group-hover:rotate-12 transition-all duration-300" />
                <span className="relative z-10 text-[#1A2E1A]/70 group-hover:text-[#1A2E1A] transition-colors duration-300">Share Product</span>
              </motion.button>
            </div>

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
                  className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-notoSerif text-[#1A2E1A] tracking-tighter leading-[1.1] mb-5 md:mb-6"
                >
                  {product.name}
                </motion.h1>

                {/* Product Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[#1A2E1A]/70 text-base md:text-[1.1rem] mb-8 leading-[1.8] font-medium max-w-[95%]"
                >
                  {product.description}
                </motion.p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2.5 mb-12">
                  {product.category && product.category.length > 0 && product.category.map((cat, index) => (
                    <span key={index} className="inline-flex items-center gap-x-2 py-1.5 px-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] bg-white border border-[#1A2E1A]/10 text-[#1A2E1A] shadow-sm hover:shadow-md hover:border-[#1A2E1A]/20 transition-all cursor-default">
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
                    className="mb-12 bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 border border-white/50 shadow-[0_8px_32px_rgba(26,46,26,0.06)] relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4B5945]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="h-[2px] w-8 bg-[#4B5945]/40 rounded-full"></div>
                      <h3 className="text-base md:text-lg font-bold italic font-notoSerif tracking-wider text-[#1A2E1A]/90">Specifications</h3>
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-[#1A2E1A]/10 to-transparent"></div>
                    </div>
                    <ul className="space-y-3.5">
                      {product.specifications.map((spec, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="text-[#1A2E1A]/80 font-medium flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1A2E1A]/30 mt-2 shrink-0"></span>
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
                    className="mb-12"
                  >
                    <div className="flex justify-between items-baseline mb-6">
                      <h3 className="text-2xl font-bold text-[#1A2E1A] font-notoSerif tracking-tight">Select Dimensions</h3>
                      {!selectedSize && <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50/80 px-4 py-1.5 rounded-full border border-red-500/20 shadow-sm animate-pulse-slow">Required *</span>}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {product.sizes.map((size, index) => (
                        <motion.button
                          key={size.size}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedSize(size)}
                          className={`relative overflow-hidden p-5 rounded-3xl border transition-all duration-400 flex flex-col items-center justify-center gap-2 group ${selectedSize?.size === size.size
                            ? 'border-[#4B5945] bg-[#1A2E1A] text-white shadow-[0_0_20px_rgba(75,89,69,0.3)] transform scale-[1.02]'
                            : 'border-[#1A2E1A]/10 bg-white/60 backdrop-blur-md hover:border-[#1A2E1A]/30 text-[#1A2E1A] hover:bg-white hover:shadow-[0_8px_20px_rgba(26,46,26,0.06)]'
                            }`}
                        >
                          {selectedSize?.size === size.size && (
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[150%] animate-shimmer"></span>
                          )}
                          <div className={`text-xs md:text-sm font-bold tracking-widest uppercase z-10 ${selectedSize?.size === size.size ? 'text-white/90' : 'text-[#1A2E1A]/50 group-hover:text-[#1A2E1A]/80'}`}>{size.size}</div>
                          <div className={`text-xl md:text-2xl font-black tracking-tighter z-10 ${selectedSize?.size === size.size ? 'text-white' : 'text-[#1A2E1A]'}`}>
                            ₹{size.price}
                          </div>
                          <AnimatePresence>
                            {selectedSize?.size === size.size && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute top-3 right-3 bg-[#4B5945] text-white rounded-full p-1 shadow-md"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </motion.div>
                            )}
                          </AnimatePresence>
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
                    <div className="flex flex-col mb-12 bg-white rounded-[2rem] p-6 sm:p-8 border border-[#1A2E1A]/5 shadow-[0_4px_20px_rgba(26,46,26,0.03)] items-start">
                      <span className="text-[10px] text-[#1A2E1A]/50 uppercase font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
                        Price
                      </span>
                      <span className="text-4xl md:text-5xl font-black text-[#1A2E1A] tracking-tighter">₹{product.basePrice}</span>
                    </div>
                  )}
                </motion.div>

                {/* Information Note */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[1.5rem] p-6 text-[#1A2E1A]/80 shadow-[0_8px_32px_rgba(26,46,26,0.04)] relative overflow-hidden mb-8 group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#4B5945] to-[#1A2E1A]/30"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#4B5945]/5 rounded-full blur-2xl group-hover:bg-[#4B5945]/10 transition-colors pointer-events-none"></div>
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <h4 className="font-semibold text-[#1A2E1A] italic font-notoSerif tracking-wider text-sm md:text-base">Important Note</h4>
                    <div className="h-[1px] flex-grow bg-[#1A2E1A]/10"></div>
                  </div>
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
                    className={`relative group overflow-hidden w-full flex items-center justify-center font-bold px-8 py-5 md:py-6 rounded-3xl transition-all duration-500
                    ${product?.sizes && product.sizes.length > 0 && !selectedSize
                        ? 'bg-[#EAE9E0] text-gray-400 cursor-not-allowed border border-[#1A2E1A]/10'
                        : 'bg-[#1A2E1A] border border-[#1A2E1A]/20 text-white shadow-[0_10px_35px_rgba(26,46,26,0.2)] hover:shadow-[0_20px_50px_rgba(26,46,26,0.3)] hover:-translate-y-1'
                      }`}
                  >
                    {/* Pulsing ring Effect */}
                    {!(product?.sizes && product.sizes.length > 0 && !selectedSize) && (
                      <span className="absolute w-full h-full rounded-3xl border-2 border-[#4B5945]/30 animate-ping opacity-20 hidden md:block" style={{ animationDuration: '3s' }}></span>
                    )}

                    {/* Subtle Glow Layer */}
                    {!(product?.sizes && product.sizes.length > 0 && !selectedSize) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-0"></div>
                    )}

                    <span className={`relative z-10 flex items-center text-xs md:text-sm tracking-[0.25em] uppercase font-bold drop-shadow-sm font-sans shrink-0 ${product?.sizes && product.sizes.length > 0 && !selectedSize ? 'text-[#1A2E1A]/30' : 'text-white'}`}>
                      <FaWhatsapp className={`mr-3 md:mr-4 text-2xl md:text-[28px] group-hover:scale-110 transition-transform duration-300 ${product?.sizes && product.sizes.length > 0 && !selectedSize ? 'text-[#1A2E1A]/30' : 'text-[#25D366]'}`} />
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
                  className="mt-16 pt-8 border-t border-[#1A2E1A]/10"
                >
                  <div className="flex flex-col items-start mb-8 gap-1">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1A2E1A]/50">Got Questions?</span>
                    <h3 className="text-2xl md:text-[2rem] font-bold font-notoSerif text-[#1A2E1A] tracking-tighter">Frequently Asked</h3>
                  </div>

                  <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-[#1A2E1A]/5 shadow-[0_4px_20px_rgba(26,46,26,0.03)] relative overflow-hidden">
                    {/* Decorative faint background element */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#EAE9E0] rounded-full blur-3xl opacity-50 z-0"></div>
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
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-2xl border-t border-[#1A2E1A]/5 p-4 pb-6 shadow-[0_-20px_40px_rgba(26,46,26,0.06)] transition-transform duration-300">
              <div className="flex items-center justify-between w-full max-w-7xl mx-auto gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="relative overflow-hidden flex items-center justify-center min-w-[56px] h-[56px] rounded-[1.25rem] bg-white border border-[#1A2E1A]/10 text-[#4B5945] shadow-[0_4px_15px_rgba(26,46,26,0.04)] active:bg-[#EAE9E0] transition-all group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/60 to-transparent -translate-x-[150%] active:translate-x-[150%] transition-transform duration-500 ease-in-out"></span>
                  <FiShare2 className="text-[22px] group-hover:text-[#1A2E1A] group-active:-rotate-12 group-active:-translate-y-0.5 transition-all duration-300 relative z-10" />
                </motion.button>
                <div className="flex flex-col min-w-[20%]">
                  <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#1A2E1A]/40 mb-1">Total</span>
                  <span className={selectedSize || !product.sizes || product.sizes.length === 0 ? "text-[22px] font-black text-[#1A2E1A] tracking-tighter" : "text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1"}>
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
                  className={`flex-1 relative overflow-hidden flex items-center justify-center font-bold px-4 py-4 rounded-[1.25rem] transition-all
                  ${product?.sizes && product.sizes.length > 0 && !selectedSize
                      ? 'bg-[#EAE9E0] text-gray-400 cursor-not-allowed border border-[#1A2E1A]/5'
                      : 'bg-[#1A2E1A] text-white hover:-translate-y-0.5 shadow-[0_8px_25px_rgba(26,46,26,0.2)]'
                    }`}
                >
                  {/* Subtle pulsing background on active */}
                  {!(product?.sizes && product.sizes.length > 0 && !selectedSize) && (
                     <div className="absolute inset-0 bg-[#4B5945]/20 animate-pulse pointer-events-none" style={{ animationDuration: '2.5s' }}></div>
                  )}
                  <span className={`relative z-10 flex items-center text-[10px] sm:text-xs tracking-[0.2em] uppercase truncate shrink-0 ${product?.sizes && product.sizes.length > 0 && !selectedSize ? 'text-[#1A2E1A]/40' : 'text-white'}`}>
                    <FaWhatsapp className={`mr-2.5 text-xl ${product?.sizes && product.sizes.length > 0 && !selectedSize ? 'text-[#1A2E1A]/40' : 'text-[#25D366]'}`} />
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
