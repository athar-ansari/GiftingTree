import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Image
import logo from "../assets/logo.jpg";

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm font-notoSerif transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group shrink-0">
            <div className="relative overflow-hidden rounded-full shadow-sm md:shadow-md border-2 border-white group-hover:shadow-lg transition-all duration-300">
              <img src={logo} alt="Gifting Tree Logo" className="h-9 w-9 md:h-12 md:w-12 object-cover" />
            </div>
            <span className="ml-2 md:ml-3 text-[1.15rem] leading-none md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#2C3E20] to-[#66785F] truncate">
              Gifting Tree
            </span>
          </Link>

          {/* Action Button */}
          <div className="flex items-center ml-2">
            <Link
              to="/resin-products"
              className="bg-gradient-to-r from-[#4B5945] to-[#66785F] text-white px-4 py-1.5 md:px-6 md:py-2.5 text-xs md:text-base rounded-full shadow-sm md:shadow-[0_4px_14px_0_rgba(75,89,69,0.25)] hover:shadow-[0_4px_14px_0_rgba(75,89,69,0.39)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 font-bold whitespace-nowrap"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;