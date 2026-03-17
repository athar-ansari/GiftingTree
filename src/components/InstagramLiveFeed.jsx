import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiHeart, FiMessageCircle } from 'react-icons/fi';

const igPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1615800098779-1be32e60cccc?q=80&w=800&auto=format&fit=crop', likes: 245, comments: 18 },
  { id: 2, image: 'https://images.unsplash.com/photo-1629196914205-0a3a00ea2f6e?q=80&w=800&auto=format&fit=crop', likes: 189, comments: 12 },
  { id: 3, image: 'https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=800&auto=format&fit=crop', likes: 312, comments: 45 },
  { id: 4, image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop', likes: 156, comments: 8 },
  { id: 5, image: 'https://images.unsplash.com/photo-1600170044557-047fdef314ce?q=80&w=800&auto=format&fit=crop', likes: 421, comments: 56 },
  { id: 6, image: 'https://images.unsplash.com/photo-1600170044552-320d91bbdcff?q=80&w=800&auto=format&fit=crop', likes: 287, comments: 24 },
];

export default function InstagramLiveFeed() {
  return (
    <section className="py-20 md:py-32 bg-[#EAE9E0] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-[#8A9A83]"></span>
              <span className="text-[#8A9A83] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold">Join The Community</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2E1A] font-notoSerif tracking-tight">
              On <span className="italic font-light text-[#4B5945]">Instagram</span>
            </h2>
          </motion.div>

          <motion.a 
            href="https://instagram.com/gifting_tree" 
            target="_blank" 
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-sm hover:shadow-md border border-[#1A2E1A]/10 hover:border-[#4B5945]/30 transition-all duration-300 w-max"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white">
              <FiInstagram className="w-4 h-4" />
            </div>
            <span className="text-[#1A2E1A] font-medium text-sm">@gifting_tree</span>
          </motion.a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {igPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/gifting_tree"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-[2rem] bg-[#1A2E1A] shadow-[0_10px_30px_rgba(26,46,26,0.1)] block"
            >
              <img 
                src={post.image} 
                alt="Instagram post from Gifting Tree" 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <FiHeart className="w-5 h-5 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <FiMessageCircle className="w-5 h-5 fill-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
