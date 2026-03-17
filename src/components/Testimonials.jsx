import React from "react";
import { motion } from "framer-motion";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ayesha Khan",
      rating: 5,
      comment:
        "The Nikah frame was absolutely beautiful! It added such a special touch to our wedding ceremony. A true masterpiece.",
      seed: "Ayesha",
    },
    {
      id: 2,
      name: "Fatima Sheikh",
      rating: 5,
      comment:
        "The Nikah favors were adorable and so thoughtful! They made our wedding even more memorable for all of our special guests.",
      seed: "Fari",
    },
    {
      id: 3,
      name: "Arjun Bhatia",
      rating: 5,
      comment:
        "Ordered a custom wedding register for my sister’s wedding, and everyone loved it! Beautifully detailed and exceptionally well-made.",
      seed: "ArjunV",
    },
    {
      id: 4,
      name: "Ritu Malhotra",
      rating: 5,
      comment:
        "I bought a bespoke wall art piece, and it’s now the centerpiece of my living room. Every person who visits compliments it immediately!",
      seed: "Sam2",
    },
    {
      id: 5,
      name: "Neha Kapoor",
      rating: 5,
      comment:
        "The flower preservation was magical—it protected my wedding bouquet beautifully and brought back such precious memories of my day.",
      seed: "Nora",
    },
    {
      id: 6,
      name: "Ankit Mehta",
      rating: 5,
      comment:
        "The crafted bookmarks are perfectly stunning! Fantastic for gifting to my book club friends. Absolutely loved the intricate aesthetic!",
      seed: "Max4",
    },
  ];

  return (
    <div className="w-full bg-[#1A2E1A] py-24 lg:py-32 overflow-hidden relative border-t border-[#2C3E20]">

      {/* Background Ambient Glow Elements - Significantly lowered opacity for subtlety */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4B5945]/10 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#2C3E20]/20 rounded-full blur-[150px] pointer-events-none transform translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* Midnight Elegance Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#FCFBF8] text-xs font-semibold uppercase tracking-[0.25em] mb-2 font-sans shadow-lg">
              Voices of Delight
            </div>

            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#FCFBF8] font-notoSerif tracking-tight leading-tight max-w-3xl">
              Loved by Collectors <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4E0CE] to-[#8A9A83] italic font-light">Worldwide</span>
            </h2>
          </motion.div>
        </div>

        {/* Refined 'Dark Masonry' Grid Layout  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="group flex flex-col justify-between p-8 xl:p-10 rounded-[2rem] bg-transparent border border-white/10 hover:border-[#D4E0CE]/30 hover:bg-[#2C3E20]/10 transition-colors duration-700 h-full relative overflow-hidden"
            >

              {/* Subtle Decorative Quote Icon */}
              <div className="absolute top-8 right-8 text-white/5 font-notoSerif text-6xl leading-none z-0 rotate-180 transform -translate-y-2 select-none group-hover:text-[#D4E0CE]/10 transition-colors duration-700">
                "
              </div>

              {/* The Review Text Container */}
              <div className="relative z-10 mb-10 pt-2">

                {/* Minimalist Star Rating */}
                <div className="flex gap-1.5 mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4E0CE] group-hover:scale-110 transition-transform duration-500 [transition-timing-function:]" fill="currentColor" viewBox="0 0 24 24" style={{ transitionDelay: `${i * 100}ms` }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Elegant Italic Quote */}
                <p className="text-lg lg:text-[1.25rem] text-[#F5F5F0]/80 group-hover:text-[#FCFBF8] font-notoSerif italic leading-relaxed font-light tracking-wide transition-colors duration-500 h-full">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Avatar and Info Bottom Layer */}
              <div className="relative z-10 flex items-center mt-auto border-t border-white/10 pt-6 transition-colors duration-500 group-hover:border-[#D4E0CE]/20">

                {/* Highly Refined Avatar Container */}
                <div className="relative w-12 h-12 rounded-full p-[1px] bg-white/20 group-hover:bg-[#8A9A83] shadow-sm transition-colors duration-700 overflow-hidden shrink-0">
                  <div className="w-full h-full rounded-full bg-[#1A2E1A] overflow-hidden flex items-center justify-center">
                    <img
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(
                        createAvatar(adventurer, {
                          seed: testimonial.seed,
                          backgroundColor: ['transparent'],
                        }).toString()
                      )}`}
                      alt={testimonial.name}
                      className="w-full h-full object-cover scale-[1.2] transform translate-y-0.5 group-hover:scale-[1.3] transition-transform duration-700 [transition-timing-function:] opacity-90 group-hover:opacity-100"
                    />
                  </div>
                </div>

                {/* Name Panel */}
                <div className="ml-4">
                  <h4 className="font-bold text-[#FCFBF8] font-sans text-sm tracking-widest transition-colors duration-500">
                    {testimonial.name}
                  </h4>
                  <span className="text-[0.65rem] text-[#8A9A83] group-hover:text-[#D4E0CE] font-bold uppercase tracking-[0.2em] transition-colors duration-500 block mt-1">Verified Buyer</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
