import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import loadingGif from '../assets/loading.gif';

const SuspenseLoader = () => {
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#EAE9E0]/70 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        {/* Responsive GIF Loader */}
        <img 
          src={loadingGif} 
          alt="Loading..." 
          className="w-20 h-20 md:w-24 md:h-24 object-contain mix-blend-multiply drop-shadow-sm" 
        />
        
        {/* Premium subtle text */}
        <motion.div
           initial={{ opacity: 0, y: 5 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="text-[#1A2E1A]/80 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] font-sans"
        >
          Curating...
        </motion.div>
      </div>
    </div>,
    document.body
  );
};

export default SuspenseLoader;
