import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

// Image
import logo from "../assets/logo.webp";

function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  if (location.pathname.startsWith('/product/')) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-notoSerif flex justify-center ${isScrolled ? 'pt-4' : 'pt-6'}`}
    >
      <div
        className={`
          flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 mx-4 md:mx-10 lg:mx-16 xl:mx-20 2xl:mx-auto w-full transition-all duration-500
          rounded-full border shadow-lg backdrop-blur-2xl
          ${isScrolled
            ? 'max-w-4xl lg:max-w-4xl md:max-w-3xl bg-white/75 border-[#1A2E1A]/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
            : 'max-w-7xl bg-white/90 border-white shadow-[0_4px_20px_rgb(0,0,0,0.04)]'}
        `}
      >
        {/* Logo Section */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center group shrink-0"
        >
          <div className="relative overflow-hidden rounded-full shadow-sm border border-[#E8E8E0] group-hover:shadow-md transition-all duration-500 group-hover:scale-105">
            <img src={logo} alt="Gifting Tree Logo" className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 object-cover" />
          </div>
          <span className="ml-2.5 md:ml-3 text-[1.1rem] sm:text-[1.2rem] md:text-xl font-bold tracking-tight text-[#1A2E1A] truncate group-hover:text-[#4B5945] transition-colors duration-500">
            Gifting Tree
          </span>
        </Link>

        {/* Action Button */}
        <div className="flex items-center ml-2">
          <Link
            to="/resin-products"
            className="group relative overflow-hidden bg-[#1A2E1A] text-[#F4F5F0] px-5 py-2 md:px-7 md:py-2.5 text-xs sm:text-sm md:text-[15px] rounded-full hover:shadow-[0_8px_20px_rgba(26,46,26,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-500 font-medium whitespace-nowrap border border-[#1A2E1A]/20"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Explore Gallery</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2C3E20] to-[#4B5945] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;