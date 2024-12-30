import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ImageGallery({ images = [] }) {
  const [mainImage, setMainImage] = useState(images[0] || '');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemsPerPage = 1; // Number of thumbnails per page
  const [currentPage, setCurrentPage] = useState(1);

  if (!images.length) return null;

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const firstImageOnNewPage = images[(newPage - 1) * itemsPerPage];
    setMainImage(firstImageOnNewPage);
    setSelectedIndex((newPage - 1) * itemsPerPage);
  };

  return (
    <div className="grid gap-4 font-notoSerif">
      {/* Main Image */}
      <div className="relative w-full h-[400px] max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl bg-gray-100 mt-3">
        <AnimatePresence mode="wait">
          <motion.img
            key={mainImage}
            src={mainImage}
            alt="Product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Heading and Pagination */}
      {images.length > 1 && (
        <div className="relative">
          {/* "Related Images" Heading */}
          <h2 className="text-center text-4xl font-semibold mt-4 font-lora ">Related Images</h2>

          {/* Pagination */}
          {images.length > itemsPerPage && (
            <div className="flex justify-center items-center mt-4 gap-2">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handlePageChange(pageIndex + 1)}
                  className={`w-8 h-8 rounded-full ${currentPage === pageIndex + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                >
                  {pageIndex + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
