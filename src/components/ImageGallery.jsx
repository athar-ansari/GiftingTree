import { useState, useRef } from 'react';

function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef(null);

  if (!images.length) return null;

  // Track the active image based on scroll position (for mobile swiping)
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollPosition / width);
      if (index !== selectedIndex) {
        setSelectedIndex(index);
      }
    }
  };

  // Scroll to a specific image when a thumbnail is clicked
  const scrollToImage = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
      setSelectedIndex(index);
    }
  };

  return (
    <div className="grid gap-4 font-notoSerif w-full">
      {/* Main Image Viewport Wrapper */}
      <div className="relative w-full aspect-[4/5] sm:h-[500px] max-w-lg mx-auto mt-2">
        {/* Swipeable Main Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white border border-gray-100"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .flex::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {images.map((img, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 snap-center relative">
              <img
                src={img}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          ))}
        </div>

        {/* Fixed Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10 pointer-events-none">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToImage(index)}
                className={`h-2 rounded-full transition-all duration-300 pointer-events-auto ${selectedIndex === index ? 'w-8 bg-white shadow-md' : 'w-2 bg-white/60 backdrop-blur-md shadow-sm hover:w-4 hover:bg-white'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Interactive Thumbnails Row */}
      {images.length > 1 && (
        <div className="relative w-full mx-auto px-2 mt-2">
          <div className="flex gap-4 overflow-x-auto snap-x py-4 px-2 justify-start lg:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => scrollToImage(index)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden snap-center transition-all duration-300 shadow-sm ${selectedIndex === index
                  ? 'ring-2 ring-offset-2 ring-[#4B5945] opacity-100 scale-110 shadow-md'
                  : 'opacity-60 hover:opacity-100 border border-gray-200'
                  }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
