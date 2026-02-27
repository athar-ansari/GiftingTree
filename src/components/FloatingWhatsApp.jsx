import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function FloatingWhatsApp() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');

  // Hide the global widget on the product page since there is already a sticky Customize button.
  if (isProductPage) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi, I have a general inquiry about Gifting Tree products.");
    const whatsappUrl = `https://wa.me/917001967279?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-[#25D366]/50 transition-shadow duration-300 before:absolute before:inset-0 before:rounded-full before:border-2 before:border-[#25D366] before:animate-ping"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8 relative z-10" />
      </motion.button>
    </AnimatePresence>
  );
}

export default FloatingWhatsApp;
