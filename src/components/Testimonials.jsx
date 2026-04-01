import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Collector",
    content: "The Nikah frame was absolutely beautiful! It added such a special touch to our wedding ceremony. A true masterpiece that we will cherish forever.",
    avatar: "https://i.pravatar.cc/400?img=12",
  },
  {
    name: "Fatima Sheikh",
    role: "Verified Buyer",
    content: "The Nikah favors were adorable and so thoughtful! They made our wedding even more memorable for all of our special guests. Quality is unmatched.",
    avatar: "https://i.pravatar.cc/400?img=10",
  },
  {
    name: "Arjun Bhatia",
    role: "Wedding Client",
    content: "Ordered a custom wedding register for my sister’s wedding, and everyone loved it! Beautifully detailed and exceptionally well-made. Truly professional work.",
    avatar: "https://i.pravatar.cc/400?img=11",
  },
  {
    name: "Ritu Malhotra",
    role: "Art Lover",
    content: "I bought a bespoke wall art piece, and it’s now the centerpiece of my living room. Every person who visits compliments it immediately! Exceptional craftsmanship.",
    avatar: "https://i.pravatar.cc/150?u=ag",
  },
  {
    name: "Neha Kapoor",
    role: "Collector",
    content: "The flower preservation was magical—it protected my wedding bouquet beautifully and brought back such precious memories of my day. Highly recommend their service.",
    avatar: "https://i.pravatar.cc/400?img=52",
  },
  {
    name: "Ankit Mehta",
    role: "Gift Seeker",
    content: "The crafted bookmarks are perfectly stunning! Fantastic for gifting to my book club friends. Absolutely loved the intricate aesthetic and the premium feel.",
    avatar: "https://i.pravatar.cc/400?img=68",
  },
  {
    name: "Sarah Hussain",
    role: "Verified Buyer",
    content: "The floral resin preservation is stunning. A lifetime memory preserved perfectly. Truly a beautiful way to keep wedding memories alive forever.",
    avatar: "https://i.pravatar.cc/150?u=ad",
  },
  {
    name: "Omar Farooq",
    role: "Wedding Client",
    content: "Impressed by the quality of the personalized prayer mats. Truly a soulful gift for our family. The embroidery and fabric quality exceeded my expectations.",
    avatar: "https://i.pravatar.cc/400?img=58",
  },
  {
    name: "Hina Malik",
    role: "Art Lover",
    content: "The custom calligraphy pieces are breathtaking. The attention to detail is just unmatched. It adds so much elegance to my study room wall.",
    avatar: "https://i.pravatar.cc/400?img=55",
  },
  {
    name: "Zainab Ahmad",
    role: "Verified Buyer",
    content: "Our wedding favors were the talk of the town! Unique, elegant, and perfectly packaged. Gifting Tree is now my go-to for all special occasions.",
    avatar: "https://i.pravatar.cc/150?u=sk",
  },
  {
    name: "Rohan Das",
    role: "Gift Seeker",
    content: "The resin-coated wedding invitations are the most unique thing I've ever seen. Quality is 10/10 and the design is simply out of this world.",
    avatar: "https://i.pravatar.cc/150?u=av",
  },
  {
    name: "Mariam Qureshi",
    role: "Collector",
    content: "Exceptional service! They handled my bouquet preservation with so much care and delivered it safely. The end result is even better than what I imagined.",
    avatar: "https://i.pravatar.cc/400?img=59",
  },
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.01 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="bg-[#2C3E20]/5 backdrop-blur-sm border border-[#D4E0CE]/15 rounded-2xl p-6 md:rounded-3xl md:p-8 relative overflow-hidden group min-w-[280px] md:min-w-[360px] max-w-[320px] md:max-w-[400px] grow-0 shrink-0 mx-3 md:mx-4 cursor-pointer transition-all duration-500 hover:border-[#D4E0CE]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
  >
    {/* Refined Ambient Glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4E0CE]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

    <div className="relative z-10 flex flex-col h-full">
      {/* Top Section: Rating */}
      <div className="flex gap-1 mb-4 md:mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-3.5 h-3.5 text-[#D4E0CE] fill-[#D4E0CE]" />
        ))}
      </div>

      {/* Middle Section: Quote */}
      <div className="relative mb-6 md:mb-8 grow">
        <span className="absolute -top-4 -left-3 text-5xl md:-top-6 md:-left-4 md:text-7xl text-[#D4E0CE]/5 font-serif select-none pointer-events-none italic">“</span>
        <p className="text-[#FCFBF8]/80 text-[0.85rem] md:text-[0.95rem] leading-[1.7] md:leading-[1.8] font-lora italic relative z-10">
          {testimonial.content}
        </p>
      </div>

      {/* Bottom Section: Profile */}
      <div className="flex items-center gap-3 md:gap-4 pt-5 border-t border-[#D4E0CE]/10">
        <div className="relative shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-[#D4E0CE]/20 bg-[#1A2E1A] shadow-sm group-hover:border-[#D4E0CE]/50 transition-colors duration-500">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover scale-[1.1] group-hover:scale-[1.2] transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-[#D4E0CE] rounded-full border-2 border-[#1A2E1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 shadow-sm">
            <div className="w-1.5 h-1.5 bg-[#1A2E1A] rounded-full" />
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="text-[#FCFBF8] font-semibold text-[0.9rem] md:text-[1.05rem] leading-none mb-1 md:mb-1.5 font-serif tracking-tight group-hover:text-[#D4E0CE] transition-colors duration-500 whitespace-nowrap overflow-hidden text-ellipsis">
            {testimonial.name}
          </h4>
          <span className="text-[#8A9A83] text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-[0.15em] shrink-0">{testimonial.role}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const MarqueeRow = ({ items, direction = "left", speed = 40 }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="flex overflow-hidden select-none py-12 w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div
        className={`flex shrink-0 items-stretch gap-2 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {/* Extended items for infinite effect */}
        {[...items, ...items, ...items].map((item, idx) => (
          <TestimonialCard key={idx} testimonial={item} />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  // Split testimonials into rows
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);
  const row3 = testimonials.slice(8, 12);

  return (
    <section className="w-full py-24 lg:py-32 relative overflow-hidden bg-[#1A2E1A]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4B5945]/5 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#2C3E20]/10 rounded-full blur-[150px] pointer-events-none transform translate-y-1/2"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24 px-4"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-[#D4E0CE]/20 text-[#D4E0CE] text-[0.65rem] md:text-xs font-bold mb-6 tracking-[0.2em] uppercase">
            Voices of Delight
          </div>
          <h2 className="font-notoSerif text-4xl md:text-6xl font-bold text-[#FCFBF8] mt-3 mb-4 tracking-tight leading-[1.1]">
            Loved by Collectors <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4E0CE] to-[#8A9A83]">
              Worldwide
            </span>
          </h2>
          <p className="text-[#8A9A83] max-w-xl mx-auto font-poppins text-xs md:text-sm tracking-wide opacity-80">
            Experience the standard of excellence that keeps our community of art seekers growing.
          </p>
        </motion.div>

        {/* Floating Marquee Rows with pausing logic */}
        <div className="relative flex flex-col gap-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            <MarqueeRow items={row1} direction="left" speed={25} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="-mt-16 md:-mt-8"
          >
            <MarqueeRow items={row2} direction="right" speed={30} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="-mt-16 md:-mt-8"
          >
            <MarqueeRow items={row3} direction="left" speed={22} />
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.33%); }
          to { transform: translateX(0); }
        }
      `}} />
    </section>
  );
};

export default Testimonials;

